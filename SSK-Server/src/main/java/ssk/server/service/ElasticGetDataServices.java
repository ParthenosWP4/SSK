package ssk.server.service;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@Service
public class ElasticGetDataServices {
	
	@Value("${all_step_query}")
	private String allStepQuery;
	
	@Value("${new_scenario_desc_query}")
	private String scenarioDescQuery;
	
	@Value("${scenario_image_query}")
	private String scenarioImageQuery;
	
	@Value("${scenario_authors_query}")
	private String scenarioAuthorsQuery;
	
	@Value("${scenario_metadata_query}")
	private String scenarioMetadataQuery;
	
	@Value("${full_text_search}")
	private String fullTextSearchQueryBoby;
	
	@Value("${standard_query}")
	private String standardQuery;
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
	@Value("${scenario_tag_search_query}")
	private String scenarioTagQuery;
	
	@Value("${step_tag_search_query}")
	private String stepTagQuery;
	
	@Autowired
	private SSKServices sskServices;
	
	@Autowired
	private ElasticServices elasticServices;
	
	@Autowired
	private RequestHeadersParams requestHeadersParams;
	
	private static final Logger logger = LoggerFactory.getLogger(ElasticGetDataServices.class.getName());
	
	private static List<String> include;
	private static List<String> exclude;
	
	private static HttpEntity<String> entity;
	private RestTemplate restTemplate = new RestTemplate();
	
	
	public JsonObject getAllSteps(){
		sskIndex = "ssk/_doc/_search?q=type:step";
		//requestHeadersParams.setHeaders();
		JsonObject result = new JsonObject();
		entity = new HttpEntity<>(allStepQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			JsonObject param = sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			result.addProperty("total", Integer.valueOf(param.get("total").getAsString()));
			String input = param.getAsJsonArray("hits").toString();
			input = input.toString().replaceAll("\"_source\":\\{", "");
			input = input.toString().replaceAll("\"TEI\":\\{\"teiHeader\":\\{\"fileDesc\":\\{\"titleStmt\":\\{\"author\"", "\"author\"");
			input = input.toString().replaceAll("}{3},\"text\"", ",\"text\"");
			input = input.toString().replaceAll("\"text\":\\{\"body\":\\{\"listEvent\":\\{\"event\":\\{", "");
			input = input.replaceAll("((\\s)*\\}){5}", "");
			input = input.replaceAll("}},\\{\"_index", "},{\"_index");
			String reverse = new StringBuffer(input).reverse().toString();
			reverse = reverse.replaceFirst("]}", "]");
			input = new StringBuffer(reverse).reverse().toString();
			
			JsonArray steps = sskServices.getParser().parse(input).getAsJsonArray();
			JsonArray resSteps = new JsonArray();
			
			steps.forEach(step -> {
				JsonElement head = this.loadContentByKey(new JSONObject(step.toString()), "head");
				JsonElement desc = this.loadContentByKey(new JSONObject(step.toString()), "desc");
				step.getAsJsonObject().add("head", head);
				step.getAsJsonObject().add("desc", desc);
				resSteps.add(step);
			});
			result.add("steps", resSteps);
			return result;
		}
		else{
			return null;
		}
	}
	
	public JsonArray getAllStepMetaData(){
		sskIndex = "ssk/_doc/_search?q=type:step_metadata&size=10000";
		//requestHeadersParams.setHeaders();
		ResponseEntity<String> response = this.restTemplate.getForEntity( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, String.class) ;
		if (response.getStatusCode().is2xxSuccessful()) {
			return sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject().get("hits").getAsJsonArray();
		}
		else{
			return null;
		}
	}
	
	private String queryScenarioMetadata(String scenarioId){
		JsonObject jsonResult = new JsonObject();
		sskIndex = "ssk/_doc/" + scenarioId+"Meta";
		ResponseEntity<String> response = this.restTemplate.getForEntity(URI.create(this.elasticServices.getElasticSearchPort() + "/" + sskIndex), String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			jsonResult = this.sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("_source").getAsJsonObject();
		}
		return  jsonResult.toString();
	}
	
	public JsonElement loadContentByKey(JSONObject json, String keyToCheck){
		Iterator<?> json_keys = json.keys();
		JsonElement content = null;
		boolean enter = true;
		while( json_keys.hasNext() && enter){
			String json_key = (String)json_keys.next();
			try{
				content = sskServices.getParser().parse(json.optJSONObject(json_key).toString());
				if (json_key.equals(keyToCheck)){
					enter = false;
					break;
				}
				content = loadContentByKey(new JSONObject(content.toString()), keyToCheck);
				
			}
			
			catch (NullPointerException e){
				if (json_key.equals(keyToCheck)){
					try{
						content = sskServices.getParser().parse(json.getJSONArray(json_key).toString());
						enter = false;
					}
					catch(JSONException ex){
						content = new JsonObject();
						content.getAsJsonObject().addProperty("date", json.get("date").toString() );
						enter = false;
					}
				}
			}
		}
		if(!enter){
			return content;
		}
		else{
			
			return  content;
		}
		
	}
	
