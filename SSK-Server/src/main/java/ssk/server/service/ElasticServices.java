package ssk.server.service;


import com.google.gson.*;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.regex.Pattern;

@Service
public class ElasticServices {
	
	@Value("${elasticsearch.host}")
	private String host;
	
	@Value("${elasticsearch.link}")
	private String elasticSearchPort;
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
	@Value("#{'${mapping.scenario}'.split(',')}")
	private List<String> nestedScenarioMappings;
	
	
	@Value("#{'${mapping.metadata}'.split(',')}")
	private List<String> metadata;
	
	@Value("#{'${mapping.glossary}'.split(',')}")
	private List<String> nestedGlossary;
	
	@Value("#{'${mapping.resource}'.split(',')}")
	private List<String> nestedREsMappings;
	
	@Value("#{'${mapping.standard}'.split(',')}")
	private List<String> nestedStandardMappings;
	
	@Value("${all_scenario_query}")
	private String allScenarioQuery;
	
	
	
	private SSKServices sskServices;
	private ElasticGetDataServices elasticGetDataServices;
	private RequestHeadersParams requestHeadersParams;
	private Gson gson;
	private List<String> targetList ;
	private HttpEntity<String> entity;
	
	
	static JsonParser parser  = new JsonParser();
	private RestTemplate restTemplate = new RestTemplate();
	private List<String> lastProperties = new ArrayList<>();
	private static final Logger logger = LoggerFactory.getLogger(ElasticServices.class.getName());
	
	private HashMap<String, List<String>> resourceTypeVariant = new HashMap<>();
	public static CopyOnWriteArrayList<String> commitedSteps = new CopyOnWriteArrayList<>();
	
	
	public ElasticServices(SSKServices sskServices, GithubApiService githubApiService, ElasticGetDataServices elasticGetDataServices, RequestHeadersParams requestHeadersParams){
		this.sskServices = sskServices;
		this.elasticGetDataServices = elasticGetDataServices;
		this.requestHeadersParams  = requestHeadersParams;
		resourceTypeVariant.put("tool", Arrays.asList("tool", "service", "software"));
		resourceTypeVariant.put("specification", Arrays.asList("spec", "specification", "standard"));
		resourceTypeVariant.put("documentation", Arrays.asList("documentation", "official_documentation"));
		this.gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		targetList = new ArrayList<>();
	}
	
	
	public boolean pushData(CopyOnWriteArrayList<JsonObject> scenarioAndStep, boolean commit){
		String  idElement, metadataType = "", type ;
		JsonObject metaData = null, resources = null;
		boolean result = true;
		for (JsonObject jsonItem: scenarioAndStep ) {
			scenarioAndStep.remove(jsonItem);
			if(jsonItem.getAsJsonObject().has("id"))
				jsonItem.getAsJsonObject().remove("id");
			type = this.sskServices.removeDoubleQuote(jsonItem.get("type").toString());
			idElement = jsonItem.get("GithubRef").getAsString().split("\\.")[0];
				if(jsonItem.has("metadata")){
					metaData = jsonItem.remove("metadata").getAsJsonObject();
					if(this.sskServices.removeDoubleQuote(jsonItem.get("type").toString()).equals("scenario")){
						//idParent = idElement;
						metadataType = "scenario_metadata";
					}
					else if(type.equals("step") ||  type.equals("inheritedStep")){
						metadataType = "step_metadata";
					}
				}
				if(jsonItem.has("resources")){
					resources = jsonItem.remove("resources").getAsJsonObject();
				}
			    result = this.updateElementById(type, idElement, jsonItem, metadataType, metaData, resources, commit);
			}
	
		return result;
	}
	
