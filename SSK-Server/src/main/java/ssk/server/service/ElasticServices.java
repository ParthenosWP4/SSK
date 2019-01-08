package ssk.server.service;



import com.google.gson.*;
import org.json.JSONObject;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;


import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.*;
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
	
	@Value("#{'${mapping.step}'.split(',')}")
	private List<String> nestedStepMappings;
	
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
	private GithubApiService githubApiService;
	private ElasticGetDataServices elasticGetDataServices;
	private RequestHeadersParams requestHeadersParams;
	private Gson gson;
	private List<String> targetList ;
	private HttpEntity<String> entity;
	
	
	private static JsonParser parser  = new JsonParser();
	private RestTemplate restTemplate = new RestTemplate();
	private List<String> lastProperties = new ArrayList<>();
	private static final Logger logger = LoggerFactory.getLogger(ElasticServices.class.getName());
	
	private HashMap<String, List<String>> resourceTypeVariant = new HashMap<>();
	
	public ElasticServices(SSKServices sskServices, GithubApiService githubApiService, ElasticGetDataServices elasticGetDataServices, RequestHeadersParams requestHeadersParams){
		this.sskServices = sskServices;
		this.githubApiService = githubApiService;
		this.elasticGetDataServices = elasticGetDataServices;
		this.requestHeadersParams  = requestHeadersParams;
		resourceTypeVariant.put("tool", Arrays.asList("tool", "service", "software"));
		resourceTypeVariant.put("specification", Arrays.asList("spec", "specification", "standard"));
		resourceTypeVariant.put("documentation", Arrays.asList("documentation", "official_documentation"));
		this.gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		targetList = new ArrayList<>();
	}
	
	
	public boolean pushData(JsonArray scenarioAndStep, int iteration) throws Exception {
		final String[] idElement = new String[1];
		final String[] metadataType = new String[1];
		final JsonObject[] metaData = new JsonObject[1];
		final JsonObject[] jsonItem = new JsonObject[1];
		final String[] idParent = {""};
		final boolean[] result = {true};
		final HttpEntity<String>[] entity = new HttpEntity[1];
		final JsonObject[] resources = {null};
		
		scenarioAndStep.forEach((JsonElement item) -> {
			jsonItem[0] = (JsonObject) item;
			metaData[0] = jsonItem[0].remove("metadata").getAsJsonObject();
			idElement[0] = jsonItem[0].get("GithubRef").getAsString().split("\\.")[0];
			if(this.sskServices.removeDoubleQuote(jsonItem[0].get("type").toString()).equals("scenario")){
				idParent[0] = idElement[0];
				metadataType[0] = "scenario_metadata";
			}
			if(this.sskServices.removeDoubleQuote(jsonItem[0].get("type").toString()).equals("step")){
				metadataType[0] = "step_metadata";
				resources[0] = jsonItem[0].remove("resources").getAsJsonObject();
			}
			entity[0] = requestHeadersParams.addDetectNoop(jsonItem[0]);
			ResponseEntity<String> response = this.restTemplate.exchange( elasticSearchPort + "/" + sskIndex + "/_doc/" + idElement[0] , HttpMethod.PUT, entity[0], String.class);
			JSONObject responseBody = new JSONObject(response.getBody());
			result[0] = result[0] && (responseBody.get("result").toString().equals("created") || responseBody.get("result").toString().equals("updated"));
			if (result[0] ) {
				if (this.sskServices.removeDoubleQuote(jsonItem[0].get("type").toString()).equals("step")) {
					String stepPosition = jsonItem[0].get("position").getAsString();
					logger.info("-----> Successful push/update of step  " + stepPosition + " on ElasticSearch with result id: "+ idElement[0]);
					this.executeThread(metadataType[0], idElement[0], metaData[0], requestHeadersParams.getHeaders(),stepPosition );
					this.executeThread("resources", idElement[0], resources[0], requestHeadersParams.getHeaders(),null);
				}
				else{
					logger.info("-----> Successful push/update of scenario " + iteration + " on ElasticSearch with result id: "+ idElement[0]);
					this.executeThread(metadataType[0], idElement[0], metaData[0], requestHeadersParams.getHeaders(), null);
				}
			}
			
		});
		return result[0];
	}
	
	
	
	private void executeThread(String type, String id, JsonObject data, HttpHeaders headers, String position) {
		Thread t = new Thread(() -> {
			try {
				if (type.equals("resources")) {
					pushResources(id, data, headers);
				} else {
					this.pushMetadata(type, id, data, headers, position);
				}
			} catch (Exception e) {
				e.printStackTrace();
				String  errType = "Metadata";
				if (type.equals("resources")) {
					errType = "Resource";
				}
				logger.error(errType+ " with ID '"+ id +"' has not been pushed into Elasticsearch");
			}
		});
		t.start();
	}
	
	/**
	 * <p>
	 *     This function pushed  a step's resource into Elasticsearch
	 * </p>
	 * @param idParent : The document's ID in Elasticsearch
	 * @param data Data of resource to be completed by request  Zotero's API (for  Zotero's resources), GitHub API, HAL API or Web Scraping
	 * @throws  org.springframework.web.client.HttpClientErrorException triggers an exception if Elasticsearch PUT request returns an error
	 */
	 private void pushResources(String idParent, JsonObject data, HttpHeaders headers){
		Set<Map.Entry<String, JsonElement>> entries = data.entrySet();
		JsonArray parents = new JsonArray();
		 final String[] target = {""};
		final String[] idResource = new String[1];
		HashMap<String, List<JsonObject>> dataToPush = new HashMap<>();
		entries.forEach(entry -> {
			String category = entry.getKey().toString().equals("generalResources") ? "general" : "project";
			JsonArray resources = data.get(entry.getKey()).getAsJsonArray();
			String[] temp = new String[1];
			List<JsonObject> resourceData = new ArrayList<>();
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
							temp[0] = key.toString();
						}
					});
					resourceType = temp[0];
				}
				JsonObject elt= new JsonObject();
				boolean push = false;
				if (resource.has("source")) {
					String source = resource.get("source").getAsString();
					try {
						if (!targetList.contains(resource.get("target").getAsString())) {
							push = true;
							targetList.add(resource.get("target").getAsString());
							switch (source) {
								case "zotero":
									target[0] = resource.get("target").getAsString();
									elt = sskServices.getZoteroResource(target[0], resourceType);
									idResource[0] = elt.remove("id").getAsString();
									break;
								case "github":
									target[0] = resource.get("target").getAsString().split("github.com")[1];
									elt = githubApiService.getRepositoryData(target[0], resourceType);
									idResource[0] = elt.remove("id").toString();
									break;
								case "hal":
									target[0] = resource.get("target").getAsString();
									elt = this.sskServices.getHalResource(target[0]);
									idResource[0] = elt.remove("id").toString();
									break;
								case "BeQuali":
								default:
									idResource[0] = this.toHex(source + resource.get("target").getAsString());
									logger.info("ID created :" + idResource[0]);
									elt.addProperty("title", source);
									elt.addProperty("url", resource.get("target").getAsString());
									elt.addProperty("type", resourceType);
									resourceData.add(elt);
								break;
							}
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
				if(push){
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
						if(!resourceParents.toString().contains(idParent)){
							JsonObject parent = new JsonObject();
							parent.addProperty("id", idParent);
							resourceParents.add(parent);
							elt.add("parents", resourceParents);
						}
					}
					elt.addProperty("category", category);
					elt.addProperty("type", "resource");
					entity = requestHeadersParams.addDetectNoop(elt);
					try{
						ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex + "/_doc/" + idResource[0] , HttpMethod.PUT, entity, String.class);
						if (response.getStatusCode().is2xxSuccessful()) {
							logger.info("Resource  with _id " + idResource[0] + " and the step parent " + idParent + " has been successful created");
						}
					}catch(HttpClientErrorException ex){
						logger.error("Error when pushed Resource with id " + idResource[0] + " for the step parent " + idParent + " - Elasticsearch Problem");
					}
					
				}
			});
		});
	 }
	
	
	private void pushMetadata(String type, String idParent, JsonObject data, HttpHeaders headers, String position) throws Exception {
		if (data.get("standard") != null) {
			JsonArray standards = sskServices.getWholeStandard(data.remove("standard").getAsJsonArray());
			data.add("standards", standards.getAsJsonArray());
		}
		data.addProperty("type", type);
		data.addProperty("parent", idParent);
		
		HttpEntity entity = new HttpEntity<>(data.toString(), headers);
		ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex + "/_doc/" +
				                                                             ((position == null) ? idParent+"Meta" : idParent+position+"Meta"),
				HttpMethod.POST, entity, String.class);
		JSONObject responseBody = new JSONObject(response.getBody());
		if(responseBody.get("result").toString().equals("created") || responseBody.get("result").toString().equals("updated")){
			logger.info(type + " for parent " + idParent + " successful created");
		}
		else {
			logger.error("Error creating Meta-data for " + idParent);
		}
	}
	
	public JSONObject addMappingFromPath(String path, String mappingType) {
		JSONObject properties = new JSONObject();
		JSONObject elt = new JSONObject();
		elt.put("type", "nested");
		String isIn = "";
		JSONObject elt2 = new JSONObject();
		String[] pathArray = path.split(Pattern.quote("."));
		String last = pathArray[pathArray.length - 1];
		this.lastProperties.add(last);
		if (last.equals("content")) {
			properties.put("type", "string");
			elt2.put("abbr", properties);
			elt2.put("expan", properties);
			elt.put("properties", elt2);
			elt.put("type", "object");
			elt.put("enabled", false);
			elt.put("dynamic", true);
			properties = new JSONObject();
			properties = new JSONObject();
		}
		properties.put("properties", new JSONObject().put(last, elt));
		for (int i = pathArray.length - 2; i >= 0; i--) {
			elt = new JSONObject();
			if (i > 0) {
				if (lastProperties.contains(pathArray[i].toString())) {
					JSONObject elt1 = new JSONObject();
					elt1.put("type", "string");
					properties = properties.getJSONObject("properties");
					elt2 = new JSONObject();
					elt2.put("properties", properties);
					elt2.put("type", "nested");
					elt.put(pathArray[i], elt2);
				} else {
					elt.put(pathArray[i], properties);
				}
			} else {
				
				properties.put("type", "nested");
				elt.put(pathArray[i], properties);
			}
			properties = new JSONObject();
			properties.put("properties", elt);
		}
		HttpEntity<String> entity = new HttpEntity<>(properties.toString(), requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( elasticSearchPort + "/" + sskIndex + "/_mapping/" + mappingType, HttpMethod.PUT, entity, String.class);
		//ResponseEntity<String> response = this.restTemplate.exchange( elasticSearchPort + "/" + sskIndex + "/_mapping/_doc" , HttpMethod.PUT, entity, String.class);
		return elt;
	}
	
	public JsonObject getItemsByID(String type, boolean fromSSK){
		
		JsonObject result = new JsonObject();
		JsonObject param = new JsonObject();
		//param.addProperty("_source", false);
		sskIndex = "ssk/_doc/_search?q=type:scenario&size=10000";
		entity = new HttpEntity<>(allScenarioQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.POST, entity, String.class);
		if(response.getStatusCode().is2xxSuccessful()){
			param = this.parser.parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			result.addProperty("total", Integer.valueOf(param.get("total").getAsString()));
			if(fromSSK){
				result.add(type +'s', param.get("hits").getAsJsonArray());
			}
		}
		return result;
	}
	
	
	
	public String getElasticSearchPort() {
		return elasticSearchPort;
	}
	
	
	/*
		*This function normalizes a json content so that it's accepted by elasticsearch
		* Example:
		*
		* Content Refused by elasticsearch :
		* "content": [
	                    "Corpus research should be based on interoperable data,...
	                    {
	                        "list": {
	                            "item": [
	                                "Documentation: Guidelines for text annotation",
	                                "Documentation: Guidelines for text recognition",
	                                "Schema: Formal specification in ODD and RNG schemas (for print and manuscript\n        annotation)",
	                                "Schema: Schematron constraints for quality checks beyond the schema"
	                            ]
	                        }
	                    }
	                ]
	     
	     * Content Accepted by elasticsearch :
	     * "content": [
	                    {
	                        "Corpus research should be based on interoperable data,...
	                    },
	                    {
	                        "list": {
	                            "item": [
	                                "Documentation: Guidelines for text annotation",
	                                "Documentation: Guidelines for text recognition",
	                                "Schema: Formal specification in ODD and RNG schemas (for print and manuscript\n        annotation)",
	                                "Schema: Schematron constraints for quality checks beyond the schema"
	                            ]
	                        }
	                    }
	                ]
	     
    */
	private String  jsonNormalisation4Elasticsearch(String content){
		
		content =  content.replaceAll("\\\"content\\\"\\:(\\s)\\[(\\s)*\\\"", "\\\"content\\\"\\:\\[\\{\\\"");
		content =  content.replaceAll("\\\"\\,(\\s)*\\{", "\\\"\\}\\,\\{");
		return content;
	}
	
	public String toHex(String arg) {
		return String.format("%x", new BigInteger(1, arg.getBytes(StandardCharsets.UTF_8)));
	}
	
	public Gson getGson() {
		return gson;
	}
	
	public void setGson(Gson gson) {
		this.gson = gson;
	}
}
