package ssk.server.service;


import com.google.gson.*;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class ElasticServices {


    @Autowired
    private ElasticsearchOperations es;

    @Autowired
    private SSKServices sskServices;

    @Value("${elasticsearch.port2}")
    private String elasticSearchPort;

    @Value("${elasticsearch.index}")
    private String sskIndex;

    private RestTemplate restTemplate = new RestTemplate();
    private HttpHeaders headers;
    private List<String> lastProperties  = new ArrayList<>();
    private static final Logger logger = LoggerFactory.getLogger(ElasticServices.class.getName());


    public static final List<String> nestedStepMappings = Arrays.asList("TEI.teiHeader.fileDesc.titleStmt.author",  "TEI.text.body.listEvent.event",  "TEI.text.body.listEvent.event.head", "TEI.text.body.listEvent.event.head.content", "TEI.text.body.listEvent.event.head.term", "TEI.text.body.listEvent.event.head.ref",
            "TEI.text.body.listEvent.event.desc.term","TEI.text.body.listEvent.event.desc.content");
    public static final List<String> nestedScenarioMappings = Arrays.asList("TEI.teiHeader.fileDesc.titleStmt.author", "TEI.text.body.div.desc.content" , "TEI.text.body.div.desc.term", "TEI.text.body.listEvent.event");

    public static final List<String> metadata = Arrays.asList("techniques", "objects", "disciplines", "standards", "standards.desc",   "activities");
    public static final List<String> nestedREsMappings = Arrays.asList("general", "project");
    
    
    public static final List<String> toolTypeVariants = Arrays.asList("tool", "service", "software");
    public static final List<String> specTypeVariants = Arrays.asList("spec", "specification", "standard");
    public static final List<String> documentationTypeVariants = Arrays.asList("documentation", "official_documentation");
	
	HashMap<String, List<String>> resourceTypeVariant = new HashMap<>();
	
	
	public ElasticServices() {
		resourceTypeVariant.put("tool", Arrays.asList("tool", "service", "software"));
		resourceTypeVariant.put("specification", Arrays.asList("spec", "specification", "standard"));
		resourceTypeVariant.put("documentation", Arrays.asList("documentation", "official_documentation"));
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

        List<String> nested = new ArrayList<>() ;
        JSONObject enabled = new JSONObject();
        JSONObject nestedMapping ;
        enabled.put("enabled", false);
        JSONObject typeContent = new JSONObject();
        typeContent.put("_all", enabled);
        typeContent.put("dynamic", true);
        JSONObject type = new JSONObject();
        type.put(mappingType, typeContent);
        JSONObject mapping ;
        JSONObject parentType = new JSONObject();
        switch (mappingType){
            case "step":
                parentType.put("type", "scenario");
                typeContent.put("_parent", parentType);
                nested = nestedStepMappings;
            break;
            case "step-metadata":
                parentType.put("type", "step");
                typeContent.put("_parent", parentType);
                nested = metadata;
            break;
            case "scenario-metadata":
                parentType.put("type", "scenario");
                typeContent.put("_parent", parentType);
                nested = metadata;
            break;
            case "resource":
                parentType.put("type", "step");
                typeContent.put("_parent", parentType);
                nested = nestedREsMappings;
            break;
            case "resource-metadata":
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
        properties.put("desc",element);

        JSONObject term = new JSONObject();
        term.put("type", "nested");
        term.put("properties", properties);
        JSONObject parent  = new JSONObject();
        parent.put("type", "resource");
        term.put("_parent", parent);

        properties = new JSONObject();
        properties.put("terms", term);

        JSONObject resourceContent = new JSONObject();
        resourceContent.put("type", "nested");
        resourceContent.put("properties", properties);
        JSONObject resourceParent  = new JSONObject();
        resourceParent.put("type", "step");
        resourceContent.put("_parent", resourceParent);

        JSONObject resources = new JSONObject();
        resources.put("general",resourceContent);
        resources.put("project",resourceContent);

        properties = new JSONObject();
        properties.put("properties",resources);

        setHeaders();
        HttpEntity<String> entity = new HttpEntity<>(properties.toString(), this.headers);
        ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/_mapping/resource" , HttpMethod.PUT, entity, String.class);
    }

    public boolean pushData(JsonArray scenarioAndStep, int iteration) throws Exception {
        String type;
         String  idParent="";
        boolean result = true;
        setHeaders();
        HttpEntity<String> entity;
	    JsonObject resources =null;
        for (int j = 0; j < scenarioAndStep.size(); j++) {
            type = "step";
             JsonObject metaData  = scenarioAndStep.get(j).getAsJsonObject().remove("metadata").getAsJsonObject();
            if (j == 0) {
                type = "scenario";
            }
            else {
                type += "?parent=" + idParent;
	              resources  = scenarioAndStep.get(j).getAsJsonObject().remove("resources").getAsJsonObject();
            }
            entity = new HttpEntity<>(scenarioAndStep.get(j).toString(), this.headers);
            ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/" + type, HttpMethod.POST, entity, String.class);
            JSONObject responseBody = new JSONObject(response.getBody());
            result = result && Boolean.parseBoolean(responseBody.get("created").toString());
            if (result) {
                if (j == 0) {
                    idParent = responseBody.get("_id").toString();
                    final String  id = idParent;
                    this.executeThread("scenario-metadata", id, metaData, this.headers);
                }
                else {
                    final String idStep = responseBody.get("_id").toString();
	                this.executeThread("step-metadata", idStep, metaData, this.headers);
	                this.executeThread("resources", idStep, resources, this.headers);
	                
                }
            } else break;
        }
        if (result)
        logger.info("----- > Successful push scenario " + iteration + " on ElasticSearch with result id: " );
        return result;
    }
	
    void executeThread(String type, String id, JsonObject data, HttpHeaders headers) {
		Thread t = new Thread(() -> {
			try {
				if (type.equals("resources")) {
					//pushResources(id, data, headers);
				} else {
					this.pushMetadata(type, id, data, headers);
					
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
		t.run();
	}
 
	private void pushResources(String idParent, JsonObject data, HttpHeaders headers) throws  Exception{
		Set<Map.Entry<String, JsonElement>> entries = data.entrySet();
		String source = "";
		setHeaders();
		HttpEntity<String> entity;
		String type = "resource?parent=" + idParent;
		HashMap<String, List<JsonObject>> dataToPush = new HashMap<>();
		entries.forEach(entry ->{
			String category = entry.getKey().toString().equals("generalResources") ? "general"  : "project";
			JsonArray resources = data.get(entry.getKey()).getAsJsonArray();
			String[] temp = new String[1];
			resources.forEach(resource -> {
				String resourceType ;
				System.out.println(resource.toString());
				if(resource.getAsJsonObject().has("type")){
					temp[0] = resource.getAsJsonObject().get("type").getAsString();
					if(temp[0].equals("code") && resource.getAsJsonObject().has("subtype")){
						temp[0] = resource.getAsJsonObject().get("subtype").getAsString();
					}
					final String resType = temp[0];
					this.resourceTypeVariant.   forEach((key, value) -> {
						if(value.contains(resType.toLowerCase())){
							temp[0] = key.toString();
						}
					});
					 resourceType = temp[0];
				}
				
				
				
			});
			
		});
		
		/*for (Map.Entry<String, JsonElement> entry: entries) {
			HashMap<String, List<JsonObject>> dataToPush = new HashMap<>();
			for (int i = 0; i < resources.size(); i++) {
				JsonObject item = resources.get(i).getAsJsonObject();//{"source":"zotero","subtype":"website","target":"JDUB296N","type":"database"}
				List<JsonObject> resourceData = new ArrayList<>();
				if(item.has("source")){
                    source = item.get("source").getAsString();
                    switch (source){
                        case "zotero":
	                        resourceData.add(sskServices.getZoteroResource(item.get("target").getAsString()));
	                        
                            dataToPush.add(entry.getKey().toString().equals("generalResources") ? "general"  : "project" , sskServices.getZoteroResource(item.get("target").getAsString()));
                            entity = new HttpEntity<>(dataToPush.toString(), this.headers);
                            
                            break;
                        case "github":
                        	
                            
                            break;
                        case "hal":
                            break;
                        case "BeQuali":
                            break;
                        default:
                            break;
                    }
                }
                else{
					
				}
				
			}*/
			//ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/" + type, HttpMethod.POST, entity, String.class);
		}
	


    private  void pushMetadata(String type, String idParent, JsonObject data, HttpHeaders headers) throws Exception{
        if(data.get("standard") != null){
            JsonArray standards = sskServices.getWholeStandard(data.remove("standard").getAsJsonArray());
            data.add("standards", standards.getAsJsonArray());
        }
        HttpEntity entity = new HttpEntity<>(data.toString(), headers);
        ResponseEntity<String> response = this.restTemplate.exchange("http://localhost:" + elasticSearchPort + "/" + sskIndex + "/" + type + "?parent="+ idParent, HttpMethod.POST, entity, String.class);
    }


    private void setHeaders() {
        this.headers = new HttpHeaders();
        this.headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
    }



    public JSONObject addMappingFromPath(String path, String mappingType) {
        JSONObject properties = new JSONObject();
        JSONObject elt = new JSONObject();
        elt.put("type", "nested");
        String  isIn = "";
        JSONObject elt2 = new JSONObject();
        String[] pathArray  = path.split(Pattern.quote("."));
        String last = pathArray[pathArray.length-1];
        this.lastProperties.add(last);
        if(last.equals("content")){
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
        for(int i = pathArray.length -2; i >=0;  i--){
            elt = new JSONObject();
            if( i > 0){
                if( lastProperties.contains (pathArray[i].toString())){
                        JSONObject elt1 = new JSONObject();
                        elt1.put("type", "string");
                        properties = properties.getJSONObject("properties");
                         elt2 = new JSONObject();
                        elt2.put("properties", properties);
                        elt2.put("type", "nested");
                        elt.put(pathArray[i], elt2);
                    }
                    else{
                        elt.put(pathArray[i], properties);
                    }
                }
                else{
                
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





}