	/**
	 * <p>
	 *     This function pushed  a step's resource into Elasticsearch
	 * </p>
	 * @param idParent : The document's ID in Elasticsearch
	 * @param data Data of resource to be completed by request  Zotero's API (for  Zotero's resources), GitHub API, HAL API or Web Scraping
	 * @throws  org.springframework.web.client.HttpClientErrorException triggers an exception if Elasticsearch PUT request returns an error
	 */
	 private void pushResources(String idParent, JsonObject data){
	 	sskIndex = "ssk";
		Set<Map.Entry<String, JsonElement>> entries = data.entrySet();
		 final String[] target = {""};
		final String[] idResource = new String[1];
		entries.forEach(entry -> {
			String category = entry.getKey().equals("generalResources") ? "general" : "project";
			JsonArray resources = data.get(entry.getKey()).getAsJsonArray();
			String[] temp = new String[1];
			resources.forEach(resourceElt -> {
				String resourceType = "";
				JsonObject resource = resourceElt.getAsJsonObject();
				if (resource.has("type")) {
					temp[0] = resource.get("type").getAsString();
					if (temp[0].equals("code") && resource.has("subtype")) {
						temp[0] = resource.get("subtype").getAsString();
					}
					final String resType = temp[0];
					this.resourceTypeVariant.forEach((key, value) -> {
						if (value.contains(resType.toLowerCase())) {
							temp[0] = key;
						}
					});
					resourceType = temp[0];
				}
				JsonObject elt= new JsonObject();
				//boolean push = false;
				if (resource.has("source")) {
					String source = resource.get("source").getAsString();
					try {
							targetList.add(resource.get("target").getAsString());
							switch (source) {
								case "zotero":
								case "github":
								case "hal":
								case "BeQuali":
									target[0] = resource.get("target").getAsString();
									elt = sskServices.getZoteroResource(target[0], resourceType);
									idResource[0] = elt.remove("id").getAsString();
									break;
							}
					} catch (HttpClientErrorException exception) {
						logger.error(exception.getClass().getCanonicalName() + " - " + exception.getMessage()+ " Unsuccessful  Request on "+ source.toUpperCase()  + " for target " + target[0]);
						elt = this.sskServices.scraptWebPage(source, resource.get("target").getAsString(), resourceType);
						idResource[0] = this.toHex(source + elt.get("title").getAsString());
					}
					catch (Exception  exception){
						logger.error(exception.getClass().getCanonicalName() + " - " + exception.getMessage());
					}
				}
					JsonArray resourceParents  ;
					JsonObject retrievedResource = this.elasticGetDataServices.getDocumentById(idResource[0]);
					if(retrievedResource == null){
						resourceParents = new JsonArray();
						JsonObject parent = new JsonObject();
						parent.addProperty("id", idParent);
						resourceParents.add(parent);
						elt.add("parents", resourceParents);
					} else {
						resourceParents = retrievedResource.get("_source").getAsJsonObject().getAsJsonArray("parents");
						if(resourceParents != null && !resourceParents.toString().contains(idParent)){
							JsonObject parent = new JsonObject();
							parent.addProperty("id", idParent);
							resourceParents.add(parent);
							elt.add("parents", resourceParents);
						}
						else{
							JsonArray parentsId = new JsonArray();
							JsonObject parent = new JsonObject();
							parent.addProperty("id", idParent);
							parentsId.add(parent);
							elt.add("parents", parentsId);
						}
					}
					elt.addProperty("category", category);
				    elt.addProperty("resType", resourceType);
					elt.addProperty("type", "resource");
					JsonObject toSend = new JsonObject();
					toSend.add("doc", elt);
					toSend.addProperty("doc_as_upsert", true);
					toSend.addProperty("detect_noop",  false);
						entity = requestHeadersParams.addContentToHeader(toSend);
					try{
						ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex + "/_doc/" + idResource[0] +"/_update" , HttpMethod.POST, entity, String.class);
						if (response.getStatusCode().is2xxSuccessful()) {
							logger.info("Resource  with _id " + idResource[0] + " and the step parent " + idParent + " has been successful created");
						}
					}catch(HttpClientErrorException ex){
						logger.error("Error when pushed Resource with id " + idResource[0] + " for the step parent " + idParent + " - Elasticsearch Problem");
					}
			});
		});
	 }
	 
	 
	 
	
	
	private void pushMetadata(String type, String idParent, JsonObject data, HttpHeaders headers, String position)  {
		sskIndex = "ssk";
		if (data.has("standard")) {
			JsonArray standards  = new JsonArray();
			data.remove("standard").getAsJsonArray().forEach( standard ->{
						String clef = this.sskServices.removeDoubleQuote(standard.getAsJsonObject().get("key").toString());
					JsonObject standardRes = this.sskServices.getStandard(clef);
					if(standardRes == null) {
						standardRes = standard.getAsJsonObject();
					}
				    standards.add(standardRes);
			});
			data.add("standards", standards);
		}
		data.addProperty("type", type);
		data.addProperty("parent", idParent);
		JsonObject toSend = new JsonObject();
		toSend.add("doc", data);
		toSend.addProperty("doc_as_upsert", true);
		toSend.addProperty("detect_noop",  false);
		try {
		 entity = requestHeadersParams.addContentToHeader(toSend);
			ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex + "/_doc/" +
					                                                             ((position == null) ? idParent+"Meta" : idParent+position+"Meta")+"/_update", HttpMethod.POST, entity, String.class);
			JSONObject responseBody = new JSONObject(response.getBody());
			if(responseBody.get("result").toString().equals("created") || responseBody.get("result").toString().equals("updated")){
				logger.info(type + " for parent " + idParent + " successful created");
			}
		}
		catch (HttpClientErrorException exception){
			logger.error(exception.getClass().getCanonicalName() + " - " + exception.getMessage()+ " Error creating Meta-data for " + idParent);
		}
	}
	
	
	public JsonObject getItemsByID(String type, boolean fromSSK){
		JsonObject result = new JsonObject();
		JsonObject param ;
		sskIndex = "ssk/_doc/_search?q=type:"+ type+ "&size=10000";
		entity = new HttpEntity<>(allScenarioQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.POST, entity, String.class);
		if(response.getStatusCode().is2xxSuccessful()){
			param = parser.parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			result.addProperty("total", Integer.valueOf(param.get("total").getAsString()));
			if(fromSSK){
				result.add(type +'s', param.get("hits").getAsJsonArray());
			}
		}
		return result;
	}
	
	
	public boolean deleteElementById( String type, String identifier){
		boolean result = false;
		sskIndex = "ssk/_doc/" + identifier ;
		try{
			ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.DELETE, entity, String.class);
			if (response.getStatusCode().is2xxSuccessful()) {
				logger.info( type.toUpperCase() + " _id " + identifier +  " has been successful removed");
				result =  true;
			}
		}catch(HttpClientErrorException ex){
			logger.error(ex.getClass().getCanonicalName() + " - " + ex.getMessage()+ " Failed to remove  " + type + " with identifier " +identifier);
		}
		return  result;
	}
	
	
	
	/**
	 * <p>
	 *     This function updates a document in Elasticsearch
	 * </p>
	 * @param type  Type of element to update
	 * @param identifier  The identifier of the element to update into
	 * @param content  The content of the document to add/update into
	 * @param metadataType  The type of metadata(for step or scenario)
	 * @param metaData  The json's content of metaData
	 * @param resources  The json's resource of either step or scenario
	 */
	 public boolean updateElementById(String type, String identifier, JsonObject content, String metadataType, JsonObject metaData, JsonObject resources, boolean commit  ){
		boolean result  = false;
		sskIndex = "ssk";
		 JsonObject toSend = new JsonObject();
		 toSend.add("doc", content);
		 toSend.addProperty("doc_as_upsert", true);
		 toSend.addProperty("detect_noop",  false);
		  entity =requestHeadersParams.addContentToHeader(toSend);
		try{
			ResponseEntity<String> response = this.restTemplate.exchange( elasticSearchPort + "/" + sskIndex + "/_doc/" + identifier + "/_update", HttpMethod.POST, entity, String.class);
			JSONObject responseBody = new JSONObject(response.getBody());
			result = (responseBody.get("result").toString().equals("created") || responseBody.get("result").toString().equals("updated"));
			if (result) {
				switch (type){
					case "step":
					case "inheritedStep":
						String stepPosition = content.get("position").getAsString();
						logger.info("-----> Successful push/update of   " + type + "  " + stepPosition + " on ElasticSearch with result id: "+ identifier);
						if(commit) commitedSteps.add(identifier);
						if( metadataType != null ) this.pushMetadata(metadataType, identifier, metaData, requestHeadersParams.getHeaders(),stepPosition );
						if( resources != null) this.pushResources(identifier, resources);
					break;
					case "scenario":
						logger.info("-----> Successful push/update of scenario on ElasticSearch with result id: "+ identifier);
						if( metadataType != null ) this.pushMetadata(metadataType, identifier, metaData, requestHeadersParams.getHeaders(), null);
					break;
				}
				return result;
			}
		}
		catch(HttpClientErrorException e){
			logger.error(e.getClass().getCanonicalName() + " - " + e.getMessage()+ " Error update/create  " + type+ " with identifier " +identifier);
		}
		return result;
	 }
	 
	 public void deleteAllStandards(){
		 sskIndex = "ssk/_delete_by_query";
	     String  query = "{\n" +
			                     "  \"query\": { \n" +
			                     "    \"match\": {\n" +
			                     "      \"type\": \"standard\"\n" +
			                     "    }\n" +
			                     "  }\n" +
			                     "}";
		 HttpEntity entity = new HttpEntity<>(query, requestHeadersParams.getHeaders());
		 try{
			 ResponseEntity<String> response = this.restTemplate.exchange( elasticSearchPort + "/" + sskIndex , HttpMethod.POST, entity, String.class);
			 JSONObject responseBody = new JSONObject(response.getBody());
			 if(responseBody.has("total") && responseBody.getInt("total") >0 ){
				 logger.info("-----> Successful remove all Standards!!!");
			 }
			 else {
				 logger.error(" Error when deleting all Standard for reindexing  !!!");
			 }
		 }
		catch(HttpClientErrorException e){
			 logger.error(e.getClass().getCanonicalName() + " - " + e.getMessage()+ " Error when deleting all Standard for reindexing  " );
		 }
	 }
	
	
	
	public String getElasticSearchPort() {
		return elasticSearchPort;
	}
	
	private String  jsonNormalisation4Elasticsearch(String content){
		
		content =  content.replaceAll("\\\"content\\\"\\:(\\s)\\[(\\s)*\\\"", "\\\"content\\\"\\:\\[\\{\\\"");
		content =  content.replaceAll("\\\"\\,(\\s)*\\{", "\\\"\\}\\,\\{");
		return content;
	}
	
	public   String toHex(String arg) {
		return String.format("%x", new BigInteger(1, arg.getBytes(StandardCharsets.UTF_8)));
	}
	
	public Gson getGson() {
		return gson;
	}
	
	public void setGson(Gson gson) {
		this.gson = gson;
	}
}