	/**
	 * getStandardByabbrName() queries Elasticsearch to get Standard's bunch of information  by using his short name  as parameter
	 * @param standardAbbrName
	 * @return
	 */
	
	public JsonElement getStandardByabbrName(String standardAbbrName) {
		sskIndex = "ssk";
		standardAbbrName = standardAbbrName.replaceAll("\"", "").replaceAll("\\\\n(\\s)+", " ");
		JsonElement jsonResult = new JsonObject();
		entity = new HttpEntity<>(standardQuery.replace("value", standardAbbrName), requestHeadersParams.getHeaders());
		
		try {
			ResponseEntity<String> response = this.restTemplate.exchange(this.elasticServices.getElasticSearchPort() + "/" + sskIndex + "/_doc/_search", HttpMethod.POST, entity, String.class);
			if (response.getStatusCode().is2xxSuccessful()) {
				jsonResult = this.sskServices.getParser().parse(response.getBody()).getAsJsonObject().getAsJsonObject("hits");
				if (jsonResult.getAsJsonObject().get("total").toString().equals("0")) {
					logger.error( standardAbbrName +" not found!!!");
					jsonResult = null;
				} else {
					jsonResult = jsonResult.getAsJsonObject().getAsJsonArray("hits");
				}
			}
		}
		catch (HttpClientErrorException excep){
			logger.error(excep.getClass().getCanonicalName() + " - " + excep.getMessage()+ "standard " + standardAbbrName +" not found!!!");
			jsonResult = null;
		}
		return jsonResult;
	}
	
	private JsonElement queryTitle(String scenarioId){
		sskIndex = "ssk/_doc/"+ scenarioId;
		UriComponentsBuilder builder ;
		builder = UriComponentsBuilder.fromUriString( this.elasticServices.getElasticSearchPort() + "/" + sskIndex)
				          .queryParam("_source_include", "*.head.*")
				          .queryParam("_source_exclude", "*.head.type,*.listEvent,*.desc,*.author");
		entity = new HttpEntity<>(requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, String.class);
		return loadContentByKey(new JSONObject(response.getBody()), "head");
	}
	
	private JsonElement queryAuthors(String scenarioId){
		JsonElement jsonResult ;
		JsonElement source ;
		sskIndex = "ssk/_doc/_search?q=_id:"+ scenarioId;
		entity = new HttpEntity<>(scenarioAuthorsQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			final JsonArray result = new JsonArray();
			source = loadContentByKey((JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0), "author") ;
			jsonResult = this.sskServices.normalizeContent(source);
		} else {
			jsonResult =  null;
		}
		return jsonResult;
	}
	
	private void normalizeText(JsonElement content, HashMap<String, String > desc, String key){
		String keyLang = "en";
		if (content.getAsJsonObject().has("lang")) {
			key = content.getAsJsonObject().get("lang").getAsString();
		}
		
		if(content.isJsonObject()){
			if(content.getAsJsonObject().has("part")){
				desc.putIfAbsent(key,  desc.get(key) + content.getAsJsonObject().get("part").getAsString());
			}
			if(content.getAsJsonObject().has("list")){
				//setList()
				/*JsonElement list = content.getAsJsonObject().get("list").getAsJsonObject().get("item");
				if(list.isJsonArray()){
					for(JsonElement item: list.getAsJsonArray()){
						if(item.getAsJsonObject().has("list")){
							normalizeText(item.getAsJsonObject().get("list").getAsJsonObject(), desc, key);
						}
						else{
							if (item.getAsJsonObject().has("content")) {
								normalizeText(item.getAsJsonObject().get("content"), desc, key);
							}
						}
					}
				}
				else {
				
				}*/
			}
			
		}
		else {
			for(JsonElement item: content.getAsJsonArray()) {
				if (item.getAsJsonObject().has("content")) {
					normalizeText(item.getAsJsonObject().get("content"), desc, key);
				}
				
				if(item.getAsJsonObject().has("p")){
					JsonElement paragraph = item.getAsJsonObject().get("p");
					if(paragraph.isJsonObject()){
					
					}
					else{
						for(JsonElement subPara: paragraph.getAsJsonArray()){
							if(subPara.isJsonArray()){
								for(JsonElement paragraphContent: subPara.getAsJsonArray()){
									normalizeText(paragraphContent, desc, key );
								}
							}
						}
					}
				}
				
			}
		}
	}
	
	
	
	private JsonElement queryDescription(String scenarioId) {
		JsonElement jsonResult ;
		JsonElement source ;
		sskIndex = "ssk/_doc/_search?q=_id:"+ scenarioId;sskIndex = "ssk/_doc/_search?q=_id:"+ scenarioId;
		entity = new HttpEntity<>(scenarioDescQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			final JsonArray result = new JsonArray();
			jsonResult = loadContentByKey((JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0), "scenarioDesc") ;
			//jsonResult = this.sskServices.normalizeContent(source);
		} else {
			jsonResult =  null;
		}
		
		return jsonResult;
	}
	
	
	
