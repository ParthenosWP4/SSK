package ssk.server.service;


import com.google.gson.*;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.*;
import java.nio.charset.Charset;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;


/**
 * <h1>
 *     This class is the main class of the application as it has many important functionnalities, It's responsible of
 *     <ul>
 *         <li> Querying scenario and step contents from Github </li>
 *         <li> Parsing TEI content</li>
 *         <li> Checking whether or not scenarios or steps are valides</li>
 *         <li> Converting those content into JSON format for indexation with Elastisearch</li>
 *     </ul>
 * </h1>
 *
 */



@Service
public class SSKServices {
    
    @Value("${elasticsearch.link}")
    private String elasticSearchPort;
    
    @Value("${elasticsearch.index}")
    private String sskIndex;
    
    @Value("${specificationsFolder}")
    private String specDirectory;
	
	@Value("${dataProcessingFolder}")
	private String dataProcessingFolder;
    
    @Value("${standardsFolder}")
    private String standardsFolder;
    
    @Value("${glossaryFileName}")
    private String glossaryFileName;
    
    @Value("${standardsFileName}")
    private String standardsFileName;
    
    @Value("${scenariosFolder}")
    private String scenariosFolder;
    
    @Value("${stepsFolder}")
    private String stepsFolder;
    
    @Value("${teiSSKRelaxNgFileName}")
    private String teiSSKRelaxNgPath;
    
    @Value("${teiToJsonFileName}")
    private String teiToJsonFileName;
    
    @Value("${teiSSKODDFileName}")
    private String teiSSKODDPath;
    
    @Value("${standardsFileName}")
    private String standards;
    
    @Value("${scenarioMetaDataPath}")
    private String scenarioMetaData;
    
    @Value("${stepMetaDataPath}")
    private String stepMetaData;
    
    @Value("${stepResourcesPath}")
    private String resourcesPath;
    
    @Value("${resourcePathOfStandard}")
    private String resourceStandardPath;
    
    @Value("#{'${metaDataTypeList}'.split(',')}")
    private List<String> metaDataTab;
	
	@Value("#{'${ignoredFiles}'.split(',')}")
	private List<String> ignoredFiles;
    
    @Value("${zoteroApihUrl}")
    private String zoteroApihUrl;
	
	
	@Value("${sskAuthorsPath}")
	private String sskAuthorsPath;
	
	@Value("${scenarioTitlePath}")
	private String scenarioTitlePath;
	
	@Value("${scenarioDesc}")
	private String scenarioDesc;
	
	
	@Autowired
	private GithubApiService githubApiService;
    
    
    @Autowired
    private ElasticServices elasticServices;
    
    @Autowired
    private RequestHeadersParams requestHeadersParams;
    
    @Autowired
    private SskTEIHandler sskTEIHandler;
	
	@Autowired
	private SskAPIService sskAPIService;
    
    @Autowired
    private ElasticGetDataServices elasticGetDataServices;
	
	
 
	public  CopyOnWriteArrayList<JsonObject> scenarioAndStep ;
    private RestTemplate restTemplate;
    private ClassLoader classLoader;
    private HashMap<String, String> platforms = new HashMap<>();
    private JsonObject parentSteps;
    private boolean commandsAlreadyInit;
	
	private HashMap<String, File> commands = new HashMap<>();
	public static  ConcurrentHashMap<String, String> commitsContent = new ConcurrentHashMap<>();
	public static CopyOnWriteArrayList<String> stepsToIgnore = new CopyOnWriteArrayList<>();
	public static  ConcurrentHashMap<String, List<String>> stepsScenarioWhenCommit = new ConcurrentHashMap<>();
	/**
	 * The invalidScenarios maintains a list of scenarios that would not been shown in Front-End
	 */
	private  HashSet<String> invalidScenarios;
    private JsonParser parser;
    private static Gson gson;
    private static StringBuilder xmlStringBuilder;
    private static Document doc;
    private static XPath xPath;
    private  NodeList node;
    private static final Logger logger = LoggerFactory.getLogger(SSKServices.class);
    private Map<String, JsonElement> standardsTab = new HashMap<>();
	
	private Runtime rt ;
	private boolean handleData;
	private JsonArray scenarios;
    
    
    public SSKServices() {
	    rt = Runtime.getRuntime();
        restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        classLoader = getClass().getClassLoader();
        parser = new JsonParser();
        gson = new GsonBuilder()
		               .excludeFieldsWithoutExposeAnnotation()
					   .setLenient()
		               .create();
        platforms.put("wp4", "groups/427927");
        parentSteps = new JsonObject();
	    invalidScenarios = new HashSet<>();
	    scenarioAndStep    = new CopyOnWriteArrayList<JsonObject>();
	    commands.put("teiTojsonCmd", getFile("./lib/saxon9he.jar"));
	    commands.put("validSSKFile", getFile("/lib/jing.jar"));
	   
    }
    
    
    
    
    
    /**
     * <P>
     *  In this function, we call application's services to
     *  push all SSK file content into Elasticsearch</br>
     *  This function is launched one time when deploy SSK application on new environment
     * For each scenario :
     * <ul>
     *     <li></li>
     * </ul>
     * get scenario content
     * validate scenario with relaXNG file
     * get scenario's steps and for each of them
     * <ul>
     *     <li>gets content</li>
     *     <li>validate step with relaXNG file</li>
     * </ul>
     * if all step files are valide
     * convert scenario content to json and push them in ElasticSearch
     * make the same with all scenario's step
     * </P>
     */


    public  void initializeData() {
        this.handleData = true;
        initCommands();
        
        //load Glossary's terms
        this.loadGlossaryTerms();
        
        //load Standards
       this.loadStandards();
        
        // Get List of Scenarios
        scenarios = githubApiService.getSSKElementsList("scenarios");
	    Map<String, String> scenariosStrings = new HashMap<>();
	    
	   ThreadPoolExecutor executor =   (ThreadPoolExecutor) Executors.newFixedThreadPool(scenarios.size());
	    scenarios.forEach(scenarioElt -> {
		    executor.submit(() -> {
			    new Thread(new Runnable() {
				    @Override
				    public void run() {
					    String scenarioName = scenarioElt.getAsJsonObject().get("name").getAsString();
					    if(ignoredFiles.toString().contains(scenarioName) || scenarioName.contains("unst")) return;
					    logger.info("SCENARIO " + scenarioName);
					    scenarioHandling(scenarioName, false);
				   }
			    }).start();
		    });
	    });
        this.handleData = false;
    }
    
    private void initCommands(){
    	if(!commandsAlreadyInit){
		    String relaxNgContent = githubApiService.getGithubFileContent(specDirectory, teiSSKRelaxNgPath);
		    convertStringToFile(relaxNgContent, teiSSKRelaxNgPath);
		    commands.put(teiSSKRelaxNgPath, getFile(teiSSKRelaxNgPath));
		    String xsltContent = githubApiService.getGithubFileContent(dataProcessingFolder, teiToJsonFileName);
		    convertStringToFile(xsltContent, teiToJsonFileName);
		    commands.put(teiToJsonFileName, getFile(teiToJsonFileName));
		    commandsAlreadyInit = true;
	    }
	    
    }
	
	
	
