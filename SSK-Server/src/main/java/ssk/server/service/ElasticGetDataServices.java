package ssk.server.service;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ElasticGetDataServices {
	
	@Value("${all_step_query}")
	private String allStepQuery;
	
	@Value("${scenario_desc_query}")
	private String scenarioDescQuery;
	
	@Value("${scenario_image_query}")
	private String scenarioImageQuery;
	
	@Value("${scenario_metadata_query}")
	private String scenarioMetadataQuery;
	
	@Value("${standard_query}")
	private String standardQuery;
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
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
			String input  = param.getAsJsonArray("hits").toString();
			input = input.toString().replaceAll("\"_source\":\\{\"TEI\":\\{\"text\":\\{\"body\":\\{\"listEvent\":\\{\"event\":\\{", "");
			input = input.replaceAll("((\\s)*\\}){5}", "");
			input = input.replaceAll("}},\\{\"_index", "},{\"_index");
			String reverse = new StringBuffer(input).reverse().toString();
			reverse = reverse.replaceFirst("]}", "]");
			input = new StringBuffer(reverse).reverse().toString();
			//input = input.replaceAll("](\\s)*},(\\s)*\"", "]}},\"");
			result.add ("steps", sskServices.getParser().parse(input).getAsJsonArray());
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
		JSONObject jsonResult = new JSONObject();
		sskIndex = "ssk/scenario/_search?q=_id:" + scenarioId;
		//requestHeadersParams.setHeaders();
		entity = new HttpEntity<>(scenarioMetadataQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			JSONObject temp ;
			temp = (JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0);
			jsonResult = (JSONObject) temp.getJSONObject("inner_hits").getJSONObject("scenario_metadata").getJSONObject("hits").getJSONArray("hits").get(0);
			temp = jsonResult.getJSONObject("_source");
			jsonResult = temp;
		}
		return  jsonResult.toString();
	}
	
	public JsonElement getStandard(String standardAbbrName) {
		standardAbbrName = standardAbbrName.replaceAll("\"", "").replaceAll("\\\\n(\\s)+", " ");
		//sskIndex = "ssk/standard/_search?size=1";
		//requestHeadersParams.setHeaders();
		JsonElement jsonResult = new JsonObject();
		entity = new HttpEntity<>(standardQuery.replace("value", standardAbbrName), requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex+ "/_doc/_search", HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			jsonResult = this.sskServices.getParser().parse(response.getBody()).getAsJsonObject().getAsJsonObject("hits");
			if(jsonResult.getAsJsonObject().get("total").toString().equals("0")){
				jsonResult = null;
			}
			else{
				//jsonResult = jsonResult.getAsJsonObject().getAsJsonArray("hits").get(0);
				jsonResult = jsonResult.getAsJsonObject().getAsJsonArray("hits");
			}
		}
		return jsonResult;
	}
	
	private JsonElement loadContentByKey(JSONObject json, String keyToCheck){
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
				//e.printStackTrace();
				if (json_key.equals(keyToCheck)){
					content = sskServices.getParser().parse(json.getJSONArray(json_key).toString());
					enter = false;
				}
			}
			
		}
		return content;
	}
	
	private JsonElement queryTitle(String scenarioId){
		
		sskIndex = "ssk/_doc/SSK_sc_LIBS";
		UriComponentsBuilder builder ;
		builder = UriComponentsBuilder.fromUriString( this.elasticServices.getElasticSearchPort() + "/" + sskIndex)
				          .queryParam("_source_include", "*.head.*")
				          .queryParam("_source_exclude", "*.head.type,*.listEvent,*.desc,*.author");
		//requestHeadersParams.setHeaders();
		entity = new HttpEntity<>(requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, String.class);
		
		return loadContentByKey(new JSONObject(response.getBody()), "head");
	}
	
	private JsonElement queryDescription(String scenarioId) {
		JsonElement jsonResult ;
		JsonElement source = new JsonObject();
		//requestHeadersParams.setHeaders();
		sskIndex = "ssk/_doc/SSK_sc_LIBS";
		entity = new HttpEntity<>(scenarioDescQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			final JsonArray result = new JsonArray();
			source = loadContentByKey((JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0), "desc") ;
			if(source.isJsonArray()){
				source.getAsJsonArray().forEach(desc->{
					if(desc.toString().contains("content")){
						result.getAsJsonArray().add(desc.getAsJsonObject());
					}
				});
				jsonResult = result;
			}
			else{
				jsonResult = source;
			}
		} else {
			jsonResult =  null;
		}
		return jsonResult;
	}
	
	
	
	private JsonElement queryImage(String scenarioId){
		JsonElement jsonResult = new JsonObject();
		//requestHeadersParams.setHeaders();
		sskIndex = "ssk/_doc/SSK_sc_LIBS";
		entity = new HttpEntity<>(scenarioImageQuery, requestHeadersParams.getHeaders());
		ResponseEntity<String> response = this.restTemplate.exchange( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			jsonResult = loadContentByKey((JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0), "graphic") ;
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
			case "scenario_metadata":
				res = sskServices.getParser().parse( queryScenarioMetadata(scenarioId));
				break;
		}
		
		return res;
	}
	
	public JsonElement getAllResources(String type) {
		JsonElement jsonResult = new JsonObject();
		//requestHeadersParams.setHeaders();
		sskIndex = "ssk/_doc/_search?q=type:" + type +"&size=1000";
		//requestHeadersParams.setHeaders();
		ResponseEntity<String> response = this.restTemplate.getForEntity( this.elasticServices.getElasticSearchPort() + "/" + sskIndex, String.class) ;
		if (response.getStatusCode().is2xxSuccessful()) {
			JsonObject param = sskServices.getParser().parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			String input = param.getAsJsonArray("hits").toString();
			
			switch (type){
				case "resource":
				case "standard":
					input = input.toString().replaceAll("\"_source\":\\{", "");
					input = input.replaceAll("}}", "}");
					jsonResult.getAsJsonObject().addProperty("total", Integer.valueOf(param.get("total").getAsString()));
					jsonResult.getAsJsonObject().add(type+'s', this.sskServices.getParser().parse(input).getAsJsonArray());
					break;
				default:
					jsonResult = this.sskServices.getParser().parse(input).getAsJsonArray().get(0).getAsJsonObject()
							             .getAsJsonObject("_source");
					jsonResult = jsonResult.getAsJsonObject().get("TEI").getAsJsonObject()
							             .getAsJsonObject("text").getAsJsonObject("body").getAsJsonArray("div");
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
	
}