	private JsonElement queryImage(String scenarioId){
		JsonElement jsonResult = new JsonObject();
		//requestHeadersParams.setHeaders();
		sskIndex = "ssk/_doc/_search?q=_id:"+scenarioId;
		entity = new HttpEntity<>(scenarioImageQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			jsonResult = loadContentByKey((JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0), "figure") ;
		}
		return  jsonResult;
	}
	
	
	public JsonElement getScenarioDetails(String scenarioId, String field) {
		
		JsonElement res = null;
		switch (field.trim()){
			case "title":
				res = queryTitle(scenarioId);
			break;
			case "desc":
				res = queryDescription(scenarioId)	;
			break;
			case "image":
				res = queryImage(scenarioId)	;
			break;
			case "author":
				res = queryAuthors(scenarioId)	;
			break;
			case "scenario_metadata":
				res = sskServices.getParser().parse( queryScenarioMetadata(scenarioId));
			break;
		}
		
		return res;
	}
	
	
	/**
	 * <p>
	 *     This function retrieves all documents by type (scenario, step, resource, etc..  ) from Elasticsearch
	 * </p>
	 * @param documentType : type (scenario, step, resource, etc..  ) of document to retrieve
	 * @return  a JsonElement which is a list of specified type or null if the request on Elasticsearch returns 404 (not found)
	 */
	public JsonElement getAllResourcesByType(String documentType) {
		JsonElement jsonResult = new JsonObject();
		sskIndex = "ssk/_doc/_search?q=type:" + documentType +"&size=1000";
		ResponseEntity<String> response = this.restTemplate.getForEntity( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, String.class) ;
		if (response.getStatusCode().is2xxSuccessful()) {
			JsonObject param = sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			String input = param.getAsJsonArray("hits").toString();
			switch (documentType){
				case "resource":
				case "standard":
					input = input.toString().replaceAll("\"_source\":\\{", "");
					input = input.replaceAll("}}", "}");
					jsonResult.getAsJsonObject().addProperty("total", Integer.valueOf(param.get("total").getAsString()));
					jsonResult.getAsJsonObject().add(documentType+'s', this.sskServices.getParser().parse(input).getAsJsonArray());
					break;
				default:
					jsonResult = this.sskServices.getParser().parse(input).getAsJsonArray().get(0).getAsJsonObject().getAsJsonObject("_source");
					jsonResult = jsonResult.getAsJsonObject().get("TEI").getAsJsonObject().getAsJsonObject("text").getAsJsonObject("body").getAsJsonArray("div");
				break;
			}
		}
		else{
			jsonResult = null;
		}
		return jsonResult;
	}
	
	
	/*
		This function is to check if a scenario or step metadata already exists
	 */
	public boolean metadataExists(String type, String idParent){
		return false;
	}
	
	
	public JsonObject searchInStepsAndScenarios(String tag, String type){
		String queryString="";
		if(type.equals("step")) {
			queryString = stepTagQuery;
		}else{
			queryString = scenarioTagQuery;
		}
		queryString = queryString.replace("tag", tag);
		sskIndex = "ssk/_doc/_search";
		JsonObject result = new JsonObject();
		entity = new HttpEntity<>(queryString, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			JsonObject param = sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			result.addProperty("total", Integer.valueOf(param.get("total").getAsString()));
			JsonArray steps = param.getAsJsonArray("hits");
			result.add("data", steps);
			result.addProperty("type", type);
			
		}
		else{
			result =  null;
		}
		return result;
	}
	
	
	public JsonObject  fullSearch(String word){
		String queryString = fullTextSearchQueryBoby.replace("value", word);
		sskIndex = "ssk/_doc/_search";
		JsonObject result = new JsonObject();
		entity = new HttpEntity<>(queryString, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			JsonObject param = sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			result.addProperty("total", Integer.valueOf(param.get("total").getAsString()));
			String input = param.getAsJsonArray("hits").toString();
			input = input.toString().replaceAll("\"_source\":\\{", "");
			input = input.replaceAll("}}", "}");
			result.add("data", sskServices.getParser().parse(input).getAsJsonArray());
			return result;
		}
		else{
			return null;
		}
	}
	
	/**
	 * <p>
	 *     This function retrieves on document (which can be a scenario, step, resource, etc..  ) from Elasticsearch
	 * </p>
	 * @param identifier : The document's ID in Elasticsearch
	 * @return  a JsonObject which is the document content or null if the request on Elasticsearch returns 404 (not found)
	 */
	 public JsonObject getDocumentById(String identifier ){
		sskIndex = "ssk/_doc/"+identifier;
		JsonObject result = new JsonObject();
		try{
			ResponseEntity<String> response = this.restTemplate.getForEntity( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, String.class);
			if (response.getStatusCode().is2xxSuccessful()) {
				boolean found = sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("found").getAsBoolean();
				if(found){
					result = sskServices.getParser().parse(response.getBody()).getAsJsonObject();
				}
			}
		}catch(HttpClientErrorException exception){
			logger.warn(exception.getClass().getCanonicalName() + " - " + exception.getMessage()+ " - Request on Elasticsearch for " + identifier + " document's ID");
			result =  null;
		}
		 return result;
	 }
}
