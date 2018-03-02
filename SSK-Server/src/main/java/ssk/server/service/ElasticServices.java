package ssk.server.service;



import com.google.gson.*;
import jdk.nashorn.internal.parser.JSONParser;
import org.json.JSONException;
import org.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.NodeList;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class ElasticServices {
	
	
	@Autowired
	private ElasticsearchOperations es;
	
	@Autowired
	private SSKServices sskServices;
	
	@Autowired
	private GithubApiService githubApiService;
	
	@Value("${elasticsearch.port2}")
	private String elasticSearchPort;
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
	private static JsonParser parser  = new JsonParser();
	
	private Gson gson;
	
	List<String> targetList ;
	
	private RestTemplate restTemplate = new RestTemplate();
	private HttpHeaders headers;
	private List<String> lastProperties = new ArrayList<>();
	private static final Logger logger = LoggerFactory.getLogger(ElasticServices.class.getName());
	private static StringBuilder xmlStringBuilder;
	private static UriComponentsBuilder builder ;
	private static HttpEntity<String> entity;
	private static List<String> include;
	private static List<String> exclude;
	
	
	public static final List<String> nestedStepMappings = Arrays.asList("TEI.teiHeader.fileDesc.titleStmt.author","TEI.teiHeader.fileDesc.titleStmt.author.persName ", "TEI.text.body.listEvent.event", "TEI.text.body.listEvent.event.head", "TEI.text.body.listEvent.event.head.content", "TEI.text.body.listEvent.event.head.term", "TEI.text.body.listEvent.event.head.ref",
			"TEI.text.body.listEvent.event.desc.term", "TEI.text.body.listEvent.event.desc.content");
	public static final List<String> nestedScenarioMappings = Arrays.asList("TEI.teiHeader.fileDesc.titleStmt.author", "TEI.text.body.div.desc.content", "TEI.text.body.div.desc.term", "TEI.text.body.listEvent.event");
	
	public static final List<String> metadata = Arrays.asList("techniques", "objects", "disciplines", "standards", "standards.desc", "activities");
	public static final List<String> nestedREsMappings = Arrays.asList("general", "project");
	
	
	public static final List<String> toolTypeVariants = Arrays.asList("tool", "service", "software");
	public static final List<String> specTypeVariants = Arrays.asList("spec", "specification", "standard");
	public static final List<String> documentationTypeVariants = Arrays.asList("documentation", "official_documentation");
	
	private static List<String>  stringfields=  Arrays.asList("title", "description");
	
	HashMap<String, List<String>> resourceTypeVariant = new HashMap<>();
	
	
	public ElasticServices() {
		resourceTypeVariant.put("tool", Arrays.asList("tool", "service", "software"));
		resourceTypeVariant.put("specification", Arrays.asList("spec", "specification", "standard"));
		resourceTypeVariant.put("documentation", Arrays.asList("documentation", "official_documentation"));
		gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		targetList = new ArrayList<>();
	}
	
	
	public ElasticsearchOperations getEs() {
		return es;
	}
	
	public void setEs(ElasticsearchOperations es) {
		this.es = es;
	}
	
	
	public ResponseEntity<Object> getElastichHealth() {
		HttpStatus status;
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("content", "AVAILABLE");
		ResponseEntity<String> response = this.restTemplate.getForEntity("http://localhost:" + elasticSearchPort + "_cat/health", String.class);
		if (response.getStatusCode().equals(HttpStatus.NOT_FOUND) || response.getBody().contains("red")) {
			jsonObject.put("content", "NOT AVAILABLE");
		}
		return ResponseEntity.status(HttpStatus.OK)
				       .headers(this.headers)
				       .body(sskServices.toJson(jsonObject));
	}
	
	public boolean createMappings(String mappingType) {
		
		List<String> nested = new ArrayList<>();
		JSONObject enabled = new JSONObject();
		JSONObject nestedMapping;
		enabled.put("enabled", false);
		JSONObject typeContent = new JSONObject();
		typeContent.put("_all", enabled);
		typeContent.put("dynamic", true);
		JSONObject type = new JSONObject();
		type.put(mappingType, typeContent);
		JSONObject mapping;
		JSONObject parentType = new JSONObject();
		switch (mappingType) {
			case "step":
				parentType.put("type", "scenario");
				typeContent.put("_parent", parentType);
				nested = nestedStepMappings;
				break;
			case "step_metadata":
				parentType.put("type", "step");
				typeContent.put("_parent", parentType);
				nested = metadata;
				break;
			case "scenario_metadata":
				parentType.put("type", "scenario");
				typeContent.put("_parent", parentType);
				nested = metadata;
				break;
			case "resource":
				parentType.put("type", "step");
				typeContent.put("_parent", parentType);
				nested = nestedREsMappings;
				break;
			case "resource_metadata":
				parentType.put("type", "resource");
				typeContent.put("_parent", parentType);
				nested = metadata;
				break;
			default:
				nested = nestedScenarioMappings;
				break;
			
		}
		
		setHeaders();
		HttpEntity<String> entity = new HttpEntity<>(typeContent.toString(), this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/_mapping/" + mappingType, HttpMethod.PUT, entity, String.class);
		String responseBody = response.getBody();
		mapping = new JSONObject(responseBody);
		boolean result = false;
		Set keys = mapping.keySet();
		Iterator iter = keys.iterator();
		while (iter.hasNext()) {
			String key = (String) iter.next();// loop to get the dynamic key
			result = (boolean) mapping.get(key);
			logger.info("key : " + key);
			logger.info(" value :" + result);
		}
		for (int j = 0; j < nested.size(); j++) {
			addMappingFromPath(nested.get(j), mappingType);
		}
		return result;
	}
	
	private void createResourcesMapping() {
		
		JSONObject element = new JSONObject();
		JSONObject properties = new JSONObject();
		
		element.put("type", "nested");
		properties.put("desc", element);
		
		JSONObject term = new JSONObject();
		term.put("type", "nested");
		term.put("properties", properties);
		JSONObject parent = new JSONObject();
		parent.put("type", "resource");
		term.put("_parent", parent);
		
		properties = new JSONObject();
		properties.put("terms", term);
		
		JSONObject resourceContent = new JSONObject();
		resourceContent.put("type", "nested");
		resourceContent.put("properties", properties);
		JSONObject resourceParent = new JSONObject();
		resourceParent.put("type", "step");
		resourceContent.put("_parent", resourceParent);
		
		JSONObject resources = new JSONObject();
		resources.put("general", resourceContent);
		resources.put("project", resourceContent);
		
		properties = new JSONObject();
		properties.put("properties", resources);
		
		setHeaders();
		HttpEntity<String> entity = new HttpEntity<>(properties.toString(), this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/_mapping/resource", HttpMethod.PUT, entity, String.class);
	}
	
	public boolean pushData(JsonArray scenarioAndStep, int iteration) throws Exception {
		String type;
		String idParent = "";
		boolean result = true;
		setHeaders();
		HttpEntity<String> entity;
		JsonObject resources = null;
		for (int j = 0; j < scenarioAndStep.size(); j++) {
			type = "step";
			JsonObject metaData = scenarioAndStep.get(j).getAsJsonObject().remove("metadata").getAsJsonObject();
			if (j == 0) {
				type = "scenario";
			} else {
				type += "?parent=" + idParent;
				resources = scenarioAndStep.get(j).getAsJsonObject().remove("resources").getAsJsonObject();
			}
			entity = new HttpEntity<>(scenarioAndStep.get(j).toString(), this.headers);
			ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/" + type, HttpMethod.POST, entity, String.class);
			JSONObject responseBody = new JSONObject(response.getBody());
			result = result && Boolean.parseBoolean(responseBody.get("created").toString());
			if (result) {
				if (j == 0) {
					idParent = responseBody.get("_id").toString();
					final String id = idParent;
					this.executeThread("scenario_metadata", id, metaData, this.headers);
				} else {
					final String idStep = responseBody.get("_id").toString();
					this.executeThread("step_metadata", idStep, metaData, this.headers);
					this.executeThread("resources", idStep, resources, this.headers);
					
				}
			} else break;
		}
		if (result)
			logger.info("----- > Successful push scenario " + iteration + " on ElasticSearch with result id: ");
		return result;
	}
	
	void executeThread(String type, String id, JsonObject data, HttpHeaders headers) {
		Thread t = new Thread(() -> {
			try {
				if (type.equals("resources")) {
					pushResources(id, data, headers);
				} else {
					this.pushMetadata(type, id, data, headers);
					
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
		t.run();
	}
	
	private void pushResources(String idParent, JsonObject data, HttpHeaders headers) throws Exception {
		Set<Map.Entry<String, JsonElement>> entries = data.entrySet();
		HttpEntity<String> entity;
		
		String type = "resource?parent=" + idParent;
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
				
				if (resource.has("source")) {
					String source = resource.get("source").getAsString();
					try {
						if(!targetList.contains(resource.get("target").getAsString())) {
							targetList.add(resource.get("target").getAsString());
							switch (source) {
								case "zotero":
										resourceData.add(sskServices.getZoteroResource(resource.get("target").getAsString(), resourceType));
									break;
								case "github":
									resourceData.add(githubApiService.getRepositoryData(resource.get("target").getAsString().split("github.com")[1], resourceType));
									break;
								case "hal":
								case "BeQuali":
								default:
									JsonObject elt= new JsonObject();
									elt.addProperty("title", source);
									elt.addProperty("url", resource.get("target").getAsString());
									elt.addProperty("type", resourceType);
									resourceData.add(elt);
									break;
							}
						}
					} catch (Exception e) {
						logger.error(e.getMessage());
						resourceData.add(this.sskServices.scraptWebPage(source, resource.get("target").getAsString(),resourceType));
					}
				}
			});
			dataToPush.put(category, resourceData);
		});
		if (dataToPush.size() > 0) {
			setHeaders();
			entity = new HttpEntity<>(gson.toJson(dataToPush), this.headers);
			this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/" + type, HttpMethod.POST, entity, String.class);
		}
	}
	
	
	private void pushMetadata(String type, String idParent, JsonObject data, HttpHeaders headers) throws Exception {
		if (data.get("standard") != null) {
			JsonArray standards = sskServices.getWholeStandard(data.remove("standard").getAsJsonArray());
			data.add("standards", standards.getAsJsonArray());
		}
		HttpEntity entity = new HttpEntity<>(data.toString(), headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/" + type + "?parent=" + idParent, HttpMethod.POST, entity, String.class);
	}
	
	
	private void setHeaders() {
		this.headers = new HttpHeaders();
		this.headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
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
		setHeaders();
		HttpEntity<String> entity = new HttpEntity<>(properties.toString(), this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/_mapping/" + mappingType, HttpMethod.PUT, entity, String.class);
		return elt;
	}
	
	public JsonObject getItemsByID(String type, boolean fromSSK){
		
		JsonObject result = new JsonObject();
		JsonObject param = new JsonObject();
		param.addProperty("_source", false);
		setHeaders();
		sskIndex = "ssk/" + type;
		entity = new HttpEntity<>(param.toString(), this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/_search?size=10000" , HttpMethod.POST, entity, String.class);
		if(response.getStatusCode().is2xxSuccessful()){
			param = this.parser.parse(response.getBody()).getAsJsonObject().get("hits").getAsJsonObject();
			result.addProperty("total", Integer.valueOf(param.get("total").getAsString()));
			if(fromSSK){
				result.add(type +'s', param.get("hits").getAsJsonArray());
			}
		}
		return result;
	}
	
	public JSONObject getStepPagination(int from, int size){
		JSONObject jsonResult = new JSONObject();
			//http://localhost:9200/ssk/step/_search?pretty=true
		sskIndex = "ssk/step";
		String queryBody = "{\n" +
				                   "    \"from\": " + from + ','+
				                   "    \"size\": " + size + ','+
				                   "    \"_source\": {\n" +
				                   "        \"include\": [\n" +
				                   "            \"*.head.*\"\n" +
				                   "        ],\n" +
				                   "        \"exclude\": [\n" +
				                   "            \"*.desc\",\n" +
				                   "            \"*.teiHeader.*\",\n" +
				                   "            \"*.linkGrp.*\"\n" +
				                   "        ]\n" +
				                   "    },\n" +
				                   "    \"query\": {\n" +
				                   "        \"bool\": {\n" +
				                   "            \"should\": [\n" +
				                   "                {\n" +
				                   "                    \"has_child\": {\n" +
				                   "                        \"type\": \"step_metadata\",\n" +
				                   "                        \"query\": {\n" +
				                   "                            \"match_all\": {}\n" +
				                   "                        },\n" +
				                   "                        \"inner_hits\": {}\n" +
				                   "                    }\n" +
				                   "                },\n" +
				                   "                {\n" +
				                   "                    \"has_parent\": {\n" +
				                   "                        \"type\": \"scenario\",\n" +
				                   "                        \"query\": {\n" +
				                   "                            \"match_all\": {}\n" +
				                   "                        },\n" +
				                   "                        \"inner_hits\": {\n" +
				                   "                            \"_source\": {\n" +
				                   "                                \"include\": [\n" +
				                   "                                    \"*.head.*\"\n" +
				                   "                                ],\n" +
				                   "                                \"exclude\": [\n" +
				                   "                                    \"*.url\",\n" +
				                   "                                    \"*.desc\",\n" +
				                   "                                    \"*.listEvent.*\",\n" +
				                   "                                    \"*.text.div\",\n" +
				                   "                                    \"*.teiHeader.*\",\n" +
				                   "                                    \"*.desc.term\",\n" +
				                   "                                    \"*.desc.type\",\n" +
				                   "                                    \"*.desc.lang\"\n" +
				                   "                                ]\n" +
				                   "                            }\n" +
				                   "                        }\n" +
				                   "                    }\n" +
				                   "                },\n" +
				                   "                {\n" +
				                   "                    \"match_all\": {}\n" +
				                   "                }\n" +
				                   "            ]\n" +
				                   "        }\n" +
				                   "    }\n" +
				                   "}";
		setHeaders();
		entity = new HttpEntity<>(queryBody.replaceAll("\\\\",""), this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		System.out.println(response.getBody());
		return jsonResult;
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
				res = parser.parse( queryScenarioMetadata(scenarioId));
			break;
		}
		
		return res;
	}
	
	private JsonElement loadContentByKey(JSONObject json, String keyToCheck){
		Iterator<?> json_keys = json.keys();
		JsonElement content = null;
		boolean enter = true;
		while( json_keys.hasNext() && enter){
			String json_key = (String)json_keys.next();
			try{
				content = parser.parse(json.optJSONObject(json_key).toString());
				if (json_key.equals(keyToCheck)){
					enter = false;
					break;
				}
				content = loadContentByKey(new JSONObject(content.toString()), keyToCheck);
				
			}
			catch (NullPointerException e){
				//e.printStackTrace();
				if (json_key.equals(keyToCheck)){
					content = parser.parse(json.getJSONArray(json_key).toString());
					enter = false;
				}
			}
			
		}
		return content;
	}
	
	private JsonElement queryDescription(String scenarioId) {
		JsonElement jsonResult ;
		include = Arrays.asList("\"*.desc.lang\"", "\"*.desc.content\"");
		exclude = Arrays.asList("\"*.listEvent.*\"", "\"*.text.div\"","\"*.desc.term\"", "\"*.desc.type\"", "\"*.teiHeader.*\"");
		JsonElement inSource = new JsonObject();
		inSource.getAsJsonObject().addProperty("include", include.toString());
		inSource.getAsJsonObject().addProperty("exclude", exclude.toString());
		JsonElement source = new JsonObject();
		source.getAsJsonObject().add("_source", inSource);
		setHeaders();
		
		sskIndex = "ssk/scenario/_search?q=_id:" + scenarioId;
		String sourceText = source.toString().replaceAll("\\\\","").replaceAll("\\\"\\[","[").replaceAll("]\\\"","]");
		entity = new HttpEntity<>(sourceText, this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex, HttpMethod.POST, entity, String.class);
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
	
	private JsonElement queryTitle(String scenarioId){
		sskIndex = "ssk/scenario/" + scenarioId;
		builder = UriComponentsBuilder.fromUriString("http://localhost:" + elasticSearchPort + "/" + sskIndex)
				          .queryParam("_source_include", "*.head.*")
				          .queryParam("_source_exclude", "*.head.type,*.listEvent,*.desc,*.author");
		setHeaders();
		entity = new HttpEntity<>(this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, String.class);
		
		return loadContentByKey(new JSONObject(response.getBody()), "head");
	}
	
	private JsonElement queryImage(String scenarioId){
		JsonElement jsonResult = new JsonObject();
		include = Arrays.asList("\"*.graphic\"");
		exclude = Arrays.asList("\"*.listEvent.*\"", "\"*.text.div\"", "\"*.teiHeader.*\"", "\"*.div.desc\"");
		JsonElement inSource = new JsonObject();
		inSource.getAsJsonObject().addProperty("include", include.toString());
		inSource.getAsJsonObject().addProperty("exclude", exclude.toString());
		JsonElement source = new JsonObject();
		source.getAsJsonObject().add("_source", inSource);
		setHeaders();
		
		sskIndex = "ssk/scenario/_search?q=_id:" + scenarioId;
		String sourceText = source.toString().replaceAll("\\\\","").replaceAll("\\\"\\[","[").replaceAll("]\\\"","]");
		entity = new HttpEntity<>(sourceText, this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			jsonResult = loadContentByKey((JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0), "graphic") ;
		}
		return  jsonResult;
	}
	
	private String queryScenarioMetadata(String scenarioId){
		JSONObject jsonResult = new JSONObject();
		String queryBody = "{\"query\":{\"has_child\" : {\"type\" : \"scenario_metadata\",\"query\" : {\"match_all\": {}},\"inner_hits\" : {} }},\"_source\":false}";
		sskIndex = "ssk/scenario/_search?q=_id:" + scenarioId;
		setHeaders();
		entity = new HttpEntity<>(queryBody.replaceAll("\\\\",""), this.headers);
		ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex, HttpMethod.POST, entity, String.class);
		if (response.getStatusCode().is2xxSuccessful()) {
			JSONObject temp ;
			temp = (JSONObject) new JSONObject(response.getBody()).getJSONObject("hits").getJSONArray("hits").get(0);
			jsonResult = (JSONObject) temp.getJSONObject("inner_hits").getJSONObject("scenario_metadata").getJSONObject("hits").getJSONArray("hits").get(0);
			temp = jsonResult.getJSONObject("_source");
			jsonResult = temp;
		}
		return  jsonResult.toString();
	}
	
	
	
}