	public synchronized  void scenarioHandling(String scenarioName, boolean commit){
		invalidScenarios.add(scenarioName);
		if(commit){
			initCommands();
			scenarioName +=".xml";
		}
		String scenarioContent = githubApiService.getGithubFileContent(scenariosFolder, scenarioName);
		//scenariosStrings.put(scenarioName, ));
		//Here we have to check if a scenario is valide
		if (scenarioContent != null){
			//check if scenario already exists in elasticsearch
			String scenarioId = scenarioName.split("\\.")[0];
			JsonObject scenario = this.elasticGetDataServices.getDocumentById(scenarioId);
			if(scenario != null && scenario.has("stepRefs")){
				JsonArray oldSteps =  scenario.get("stepRefs").getAsJsonArray();
				oldSteps.forEach(item -> {
					String stepId = item.getAsString();
					int indexOldStep = stepsScenarioWhenCommit.get(scenarioId).indexOf(stepId);
					if(indexOldStep == -1){
						//The step is not anymore into scenario and have to be update in elasticsearch
						JsonObject step = this.elasticGetDataServices.getDocumentById(stepId);
						if(step != null){
							JsonArray newParents = new JsonArray();
							step = step.getAsJsonObject("_source");
							if(step.has("type") && step.get("type").equals("step")){
								step.get("parents").getAsJsonArray().forEach(stepParent -> {
									if(!stepParent.getAsJsonObject().get("id").equals(scenarioId)){
										newParents.add(stepParent);
									}
								});
								step.add("parents", newParents);
								elasticServices.updateElementById("step", stepId, step, null, null, null, true);
							}
						}
					}
				});
			}
			
			scenarioContent = scenarioContent.replaceAll("<item>", "<item type=\"listElt\">").replaceAll("(?s)<!--.*?-->", "");
			if (validateSSKFile(scenarioName, scenarioContent)) {
				JsonObject scenarioJson = new JsonObject();
				scenarioJson.add("scenarioDesc", sskTEIHandler.setScenarioDesc(scenarioContent, scenarioDesc));
				scenarioContent = removeEltFromXML("encodingDesc", scenarioContent);
				teiToJson(scenarioName, scenarioJson, scenarioContent, true, scenariosFolder);
				scenarioJson = scenarioJson.getAsJsonObject("json");
				scenarioJson.addProperty("GithubRef", scenarioName);
				scenarioJson.addProperty("type", "scenario");
				scenarioJson.addProperty("lastUpdate", githubApiService.getLastCommitDate("scenarios", scenarioName));
				scenarioJson.addProperty("push", true);
				scenarioJson.add("steps",scenarioJson.getAsJsonObject("TEI").getAsJsonObject("text").getAsJsonObject("body").getAsJsonObject("div").getAsJsonObject("listEvent").getAsJsonArray("event"));
				scenarioJson.add("cleanedSteps", new JsonArray());
				scenarioJson.add("stepRefs", new JsonArray());
				for (int j = 0; j < scenarioJson.getAsJsonArray("steps").size(); j++) {
					JsonObject stepJson = scenarioJson.getAsJsonArray("steps").get(j).getAsJsonObject();
					String stepId = removeDoubleQuote(stepJson.get("ref").toString());
					if((!commit) || (commit && ((CommitsHandleService.addedCommits.containsKey(stepId+".xml") || CommitsHandleService.modifiedCommits.containsKey(stepId+".xml"))))){
					    this.handleStep(scenarioJson,stepJson,  scenarioName, stepId, j);
						//scenarioJson.add("stepRefs", stepJson.getAsJsonArray("stepRefs"));
						if (scenarioJson.get("cleanedSteps").getAsJsonArray().contains(JsonNull.INSTANCE)) {
							break; // Référence de l'étape malformée (avec des caractères spéciaux) ou bien étapes non existantes
						}
						else {
							scenarioJson.addProperty("push", scenarioJson.get("push").getAsBoolean() && true);
						}
					}
				}
				if(scenarioJson.has("push")){
					scenarioJson.remove("steps");
					scenarioAndStep.add(scenarioJson);
					if(scenarioJson.has("cleanedSteps")){
						scenarioJson.get("cleanedSteps").getAsJsonArray().forEach(item -> {
							scenarioAndStep.add(item.getAsJsonObject());
						});
						scenarioJson.remove("cleanedSteps");
					}
					
					elasticServices.pushData(scenarioAndStep, commit);
				}
			} else {
				logger.warn("************** NON  VALIDE ***************  " + scenarioName);
			}
		}
	}
	
	
	
	
	
	
	private JsonObject handleStep(JsonObject scenario, JsonObject step, String scenarioId, String stepId, int position){
		//step.add("stepRefs", new JsonArray());
		//step.add("cleanedSteps",new JsonArray() );
		scenario.getAsJsonArray("stepRefs").add(stepId);
			logger.info("STEP:  " + stepId + "*********position : " + (position + 1));
			if (step.getAsJsonObject().has("subtype")) {
				handleScenarioAsStep(scenario,	step);
			} else if (step.has("mode") && step.get("mode").getAsString().equals("change")) {
				JsonObject inheritedStep = inheritedStepProcessing(step.get("ref").toString(),
						scenarioId.substring(0, scenarioId.length()-4)  ,
						step,scenario.get("cleanedSteps").getAsJsonArray(), position);
				inheritedStep.addProperty("position", position);
				scenario.get("cleanedSteps").getAsJsonArray().add(inheritedStep);
			} else {
				scenario.get("cleanedSteps").getAsJsonArray().add(
				stepProcessing(step, position,	scenarioId, false));
				
			}
		return scenario;
	}
	
	
	private JsonObject inheritedStepProcessing(String stepReference, String parentId, JsonObject inheritedStepContent, JsonArray cleanedSteps, int pos) {
		HttpEntity<String> entity; JsonObject result;
		JsonObject parentAndPosition = new JsonObject();
		try {
			JsonObject parentScenarioContent = this.elasticGetDataServices.getDocumentById(stepReference);
			if (parentScenarioContent == null) {
				cleanedSteps.add(this.stepProcessing(inheritedStepContent, -1, parentId, false));
				if(cleanedSteps.size() > 0){
					parentScenarioContent = cleanedSteps.get(cleanedSteps.size() -1).getAsJsonObject();
				}
				if (parentScenarioContent == null) return null;
				entity = new HttpEntity<String>(parentScenarioContent.toString(), requestHeadersParams.getHeaders());
				ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex + "/_doc/" + stepReference, HttpMethod.PUT, entity, String.class);
				JSONObject responseBody = new JSONObject(response.getBody());
				if (responseBody.get("result").toString().equals("created")) {
					logger.info("Successful creation of temporary step with reference " + stepReference);
					parentScenarioContent = this.elasticGetDataServices.getDocumentById(stepReference);
				}
			}
			stepReference = removeDoubleQuote(stepReference) + "&" + parentId;
			inheritedStepContent.add("parents", new JsonArray());
			if(parentSteps.has(stepReference)){
				inheritedStepContent.add("parents", parentSteps.get(stepReference).getAsJsonArray());
				synchronized (parentAndPosition){
					parentAndPosition.addProperty("id", parentId.split("\\.")[0] );
					parentAndPosition.addProperty("position", pos );
					parentAndPosition.get("parents").getAsJsonArray().add(parentAndPosition);
				}
			} else {
				synchronized (parentAndPosition){
					parentAndPosition.addProperty("id", parentId.split("\\.")[0] );
					parentAndPosition.addProperty("position", pos );
					inheritedStepContent.get("parents").getAsJsonArray().add(parentAndPosition);
				}
				parentSteps.add(stepReference, inheritedStepContent.get("parents").getAsJsonArray());
			}
			inheritedStepContent.addProperty("type", "step");
			inheritedStepContent.addProperty("GithubRef", stepReference);
			inheritedStepContent.add("metadata", this.parser.parse(updateTermsInheritedStep(parentScenarioContent, inheritedStepContent)));
			inheritedStepContent.add("resources", this.parser.parse(updateResourcesInheritedStep(parentScenarioContent, inheritedStepContent)));
			result = inheritedStepContent;
		}
		 catch (HttpClientErrorException exception){
			logger.error(exception.getClass().getCanonicalName() + " - " + exception.getMessage()+ " temporary step with reference "+ stepReference);
			result =  null;
		}
		return result;
	}
	
	private String updateResourcesInheritedStep(JsonObject parentScenarioContent, JsonObject inheritedStepContent){
		JsonObject  parentTerms, resultTemp = new JsonObject();
		JsonElement inheritedData, terms;
		inheritedData =  new JsonArray();
		JsonArray temp ;
		final String key = "target";
		String keyEntry="";
		inheritedData = mergeInheritedDResources(inheritedStepContent.get("linkGrp"));
		parentTerms = parentScenarioContent.getAsJsonObject("_source").getAsJsonObject("resources");
		for (Map.Entry<String, JsonElement> entries : inheritedData.getAsJsonObject().entrySet()) {
			keyEntry = entries.getKey();
			JsonArray temps = entries.getValue().getAsJsonArray();
			for (JsonElement item : temps) {
				if (item.getAsJsonObject().has("mode") && item.getAsJsonObject().get("mode").getAsString().equals("delete")) {
					for (Map.Entry<String, JsonElement> parentEntry : parentTerms.entrySet()){
						JsonArray parentsPerKey = parentTerms.getAsJsonArray(parentEntry.getKey());
						for (JsonElement parentElt: parentsPerKey){
							if(parentElt.getAsJsonObject().get(key).getAsString().equals(item.getAsJsonObject().get(key).getAsString())){
								parentElt.getAsJsonObject().addProperty("mode", "delete");
							}
						}
					}
				}
				if (item.getAsJsonObject().has("mode") && item.getAsJsonObject().get("mode").getAsString().equals("add")) {
					item.getAsJsonObject().remove("mode");
					if (resultTemp.getAsJsonObject().has(keyEntry)) {
						JsonArray tempContent = resultTemp.getAsJsonObject().getAsJsonArray(keyEntry);
						tempContent.add(item);
						resultTemp.getAsJsonObject().add(removeDoubleQuote(keyEntry), tempContent);
					} else {
						JsonArray jsonArray = new JsonArray();
						jsonArray.add(item);
						resultTemp.getAsJsonObject().add(removeDoubleQuote(keyEntry), jsonArray);
					}
				}
			}
		}
		for (Map.Entry<String, JsonElement> parentEntry : parentTerms.entrySet()){
			keyEntry = parentEntry.getKey();
			JsonArray parentsPerKey = parentTerms.getAsJsonArray(keyEntry);
			for (JsonElement parentElt: parentsPerKey){
				if(!parentElt.getAsJsonObject().has("mode")){
 					JsonArray tempContent = resultTemp.getAsJsonObject().getAsJsonArray(keyEntry);
					tempContent.add(parentElt);
					resultTemp.getAsJsonObject().add(keyEntry, tempContent);
				}
			}
		}
		return  gson.toJson(resultTemp);
	}
	
	
	
	
	private String updateTermsInheritedStep(JsonObject parentScenarioContent, JsonObject inheritedStepContent) {
		JsonObject  parentTerms;
		JsonElement inheritedData, terms, resultTemp;
		if (inheritedStepContent.has("desc") && inheritedStepContent.get("desc").getAsJsonObject().has("term")){
			terms = new JsonArray();
			String key="";
			inheritedData = inheritedStepContent.getAsJsonObject("desc").get("term");
			if(parentScenarioContent.getAsJsonObject("_source").has("metadata")){
				parentTerms = parentScenarioContent.getAsJsonObject("_source").get("metadata").getAsJsonObject();
				HashMap<String, JsonArray> mapMetaData = new HashMap<>();
				for (Map.Entry<String, JsonElement> entry : parentTerms.entrySet()){
					key = entry.getKey();
					resultTemp = new JsonArray();
					JsonArray elts = entry.getValue().getAsJsonArray();
					for (JsonElement jsonElt : elts) {
						if (jsonElt.getAsJsonObject().has("source")) {
							terms. getAsJsonArray().add(jsonElt);
						}
					}
					for (JsonElement jsonElt : terms.getAsJsonArray()) {
						if(inheritedData.isJsonPrimitive()){
							if(inheritedData.getAsJsonObject().has(key) &&  inheritedData.getAsJsonObject().has("mode") ){
								if(inheritedData.getAsJsonObject().get("mode").getAsString().equals("delete") && jsonElt.getAsJsonObject().get("key").equals(inheritedData.getAsJsonObject().get("key"))){
									jsonElt = null;
									continue;
								}
								if(inheritedData.getAsJsonObject().get("mode").getAsString().equals("add")){
									inheritedData.getAsJsonObject().remove("mode");
									resultTemp.getAsJsonArray().add(inheritedData.getAsJsonObject());
									resultTemp.getAsJsonArray().addAll(terms.getAsJsonArray());
									mapMetaData.put(key, resultTemp.getAsJsonArray());
								}
								
							}
							break;
						}
						else {
							//String finalKey = key;
							JsonArray temps = resultTemp.getAsJsonArray();
							for(int i=0; i<inheritedData.getAsJsonArray().size(); i++){
								JsonElement elt = inheritedData.getAsJsonArray().get(i);
								if(elt.getAsJsonObject().has("type") && elt.getAsJsonObject().get("type").getAsString().equals(key) && elt.getAsJsonObject().has("mode")){
									if(elt.getAsJsonObject().get("mode").getAsString().equals("delete") && jsonElt.getAsJsonObject().get("key").getAsString().equals(elt.getAsJsonObject().get("key").getAsString())){
										jsonElt = null;
									}
									if(elt.getAsJsonObject().get("mode").getAsString().equals("add")){
										elt.getAsJsonObject().remove("mode");
										temps.getAsJsonArray().add(elt.getAsJsonObject());
									}
								}
							}
							resultTemp = temps;
						}
						if(jsonElt != null && jsonElt.getAsJsonObject().get("type").getAsString().equals(key)){
							resultTemp.getAsJsonArray().add(jsonElt);
						}
					}
					mapMetaData.put(key, resultTemp.getAsJsonArray());
				}
				return  gson.toJson(mapMetaData);
			}
			else {
				return  gson.toJson(parentScenarioContent);
			}
		}
		else {
			return  gson.toJson(parentScenarioContent);
		}
	}
	
	
	private JsonObject mergeInheritedDResources(JsonElement resources){
		JsonObject inheritedData =  new JsonObject();
		JsonElement temp;
		JsonArray temps;
		String type = "";
			if (resources.isJsonObject()){
				if(resources.getAsJsonObject().has("ref") && resources.getAsJsonObject().has("type")){
					temp = resources.getAsJsonObject().get("ref");
					inheritedData.add(resources.getAsJsonObject().get("type").toString(), temp);
				}
				else return inheritedData;
			}
			else {
				for (JsonElement entry : resources.getAsJsonArray()){
					
					if(entry.getAsJsonObject().has("type") && entry.getAsJsonObject().has("ref")) {
						type = entry.getAsJsonObject().get("type").getAsString();
						temp = entry.getAsJsonObject().get("ref");
						if (inheritedData.has(type)) {
							temps = inheritedData.getAsJsonArray(type);
							if(temp.isJsonObject()){
								temps.add(temp);
							}
							else{
								temps.addAll(temp.getAsJsonArray());
							}
							inheritedData.add(type, temps);
						} else {
							temps = new JsonArray();
							if(temp.isJsonPrimitive()){
								temps.add(temp);
							}
							else{
								temps.addAll(temp.getAsJsonArray());
							}
							inheritedData.add(type, temp);
						}
					}
					
				}
			}
		 
		return inheritedData;
	}
	
	
	/**
     * <p>
     *     This function checks if a scenario is complete.
     *  A scenario is complete if and only if all his steps exist
     *  To do so, we use XPAth implemented in SAX  to  query all steps.
     *  Each step is identified by the <event> tag, so we retrieve all event in the content of scenario.
     *  And then we check the existence of the step on GitHub within the value xml:id (this represents the identifier of a step on Github)
     *  attribute for an event tag.
     *
     * </p>
     * @param scenarioContent the content(in TEI) of a scenario
     * @return true or false, according on whether the scenario is complete or not.
     * @throws  DocumentException
     */
     public boolean checkIfScenarioIsComplete(String scenarioContent, String scenarioId) throws  DocumentException {
     	String teiContent = "";
     	boolean result = true;
     	stepsScenarioWhenCommit.put(scenarioId, new ArrayList());
         org.dom4j.XPath xpathSelector = sskAPIService.createXPath("//tei:event");
	     org.dom4j.Document doc = sskAPIService.reader.read(new StringReader(scenarioContent));
	     List<org.dom4j.Node> nodes = xpathSelector.selectNodes(doc);
	     for (org.dom4j.Node node : nodes) {
	     	String stepId = node.valueOf("@ref");
	     	String folderToRequestIn = (node.valueOf("@type").toLowerCase().contains("step"))? "steps" : "scenarios";
		     teiContent = githubApiService.getGithubFileContent(folderToRequestIn, stepId + ".xml");
		     if (teiContent != null) {
		     	stepsScenarioWhenCommit.get(scenarioId).add(stepId);
			     commitsContent.put(stepId, teiContent);
			     result = result && true;
		     }
		     else {
		     	 stepsToIgnore.add(stepId + ".xml");
			     result = result && false;
		     }
	     }
         return result;
     }
    
    
    public JsonElement  stepProcessing(JsonObject step, int position, String parentId, boolean commit) {
     	if(commit){
     		initCommands();
        }
     	JsonArray  parents = new JsonArray();
     	step.addProperty("stepString", githubApiService.getGithubFileContent(stepsFolder, step.get("ref").getAsString() + ".xml"));
	    step.add("parents", new JsonArray());
        JsonObject parentAndPosition = new JsonObject();
	    step.addProperty("stepString", this.removeEltFromXML("encodingDesc", step.get("stepString").getAsString()));
        if (!validateSSKFile(step.get("ref").getAsString() + ".xml", step.get("stepString").getAsString())) {
	        return JsonNull.INSTANCE;
        } else {
	        step.add("stepDesc", sskTEIHandler.setScenarioDesc(step.get("stepString").getAsString(), scenarioDesc));
            step.addProperty("stepString",step.get("stepString").getAsString().replaceAll("<item>", "<item type=\"listElt\">").replaceAll("(?s)<!--.*?-->", "").replaceAll("<item>", "<item type=\"listElt\">").replaceAll("(?s)<!--.*?-->", "") );
	        teiToJson(step.get("ref").getAsString() + ".xml", step, step.get("stepString").getAsString(), true, stepsFolder);
	        step.get("json").getAsJsonObject().addProperty("position", position);
	        step.get("json").getAsJsonObject().addProperty("GithubRef", step.get("ref").getAsString());
	        step.get("json").getAsJsonObject().addProperty("type", "step");

	        if(parentId != null){
		        parentAndPosition.addProperty("id", parentId.split("\\.")[0] );
		        parentAndPosition.addProperty("position", position );
	        }
	        JsonObject existStep = elasticGetDataServices.getDocumentById(step.get("ref").getAsString());
	        if(existStep != null){
	        	existStep = existStep.getAsJsonObject("_source");
		        parents = existStep.getAsJsonArray("parents");
		        parents.add(parentAndPosition);
	        }
	        else {
	            parents.add(parentAndPosition);
	        }
	        step.get("json").getAsJsonObject().add("parents", parents);
	        step.get("json").getAsJsonObject().addProperty("lastUpdate", this.githubApiService.getLastCommitDate("steps",step.get("ref").getAsString() + ".xml" ));
	        //cleanedSteps.add(step.get("json").getAsJsonObject());
	        
        }
        return step.remove("json");
    }
	
	/**
	 * <p>
	 *     This function is to  update Zotero group url for a good query of resources
	 * </p>
	 * @param content
	 */
	private void updatePlatforms(String content)  {
		String[] zoteroRefs;
		if(content.contains("groups")){
			zoteroRefs = content.split("groups/");
			zoteroRefs = zoteroRefs[1].split("/");
			platforms.put(zoteroRefs[0], "groups/"+zoteroRefs[0]);
		}
		
		
       /* setXmlStringBuilder(new StringBuilder().append(content));
		try {
			setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("UTF-8"))));
			setxPath(XPathFactory.newInstance().newXPath());
			setNode((NodeList) xPath.compile("//prefixDef").evaluate(doc, XPathConstants.NODESET));
			for (int i = 0; i < node.getLength(); i++) {
				JsonObject platform = new JsonObject();
				for (int j = 0; j < node.item(i).getAttributes().getLength(); j++) {
					if (node.item(i).getAttributes().item(j).toString().contains("ident") || node.item(i).getAttributes().item(j).toString().contains("replacementPattern")) {
						String[] attributes = node.item(i).getAttributes().item(j).toString().split("=");
						if (removeDoubleQuote(attributes[0]).equals("ident"))
							platform.addProperty("id", removeDoubleQuote(attributes[1]));
						if (removeDoubleQuote(attributes[0]).equals("replacementPattern"))
							platform.addProperty("url-add", removeDoubleQuote(attributes[1]));
					}
				}
				if (platforms.get(platform.get("id").getAsString()) == null) {
					platforms.put(platform.get("id").getAsString(), platform.get("url-add").getAsString());
				}
			}
		} catch (SAXException | IOException | ParserConfigurationException | XPathExpressionException | IllegalArgumentException exception) {
			logger.error(exception.getClass().getCanonicalName() + " - " + exception.getMessage()+ " Failed  when updating zotero's Group URLs");
		}*/
		
	}
	
	
    
    //Here I have to send mail to Scenario Author if content is not valide against relaxNg
    private boolean validateSSKFile(String fileName, String sskContent) {
        boolean result = false;
        if (commands.get("validSSKFile") != null && commands.get(teiSSKRelaxNgPath.toString()) != null)  {
            convertStringToFile(sskContent, fileName);
	        commands.put(fileName, getFile(fileName));
            if ( commands.get(fileName).exists()) {
                result = Boolean.parseBoolean(executeCommand(false, "java -jar " + commands.get("validSSKFile").getPath(), "", commands.get(teiSSKRelaxNgPath).getPath(), commands.get(fileName).getPath()));
            }
           // if (deleteFile) deleteFiles(commands.get(fileName), commands.get(teiSSKRelaxNgPath));
        }
        
        return result;
    }
    
    
    /**
     * <p>
     *     This function converts a TEI content into JSON format
     * </p>
     * @param sskContent Map of all scenarios  TEI/XML content to convert
     * @param deleteFile Boolean variable to delete temp file or not after converting
     * @param type The type (step, scenario, glossary) of content to convert
     * @return A JSON content
     * @throws IOException
     * @throws SAXException
     * @throws XPathExpressionException
     * @throws ParserConfigurationException
     */
    public void  teiToJson(String fileName, JsonObject jsonObject, String sskContent,  boolean deleteFile, String type)  {
	   sskContent.replace(fileName, sskContent.replaceAll("<!--[\\s\\S]*?-->", "").replaceAll("(?s)<!--.*?-->", "").replaceAll("(?m)^[ \t]*\r?\n", ""));
        if (commands.get("teiTojsonCmd") != null) {
	        if(type != null){
		        String metaData = getMetadata(sskContent, type, fileName);
		        if (jsonObject != null && metaData != null) {
			        jsonObject.add("metadata", this.parser.parse(metaData));
			        if (type.equals("steps")) {
				        updateStandard(jsonObject, sskContent, fileName);
			        }
		        }
	        }
            if (commands.get(fileName) != null) {
	            if(!fileName.equals("SSKvocs.xml")) sskContent = removeEltFromXML("desc", sskContent);
		        
	            convertStringToFile(sskContent, fileName);
	            sskContent = executeCommand(true, "java -jar " + commands.get("teiTojsonCmd").getPath(), "", commands.get(fileName).getPath(), commands.get(teiToJsonFileName).getPath());
	            sskContent.replaceAll(",\"\":null", "")
			            .replaceAll("\"\":null,", "")
			            .replaceAll("change:\"null\"", "");
	            jsonObject.add("json" ,this.parser.parse(sskContent).getAsJsonObject());
	            if(jsonObject.has("metadata"))
	            	jsonObject.get("json").getAsJsonObject().add("metadata", jsonObject.get("metadata"));
	            if(jsonObject.has("resources"))
		            jsonObject.get("json").getAsJsonObject().add("resources", jsonObject.get("resources"));
	            if(jsonObject.has("scenarioDesc"))
		            jsonObject.get("json").getAsJsonObject().add("scenarioDesc", jsonObject.get("scenarioDesc"));
	            if(jsonObject.has("stepDesc"))
		            jsonObject.get("json").getAsJsonObject().add("stepDesc", jsonObject.get("stepDesc"));
	            
            }
	        if (deleteFile) deleteFiles(commands.get(fileName));
        }
    }
    
    /*
     * Update Step's Standards with those in some resources
     */
    private void updateStandard(JsonObject result, String sskContent, String reference)  {
        setXmlStringBuilder(new StringBuilder().append(sskContent));
        synchronized (xmlStringBuilder){
	        try{
		        setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("UTF-8"))));
		        setxPath(XPathFactory.newInstance().newXPath());
		        setNode((NodeList) xPath.compile(resourceStandardPath).evaluate(doc, XPathConstants.NODESET));
		        JsonObject metaData = result.getAsJsonObject().remove("metadata").getAsJsonObject();
		        for (int k = 0; k < node.getLength(); k++) {
			        for (int l = 0; l < node.item(k).getAttributes().getLength(); l++) {
				        if (node.item(k).getAttributes().item(l).toString().contains("key")) {
					        String[] attributes = node.item(k).getAttributes().item(l).toString().split("=");
					        JsonObject standard = new JsonObject();
					        standard.addProperty(removeDoubleQuote(attributes[0]), removeDoubleQuote(attributes[1]));
					        if (metaData.has("standard")) {
						        JsonArray standards = metaData.getAsJsonArray("standard");
						        int i = standards.size() - 1;
						        boolean isIn = false;
						        while(!isIn && i>=0){
							        if(removeDoubleQuote(standards.get(i).getAsJsonObject().get("key").getAsString()).equals(removeDoubleQuote(standard.get("key").getAsString()))){
								        isIn = true;
								        break;
							        }
							        i--;
						        }
						        if(isIn){
							        break;
						        }
						        else {
							        metaData.getAsJsonArray("standard").add(standard);
						        }
					        } else {
						        JsonArray jsonArray = new JsonArray();
						        jsonArray.add(standard);
						        metaData.add("standard", jsonArray);
					        }
					        break;
				        }
			        }
		        }
		        result.add("metadata", metaData);
		        getStepResources(result, sskContent, reference);
	        }
	        catch (IOException | ParserConfigurationException | SAXException |  XPathExpressionException excep) {
		        logger.error(excep.getClass().getCanonicalName() + " - " + excep.getMessage()+ "Error when updating  standard for the step " + reference );
	        }
	        /*finally {
		        return result;
	        }*/
        }
        
    }
    
    private void convertStringToFile(String xmlStr, String path) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlStr)));
            DOMSource source = new DOMSource(doc);
            FileWriter writer = new FileWriter(new File(classLoader.getResource("./").getPath() + path));
            logger.info("--Create file '" + path + "' -- : OK");
            commands.put(path,  getFile(path));
            StreamResult result = new StreamResult(writer);
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.transform(source, result);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
    }
    
    private String getMetadata(String sskContent, String type, String reference) {
        setXmlStringBuilder(new StringBuilder().append(sskContent));
        synchronized (xmlStringBuilder){
	        try{
		        setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("UTF-8"))));
		        setxPath(XPathFactory.newInstance().newXPath());
		        setNode((NodeList) xPath.compile(type.equals(stepsFolder) ? stepMetaData : scenarioMetaData).evaluate(doc, XPathConstants.NODESET));
		        HashMap<String, List<JsonObject>> mapMetaData = new HashMap<>();
				if(node != null){
					for (int k = 0; k < node.getLength(); k++) {
						JsonObject metaData = new JsonObject();
						String metaDataType = this.normalizeMetaDataType(removeDoubleQuote(node.item(k).getAttributes().getNamedItem("type").toString().split("=")[1]));
						for (int j = 0; j < node.item(k).getAttributes().getLength(); j++) {
							String[] attributes = node.item(k).getAttributes().item(j).toString().split("=", 2);
							//logger.info(attributes.);
							if(attributes[0].contains("key") && ResourceUtils.isUrl(removeDoubleQuote(attributes[1]))){
								metaData.addProperty("link", new String (removeDoubleQuote(attributes[1])));
								metaData.addProperty(attributes[0], this.getActivityFromTadiRahLink(removeDoubleQuote(attributes[1]))); } else {
								metaData.addProperty(attributes[0], removeDoubleQuote(attributes[1]));
							}
							if (removeDoubleQuote(attributes[1]).equals("discipline") && node.item(k).getTextContent() != "")
								metaData.addProperty("key", node.item(k).getTextContent());
						}
						if (metaDataTab.toString().contains(metaDataType)) {
							if (mapMetaData.containsKey(metaDataType)) {
								mapMetaData.get(metaDataType).add(metaData);
							} else {
								List<JsonObject> jsonArray = new ArrayList<>();
								jsonArray.add(metaData);
								mapMetaData.put(metaDataType, jsonArray);
							}
						}
					}
					return gson.toJson(mapMetaData);
				}
				else {
					return null;
				}
	        } catch ( IOException | ParserConfigurationException | SAXException |  XPathExpressionException |  IllegalArgumentException excep) {
		        logger.error(excep.getClass().getCanonicalName() + " - " + excep.getMessage() + "Error when querying getting metadata for the step " + reference);
		        return null;
	        }
        }
        
    }
    
    private String getActivityFromTadiRahLink(String link){
        if( ResourceUtils.isUrl(link)){
        	if(link.contains("_search_expresion")){
		        link = link.split("=")[link.split("=").length -1];
	        }
	        if(link.contains("tema")){
		        link = link.split("/")[link.split("/").length -1];
	        }
        	
	    }
	    return link;
    }
    
    private String normalizeMetaDataType(String type){
	    if(type.substring(type.length() - 3) == "ies"){
		    type = "activity";
	    } else if(type.charAt(type.length() - 1) == 's'){
    		type = type.substring(0, type.length()-1);
	    }
	    return type;
    }
    
    
    public JsonObject scraptWebPage(String source, String target, String type) {
        JsonObject result = new JsonObject();
        result.addProperty("type", type);
        try {
            switch (source) {
                case "github":
                    result = scrapGithub(target);
                    result.addProperty("url", target);
                    break;
                case "hal":
                    break;
                case "BeQuali":
                    break;
                default:
                    break;
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }
    
    
    
    private synchronized void getStepResources(JsonObject result, String content, String reference){
        org.dom4j.XPath xpathSelector = sskAPIService.createXPath("//tei:linkGrp");
	    try {
		    org.dom4j.Document document = sskAPIService.reader.read(new StringReader(content));
		    List<org.dom4j.Node> nodes = xpathSelector.selectNodes(document);
		    String resourceType ;
		    HashMap<String, JsonArray> resourcesMap = new HashMap<>();
		    for (org.dom4j.Node node : nodes) {
			    updatePlatforms(node.valueOf("@xml:base"));
			    resourceType = node.valueOf("@type");
			    if(resourceType == null) resourceType = "generalResources";
			    
			    for (Object resource : node.selectNodes("*")) {
				    JsonObject jsonRes = new JsonObject();
				    org.dom4j.Element res = (org.dom4j.Element) resource;
				    jsonRes.addProperty("subtype",res.valueOf("@subtype") );
				    jsonRes.addProperty("shortType",res.valueOf("@type") );
				    jsonRes.addProperty("type",res.valueOf("@type") );
				    jsonRes.addProperty("source",res.valueOf("@source"));
				    jsonRes.addProperty("target",res.valueOf("@target"));
				    if (resourcesMap.containsKey(resourceType)) {
					    resourcesMap.get(resourceType).add(jsonRes);
				    } else {
					    JsonArray resourcesTab = new JsonArray();
					    resourcesTab.add(jsonRes);
					    resourcesMap.put(resourceType, resourcesTab);
				    }
			    }
		    }
		    result.add("resources", this.parser.parse(resourcesMap.toString()));
	    } catch (DocumentException e) {
		    e.printStackTrace();
	    }
	    
    }
	
	
	public JsonObject getStandard(String  key) {
    	JsonObject result;
		try{
			JsonElement standardArray = this.elasticGetDataServices.getStandardByabbrName(key);
			if (standardArray!= null && standardArray.getAsJsonArray().size() > 0) {
				JsonObject standardElt = standardArray.getAsJsonArray().get(0).getAsJsonObject().getAsJsonObject("_source");
				JsonObject elt = new JsonObject();
				JsonArray descArray = new JsonArray();
				standardElt.getAsJsonObject().entrySet().forEach(entry -> {
					String content = this.removeDoubleQuote(standardElt.get(entry.getKey()).toString());
					switch (entry.getKey()) {
						case "standard_abbr_name":
						case "standard_complete_name":
						case "standard_link":
						case "standard_type":
							elt.addProperty(this.removeDoubleQuote(entry.getKey().split("_")[1].toString()), content);
							break;
						case "standard_tags":
						case "standard_resources":
							JsonArray eltArray = new JsonArray();
							String[] tags = content.replace("[", "").replace("]", "").split(",");
							for (int j = 0; j < tags.length; j++) {
								eltArray.add(tags[j]);
							}
							elt.add(this.removeDoubleQuote(entry.getKey().split("_")[1].toString()), eltArray);
						default:
							if (entry.getKey().contains("desc")) {
								JsonObject desc = new JsonObject();
								desc.addProperty(this.removeDoubleQuote(entry.getKey().split("_")[2].toString()), this.removeDoubleQuote(content.toString()));
								descArray.add(desc);
							}
							break;
					}
				});
				elt.add("desc", descArray.getAsJsonArray());
				result = elt;
			}
			else{
				result = null;
			}
		}
		catch ( HttpClientErrorException excep) {
			logger.error(excep.getClass().getCanonicalName() + " - " + excep.getMessage()+ "Error when enconding Standard's short name referenced by" + key + "!!!");
			result = null;
		}
		return result;
	}
	
	/**
	 * <p>
	 *     This function retrieves from Elasticsearch all complete standards
	 * </p>
	 * @param standards
	 * @return
	 */
	public JsonArray getAllStandard(JsonArray standards){
        JsonArray result = new JsonArray();
        standards.forEach(standard -> {
            String clef = removeDoubleQuote(standard.getAsJsonObject().get("key").toString());
            if (standardsTab.containsKey(clef)) {
                result.add(standardsTab.get(clef));
            } else {
            	JsonObject standardRes = this.getStandard(clef);
            	if(standardRes != null){
		            standardsTab.put(clef, standardRes);
		            result.add(standardRes);
	            }
	            else {
		            standardsTab.put(clef, standard.getAsJsonObject());
		            if (!result.contains(standard.getAsJsonObject())) {
			            result.add(standard.getAsJsonObject());
		            }
	            }
            }
        });
        return result;
    }
    
    public JsonObject getZoteroResource(String id, String type)  {
        JsonObject result = new JsonObject();
        result.addProperty("type", type);
        String urlAddOn;
        if (id.contains("zotero.org")) {
            urlAddOn = id.split("zotero.org/")[1];
            String [] terms = urlAddOn.split("/");
            id = terms[terms.length -1];
        } else {
            if (id.contains(":")) {
                urlAddOn = platforms.get(id.split(":")[0]) + "/items/" + id.split(":")[1];
            } else {
                urlAddOn = platforms.get("wp4") + "/items/" + id;
            }
        }
        
        result.addProperty("id", id);
        try{
	        ResponseEntity<String> response = this.restTemplate.getForEntity(zoteroApihUrl + urlAddOn, String.class);
	        JsonObject data = this.parser.parse(response.getBody()).getAsJsonObject().get("data").getAsJsonObject();
	        if (data.has("title") && removeDoubleQuote(data.get("title").toString()) != "")
		        result.addProperty("title", removeDoubleQuote(data.get("title").toString()));
	        if (data.has("url") && removeDoubleQuote(data.get("url").toString()) != "")
		        result.addProperty("url", removeDoubleQuote(data.get("url").toString()));
	        if (data.has("date") && !removeDoubleQuote(data.get("date").toString()).isEmpty()){
		        result.addProperty("period", data.get("date").toString());
	        }
	        if (data.has("abstractNote") && removeDoubleQuote(data.get("abstractNote").toString()) != "")
		        result.addProperty("abstract", removeDoubleQuote(data.get("abstractNote").toString()));
	        if (data.has("creators")) {
		        JsonArray dataCreators = data.getAsJsonArray("creators");
		        if (dataCreators.size() > 0) {
			        List<String> creators = new ArrayList<>();
			        for (int i = 0; i < dataCreators.size(); i++) {
				        if (dataCreators.get(i).getAsJsonObject().has("name")) {
					        creators.add(dataCreators.get(i).getAsJsonObject().get("name").getAsString());
				        } else {
					        creators.add(dataCreators.get(i).getAsJsonObject().get("firstName").getAsString() + " " + dataCreators.get(i).getAsJsonObject().get("lastName").getAsString());
				        }
			        }
			        result.addProperty("creators", creators.toString());
		        }
	        }
        }
        catch( HttpClientErrorException exc ){
	        logger.error(exc.getClass().getCanonicalName() + " - " + exc.getMessage()+ " Error when retrieving resource from zotero with id "+ id);
	    }
        
        return result;
    }
    
    
    /*public JsonObject getHalResource(String target)  {
	    org.jsoup.nodes.Document document ;
	    JsonObject result = new JsonObject();
	    try {
		    document = Jsoup.connect(target).get();
		    result.addProperty("title", document.select("title").text());
		    result.addProperty("abstract", document.getElementsByAttributeValue("name", "description").attr("content"));
		    JsonArray elts = new JsonArray();
		    Arrays.asList(document.getElementsByAttributeValue("name", "keywords").attr("content").split(";")).forEach(elts::add);
		    result.add("keywords", elts);
		    elts = new JsonArray();
		    for (org.jsoup.nodes.Element elt : document.select("meta[name=citation_author]")) {
			    elts.add(elt.getElementsByAttributeValue("name", "citation_author").attr("content"));
		    }
		    result.add("creators", elts);
		    result.addProperty("period", document.getElementsByAttributeValue("name", "citation_publication_date").attr("content"));
		    result.addProperty("id", document.getElementsByAttributeValue("name", "DC.identifier").eq(1).attr("content"));
		    
	    } catch (IOException e) {
		    logger.error(e.getClass().getCanonicalName() + " - " + e.getMessage()+ " Error when retrieving resource from Hal with target "+ target);
		    result = null;
	    }
	    finally {
		    return result;
	    }
	}*/
    
    private JsonObject scrapGithub(String target) throws IOException, XPathExpressionException, ParserConfigurationException {
        org.jsoup.nodes.Document document = Jsoup.connect(target).get();
        JsonObject result = new JsonObject();
        Elements newsHeadlines = document.getElementsByTag("article");
        newsHeadlines.select("img").remove();
        setXmlStringBuilder(new StringBuilder().append(newsHeadlines));
        try {
            setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream((xmlStringBuilder.toString().replaceAll("<br>", "").replaceAll("<hr>", "")).getBytes("UTF-8"))));
            setxPath(XPathFactory.newInstance().newXPath());
            setNode((NodeList) xPath.compile("/article/p").evaluate(doc, XPathConstants.NODESET));
           
            if (node.getLength() > 0) {
                result.addProperty("abstract", node.item(0).getTextContent());
            }
            newsHeadlines = document.select("h1.public");
            setXmlStringBuilder(new StringBuilder().append(newsHeadlines));
            setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("UTF-8"))));
            setNode((NodeList) xPath.compile("//span[@class='author' and @itemprop='author']").evaluate(doc, XPathConstants.NODESET));
            List<String> creators = new ArrayList<>();
            if (node.getLength() > 0) {
                creators.add(node.item(0).getTextContent());
                result.addProperty("creators", creators.toString());
            }
            setNode((NodeList) xPath.compile("//strong[ @itemprop='name']").evaluate(doc, XPathConstants.NODESET));
            if (node.getLength() > 0) {
                result.addProperty("title", node.item(0).getTextContent());
            }
            org.jsoup.nodes.Element date = document.getElementsByClass("age").last().getElementsByTag("span").first();
    
            if (date.children().hasText() && date.data() != "") {
                result.addProperty("period", date.data());
            }
            result.addProperty("abstract", document.getElementsByAttributeValue("name", "description").attr("content").split("\\.")[0]);
        }
        catch (Exception e){
            logger.error(e.getMessage());
            String title [] = document.select("title").text().split("-");
            if(title.length > 1){
                result.addProperty("title", title[1].replace("/",":"));
            }
            else{
                result.addProperty("title", title[0]);
            }
            result.addProperty("abstract", document.getElementsByAttributeValue("name", "description").attr("content").split("\\.")[0]);
        }
        return result;
    }
    
    
    public File getFile(String path) {
        File result = null;
        try {
            result = new File(classLoader.getResource(path).getFile());
        } catch (Exception e) {
            //e.printStackTrace();
            result = new File(classLoader.getResource("./").getPath() + path);
        }
        return result;
    }
    
    private String executeCommand(boolean content, String... input) {
        String result = "false",  command = input[0] + " " + input[1] + " " + input[2] + " " + input[3];
        
        try {
            Process pr = rt.exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(pr.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line = "";
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
            }
            
            if (!content){
                result = (output.toString().contains("SUCCESSFUL") || (output.toString().isEmpty())) ? "true" : "false";
            }
            else {
                result = output.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
	        logger.error(e.getClass().getCanonicalName() + " - " + e.getMessage()+ " Erreur when executing command "+ command);
        }
        return result;
    }
    
    private void deleteFiles(File... files) {
        for (File file : files
                ) {
            file.delete();
        }
    }
    
    public ResponseEntity<String> serverError() {
        return ResponseEntity
                       .status(HttpStatus.INTERNAL_SERVER_ERROR)
                       .body(null);
    }
    
    
    public ResponseEntity<String> notFound() {
        JsonObject result = new JsonObject();
        result.addProperty("result", "NOT FOUND");
        return ResponseEntity
                       .status(HttpStatus.NOT_FOUND)
                       .body(result.toString());
    }
    
    public  String removeDoubleQuote(String content) {
        return content.replaceAll("\"", "");
    }
    
    
    
    
    /**
     * <p>This function remove an element  from a XML content.
     * </p>
     * @param eltToRemove  XML tag to remove from the whole content
     * @param xmlContent  a part will be deleted
     * @return XML content without a '@eltToRemove' element
     * @throws
     */
    public String removeEltFromXML(String eltToRemove, String xmlContent) {
        if (xmlContent.contains(eltToRemove)) {
        	org.dom4j.XPath tagToRemove= sskAPIService.createXPath("//tei:desc");
	        try {
	        	org.dom4j.Document document = DocumentHelper.parseText(xmlContent).getDocument();
		        List<org.dom4j.Node> nodes = tagToRemove.selectNodes(document);
		        for (org.dom4j.Node node: nodes){
		        	if(!node.valueOf("@type").equals("terms")){
				        node.detach();
			        }
		        }
		        xmlContent = document.asXML();
	        } catch (DocumentException e) {
		        e.printStackTrace();
		        
	        }
	        //xmlContent = xmlContent.substring(0, xmlContent.indexOf("<" + eltToRemove + ">")) + xmlContent.substring(xmlContent.indexOf("</" + eltToRemove + ">") + eltToRemove.length() + 3, xmlContent.length());
        }
	    return xmlContent;
    }
    
    
    private void handleScenarioAsStep(JsonObject scenario, JsonObject step) {
        switch (this.removeDoubleQuote(step.get("subtype").toString())) {
            case "preliminary":
                JsonObject item = new JsonObject();
	            synchronized (item) {
		            item.addProperty("type", (this.removeDoubleQuote(step.get("type").toString()).toLowerCase().contains("scenario")) ? "scenario" : "step");
		            item.addProperty("ref", this.removeDoubleQuote(step.get("ref").toString()));
		            if (scenario.getAsJsonObject().has("preliminary")) {
			            scenario.get("preliminary").getAsJsonArray().add(item);
		            } else {
			            JsonArray items = new JsonArray();
			            items.add(item);
			            scenario.add("preliminary", items);
		            }
	            }
             
            break;
            /*case "include":
                if (step.has("param")) {
		                this.includeStepFromOneScenarioToAnother(steps, new String(this.removeDoubleQuote(step.get("ref").toString())),
				                new String(step.getAsJsonObject("param").get("value").getAsString()), stepPosition);
                }
            break;*/
            case "followUp"://followUp
                JsonObject elt = new JsonObject();
	            synchronized (elt) {
		            elt.addProperty("type", (this.removeDoubleQuote(step.get("type").toString()).toLowerCase().contains("scenario")) ? "scenario" : "step");
		            elt.addProperty("ref", this.removeDoubleQuote(step.get("ref").toString()));
		            if (scenario.getAsJsonObject().has("followUp")) {
			            scenario.getAsJsonArray().add(elt);
		            } else {
			            JsonArray items = new JsonArray();
			            items.add(elt);
			            scenario.getAsJsonObject().add("followUp", items);
		            }
	            }
             
            break;
            default:
            break;
            
        }
        
    }
    
    
    /**
     * <p>
     *     This function retrieves step from a scenario and adds it to another
     * </p>
     * @param targetSteps
     * @param sourceScenarioRef
     * @param stepReference
     * @param position
     * @throws SAXException
     * @throws ParserConfigurationException
     * @throws XPathExpressionException
     * @throws IOException
     */
    /*private void includeStepFromOneScenarioToAnother(JsonArray targetSteps, String sourceScenarioRef, String stepReference, int position)  {
        
        if (stepReference.contains(",")) {  // stepReference = "1,3-4,6"
            String[] stepReferences = stepReference.split(","); //stepReferences = ["1", "3-4", "6"]
            for (String stepRef : stepReferences) {
                this.includeStepFromOneScenarioToAnother(targetSteps, sourceScenarioRef, stepRef, position );
            }
        } else if (stepReference.contains("-")) { // stepReference = "3-4"
            String[] stepReferences = stepReference.split("-");  //stepReferences = ["3", "4"]
            for (String stepRef : stepReferences) {
                this.includeStepFromOneScenarioToAnother(targetSteps, sourceScenarioRef, stepRef, position );
            }
        } else { // stepReference = "4"
	        try {
		        targetSteps.add(this.getStepReferenceFromScenarioByPosition(sourceScenarioRef, stepReference, position));
	        } catch (IOException | SAXException | XPathExpressionException | ParserConfigurationException e) {
		        logger.error(e.getClass().getCanonicalName() + " - " + e.getMessage());
	        }
	        position++;
        }
    }*/
    
    
    /**
     * <p>
     *     This function gets a step's reference from a source scenario and add it to a target one,
     *     in order to manage the concept of parameters in scenario's steps list
     * </p>
     * @param scenarioRef, the scenario's reference
     * @param positionInSourceScenario the step's position in the source scenario
     * @param positionInTargetScenario  the step's position in the target scenario
     * @return A JSON Object
     * @throws IOException
     * @throws SAXException
     * @throws XPathExpressionException
     * @throws ParserConfigurationException
     */
   /* private JsonObject getStepReferenceFromScenarioByPosition(String scenarioRef, String positionInSourceScenario, int positionInTargetScenario) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        String scenarioContent = githubApiService.getGithubFileContent(scenariosFolder, scenarioRef+".xml");
        synchronized (scenarioContent){
	        String listEvent = scenarioContent.substring(scenarioContent.indexOf("<listEvent>"), scenarioContent.indexOf("</listEvent>") + new String("</listEvent>").length());
	        setXmlStringBuilder(new StringBuilder().append(listEvent));
	        setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("UTF-8"))));
	        setxPath(XPathFactory.newInstance().newXPath());
	        setNode((NodeList) xPath.compile("//event").evaluate(doc, XPathConstants.NODESET));
	        String stepReference = "";
	        String stepId = "";
	        boolean exitFirstLoop = false;
	        for (int k = 0; k < node.getLength(); k++) {
		        logger.info(String.valueOf(node.item(k).getAttributes().getLength()));
		        for (int j = 0; j < node.item(k).getAttributes().getLength(); j++) {
			        String [] attribute = node.item(k).getAttributes().item(j).toString().split("=");
			        switch (attribute[0]){
				        case "ref":
					        stepReference = this.removeDoubleQuote(attribute[1]);
					        break;
				        case "xml:id":
					        stepId = this.removeDoubleQuote(attribute[1]);
					        break;
				        default:
					        break;
			        }
			        if ((stepId.contains("s"+ positionInSourceScenario) || stepId.contains("step"+ positionInSourceScenario)) && stepReference!="" ) {
				        exitFirstLoop = true;
				        break;
			        } else {
				        continue;
			        }
		        }
		        if (exitFirstLoop) break;;
		
	        }
	        return this.stepProcessing(stepReference, positionInTargetScenario, scenarioRef);
        }
        
    }*/
    
    /**
     * <p>
     *     loadGlossaryTerms()
     *     <ul>
     *         <li>
     *              retrieves vocabulary terms (Discplines, Techniques, Activities and Objects) from Github via API
     *         </li>
     *         <li>
     *              loads those vocabulary terms into Elasticsearch
     *         </li>
     *     </ul>
     * </p>
     * @author Lionel TADJOU
     */
    public void loadGlossaryTerms(){
	    sskIndex= "ssk";
        try{
            String termsContentTEI = githubApiService.getGithubFileContent(specDirectory, glossaryFileName);
            convertStringToFile(termsContentTEI, glossaryFileName);
	        JsonObject termsContentJSON = new JsonObject();
            teiToJson(glossaryFileName, termsContentJSON, termsContentTEI, true, null);
            termsContentJSON.get("json").getAsJsonObject().addProperty("type", "glossary");
	        JsonObject toSend = new JsonObject();
	        toSend.add("doc", termsContentJSON.get("json"));
	        toSend.addProperty("doc_as_upsert", true);
	        toSend.addProperty("detect_noop",  false);
	        HttpEntity entity =requestHeadersParams.addContentToHeader(toSend);
            //HttpEntity entity = requestHeadersParams.addContentToHeader(termsContentJSON.get("json"));
            ResponseEntity<String> response = this.restTemplate.exchange( elasticSearchPort + "/" + sskIndex + "/_doc/"+this.elasticServices.toHex(glossaryFileName)+"/_update" , HttpMethod.POST, entity, String.class);
            JSONObject responseBody = new JSONObject(response.getBody());
            if (responseBody.get("result").toString().equals("created")) {
                logger.info("Successful loading  of glossary");
            }
            else if(responseBody.get("result").toString().equals("updated")){
                logger.info("Successful updating of glossary");
            }
        }
        catch ( HttpClientErrorException   exception) {
            logger.error(exception.getClass().getCanonicalName() + " - " + exception.getMessage()+ " Failed  to load  glossary terms");
        }
    }
    

    /**
     * <p>
     *     loadStandards() retrieves standards from Github via API  loads them  into Elasticsearch for indexation
     * </p>
     * @author Lionel TADJOU
     */
    public void loadStandards(){
        String standards = githubApiService.getGithubFileContent(standardsFolder, standardsFileName);
        JsonArray jsonStandards = this.parser.parse(standards).getAsJsonArray();
        final String[] standardAbbrName = new String[1];
        final String[] standardId = new String[1];
            final HttpEntity<String>[] entity = new HttpEntity[1];
            jsonStandards.forEach(standardItem -> {
                standardAbbrName[0] = standardItem.getAsJsonObject().get("standard_abbr_name").toString().replaceAll("\"", "").replaceAll("\\\\n(\\s)+", " ");
                logger.info(standardAbbrName[0]);
                standardItem.getAsJsonObject().addProperty("standard_abbr_name", standardAbbrName[0]);
                standardId[0] = this.elasticServices.toHex(standardAbbrName[0]);
                standardItem.getAsJsonObject().addProperty("type", "standard");
                entity[0] = requestHeadersParams.addContentToHeader(standardItem);
            try {
                ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort+ "/" + sskIndex + "/_doc/"+ standardId[0], HttpMethod.PUT, entity[0], String.class);
                JSONObject responseBody = new JSONObject(response.getBody());
                if (responseBody.get("result").toString().equals("created") || responseBody.get("result").toString().equals("updated")) {
                    logger.info("Successful pushed/update of " + standardItem.getAsJsonObject().get("standard_abbr_name").toString() + " Standard");
                }
                else {
                    logger.error("Standard" + standardItem.getAsJsonObject().get("standard_abbr_name").toString() + " has not been pushed to Elasticsearch");
                }
            
            } catch (HttpClientErrorException exception) {
                logger.error(exception.getClass().getCanonicalName() + " - " + exception.getMessage()+ " Failed  to load  standard"+ standardItem.getAsJsonObject().get("standard_abbr_name").toString()+ " Error from Elasticsearch");
            }
        });
    }
    
    
    public JsonArray getTermsByType(JsonArray terms, String type){
        JsonArray result = new JsonArray();
        
        for(JsonElement termsBlock: terms){
            JsonObject block = termsBlock.getAsJsonObject();
            String termId = block.get("id").getAsString();
            if(termId.toLowerCase().contains(type.toLowerCase())) {
                if(type.equals("activities")){
                    result = block.getAsJsonArray("div");
                }else{
                    result = block.getAsJsonObject("list").getAsJsonArray("item");
                }
                
                break;
            }
        }
        return result;
    }
    
    public JsonElement normalizeContent(JsonElement param){
        JsonElement result = param;
       
        if(param.isJsonArray()){
            int index = 0;
            for (JsonElement eltParam : param.getAsJsonArray()) {
                result = changeContentStructure(eltParam, result, (index++));
            }
        }
        else {
            result = changeContentStructure(param, result, null);
        }
        return result;
    }
    
    private JsonElement  changeContentStructure(JsonElement eltParam, JsonElement result, Integer index){
        String contentString = "";
        if(eltParam.getAsJsonObject().get("url") == null && eltParam.getAsJsonObject().has("content") &&  eltParam.getAsJsonObject().get("content").isJsonArray()){
            JsonArray  content = eltParam.getAsJsonObject().getAsJsonArray("content");
            for (JsonElement elt : content) {
                if (elt.getAsJsonObject().has("part")) {
                    contentString += elt.getAsJsonObject().get("part").getAsString()+",";
                }
                else {
                    contentString += elt.getAsJsonObject().toString() + ",";
                }
            }
            
            if(index == null) {
                result.getAsJsonObject().add("content", this.elasticServices.getGson().toJsonTree(contentString.substring(0, contentString.length()-1)));
            }
            else {
                result.getAsJsonArray().get((index++)).getAsJsonObject().add("content", this.elasticServices.getGson().toJsonTree(contentString.substring(0, contentString.length()-1)));
            }
        }
        return result;
    }
    
    private  JsonObject removeKeyAndContentFronJson(JsonObject content, String[] keys){
	    for (String key : keys) {
		    logger.info(key);
		    for (Map.Entry<String,JsonElement> entry : content.entrySet()) {
		    	if(entry.getValue().isJsonArray()){
				    entry.getValue().getAsJsonArray().forEach(part -> {
					    removeKeyAndContentFronJson(part.getAsJsonObject().get(entry.getKey()).getAsJsonObject(),keys);
				    });
			    }
			    else{
				    if(entry.getKey().equals(key)){
					    content.remove(key);
				    }
				    else if (content.get(entry.getKey()).isJsonObject()){
					    removeKeyAndContentFronJson(content.get(entry.getKey()).getAsJsonObject(),keys);
				    }
				    else{
				    	continue;
				    }
			    }
			    
		    }
	    }
	    return content;
    }
    
	
	private HashSet<String> getInvalideScenarios() {
		return invalidScenarios;
	}
	
	public void setInvalideScenarios(HashSet<String> invalidScenarios) {
		this.invalidScenarios = invalidScenarios;
	}
	
	public  boolean isHandleData() {
		return handleData;
	}
	
	public void setHandleData(boolean handleData) {
		this.handleData = handleData;
	}
	
	
	
	private static void setXmlStringBuilder(StringBuilder xmlStringBuilder) {
		SSKServices.xmlStringBuilder = xmlStringBuilder;
	}
	
	public JsonParser getParser() {
		return parser;
	}
	
	
	private static void setDoc(Document doc) throws SAXException{
		SSKServices.doc = doc;
	}
	
	public RestTemplate getRestTemplate() {
		return restTemplate;
	}
	
	public void setRestTemplate(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}
	
	private static void setxPath(XPath xPath) {
		SSKServices.xPath = xPath;
	}
	
	public  String getZoteroApihUrl() {
		return zoteroApihUrl;
	}
	
	public void setZoteroApihUrl(String zoteroApihUrl) {
		this.zoteroApihUrl = zoteroApihUrl;
	}
	
	public  HashMap<String, String> getPlatforms() {
		return platforms;
	}
	
	private  void setNode(NodeList node) {
		this.node = node;
	}
	
}

