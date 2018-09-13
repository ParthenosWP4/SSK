package ssk.server.service;


import com.google.gson.*;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.*;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.*;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class SSKServices {
    
    @Value("${elasticsearch.link}")
    private String elasticSearchPort;
    
    @Value("${elasticsearch.index}")
    private String sskIndex;
    
    
    @Autowired
    private GithubApiService githubApiService;
    
    @Autowired
    private ElasticServices elasticServices;
    
    @Autowired
    private RequestHeadersParams requestHeadersParams;
    
    @Autowired
    private ElasticGetDataServices elasticGetDataServices;
    
    private RestTemplate restTemplate;
    private ClassLoader classLoader;
    private HashMap<String, String> platforms = new HashMap<>();
    
    private static final String scenarioType = "scenario";
    private String stepType = "step";
    private static final String teiSSKRelaxNgPath = "TEI_SSK_ODD.rng";
    private static final String sskContentFileName = "SSK_Content.xml";
    private static final String teiToJsonFileName = "xml-to-json.xsl";
    private static final String teiSSKODDPath = "TEI_SSK_ODD.xml";
    private static final String glossary = "SSKvocs.xml";
    private static final String scenarioMetaData = "/TEI/text/body/div/desc/term";
    private static final String stepMetaData = "/TEI/text/body/listEvent/event/desc/term";
    private static final String resourcesPath = "/TEI/text/body/listEvent/event/linkGrp";
    private static final String resourceStandardPath = "/TEI/text/body/listEvent/event/linkGrp/ref/term[contains(@type, \"standard\")]";
    private static List<String> metaDataTab = Arrays.asList("techniques", "standard", "discipline", "objects", "activity", "object", "technique");
    
    private static String zoteroApihUrl = "https://api.zotero.org/";
    private static List<String> dateFormats = Arrays.asList("yyyy-MM-dd", "dd MMMMM yyyy", "yyyy-MM",  "yyyy");
    
    
    private JsonParser parser;
    private static Gson gson;
    private static StringBuilder xmlStringBuilder;
    private static Document doc;
    private static XPath xPath;
    private static NodeList node;
    private ArrayList<String> scenariosToUpdate;
    
    private static final Logger logger = LoggerFactory.getLogger(SSKServices.class);
    
    private Map<String, JsonElement> standardsTab = new HashMap<>();
    
    public static StringBuilder getXmlStringBuilder() {
        return xmlStringBuilder;
    }
    
    public static void setXmlStringBuilder(StringBuilder xmlStringBuilder) {
        SSKServices.xmlStringBuilder = xmlStringBuilder;
    }
    
    public JsonParser getParser() {
        return parser;
    }
    
    public static Document getDoc() {
        return doc;
    }
    
    public static void setDoc(Document doc) throws SAXException{
        SSKServices.doc = doc;
    }
    
    public static XPath getxPath() {
        return xPath;
    }
    
    public static void setxPath(XPath xPath) {
        SSKServices.xPath = xPath;
    }
    
    public static NodeList getNode() {
        return node;
    }
    
    public static void setNode(NodeList node) {
        SSKServices.node = node;
    }
    
    public boolean handleData;
    
    
    
    public RestTemplate getRestTemplate() {
        return restTemplate;
    }
    
    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    
    private static File teiToJsonFile;
    
    public SSKServices() {
        restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        classLoader = getClass().getClassLoader();
        parser = new JsonParser();
        gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        platforms.put("wp4", "groups/427927");
        
    }
    
    
    public String toJson(Object object) {
        return gson.toJson(object);
    }
    
    
    /**
     * In this function, we call application's services to
     * push all SSK file content in ElasticSerah
     * This function is launched one time when deploy SSK application on new environment
     * For each scenario :
     * get scenario content
     * validate scenario against relaXNG file
     * get scenaio's stpes and for each of them
     * get step content
     * validate step against relaXNG file
     * if all step files are valide
     * convert scenario content to json and push them in ElasticSearch
     * make the same with all scenario's step
     */
    
    
    public void initializeData()  throws  Exception{
        this.handleData = true;
        String relaxNgContent = githubApiService.getGithubFileContent("spec", teiSSKRelaxNgPath);
        convertStringToFile(relaxNgContent, teiSSKRelaxNgPath);
        String xsltContent = githubApiService.getGithubFileContent("spec", teiToJsonFileName);
        convertStringToFile(xsltContent, teiToJsonFileName);
        this.teiToJsonFile = getFile(teiToJsonFileName);
        
        //load Glossary's terms
        this.loadGlossaryTerms();
        
        //load Standards
        this.loadStandards();
        
        // Get List of Scenarios
        JsonArray scenarios = githubApiService.getSSKElementsList("scenarios");
        AtomicInteger ordinal = new AtomicInteger();
        scenarios.forEach(scenarioElt -> {
            try {
                JsonArray scenarioAndStep = new JsonArray();
                JsonObject scenario = scenarioElt.getAsJsonObject();
                String scenarioName = scenario.get("name").getAsString();
                logger.info("SCENARIO " + scenarioName);
                
                if (scenarioName.equals("1_ScenarioTest.xml")) return;
                if ( scenarioName.equals("0_test.xml")) return;
                if (scenarioName.equals("1_SSK_sc_loremIpsum.xml")) return;
                if (scenarioName.equals("README.md")) return;
                if (scenarioName.contains("unst")) return;
                
                String scenarioContent = githubApiService.getGithubFileContent(scenarioType, scenarioName);
                
                if (scenarioContent == null) return;
                if (validateSSKFile(scenarioContent, (ordinal.intValue() == scenarios.size() - 1))) {
                    updatePlatforms(scenarioContent);
                    scenarioContent = this.removeEltFromXML("encodingDesc", scenarioContent);
                    try {
                        JsonObject scenarioJson = teiToJson(scenarioContent, true, scenarioType);
                        scenarioJson.addProperty("GithubRef", scenarioName);
                        scenarioJson.addProperty("type", "scenario");
                        
                        scenarioAndStep.add(scenarioJson);
                        JsonArray steps = scenarioJson.getAsJsonObject("TEI").getAsJsonObject("text").getAsJsonObject("body").getAsJsonObject("div").getAsJsonObject("listEvent").getAsJsonArray("event");
                        for (int j = 0; j < steps.size(); j++) {
                            JsonObject step = steps.get(j).getAsJsonObject();
                            String stepReference = this.removeDoubleQuote(step.get("ref").toString());
                            logger.info("STEP:  " + stepReference + "*********position : " + (j + 1));
                            String stepContent = githubApiService.getGithubFileContent(stepType, stepReference + ".xml");
                            if (step.has("subtype")) {
                                subtypeEventManagement(scenarioAndStep, step, j + 1);
                                continue;
                            }
                            JsonObject stepJson = stepProcessing(stepReference, j + 1, scenarioName);
                            if (stepJson == null) { // Référence de l'étape malformée (avec des caractères spéciaux) ou bien étapes non existantes
                                continue; //break;
                            } else {
                                scenarioAndStep.add(stepJson);
                            }
                        }
                    } catch (ParserConfigurationException | SAXException | XPathExpressionException | IOException e) {
                        e.printStackTrace();
                    }
                } else {
                    logger.info("**************NON  VALIDE***************  " + scenarioName);
                }
                if (!elasticServices.pushData(scenarioAndStep, ordinal.intValue())) return;
                ordinal.getAndIncrement();
            } catch (Exception e) {
                e.printStackTrace();
                logger.error(e.getStackTrace().toString());
            }
        });
        this.handleData = false;
    }
    
    private JsonObject stepProcessing(String stepReference, int position, String parent) throws SAXException, ParserConfigurationException, XPathExpressionException, IOException {
        String stepContent = githubApiService.getGithubFileContent(stepType, stepReference + ".xml");
        if (!validateSSKFile(stepContent, false)) {
            return null;
        } else {
            updatePlatforms(stepContent);
            stepContent = this.removeEltFromXML("encodingDesc", stepContent);
            JsonObject stepJson = teiToJson(stepContent, false, stepType);
            stepJson.addProperty("position", position);
            stepJson.addProperty("GithubRef", stepReference);
            stepJson.addProperty("type", "step");
            stepJson.addProperty("parent", parent.split("\\.")[0]);
            return stepJson;
        }
    }
    
    /*This function is to change Zotero group url for a successful query for resources*/
    private void updatePlatforms(String content) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        setXmlStringBuilder(new StringBuilder().append(content));
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
    }
    
    public void generateRelaxNgFromXML(String teiODDContent) {
        File command = getFile("/lib/bin/teitorelaxng");
        if (command != null) {
            convertStringToFile(teiODDContent, teiSSKODDPath);
            File teiSSKODD = getFile(teiSSKODDPath);
            if (teiSSKODD != null) {
                File teiSSKRelaxNg = getFile(teiSSKRelaxNgPath);
                if (teiSSKRelaxNg != null) {
                    executeCommand(false, command.getPath(), "--xml", teiSSKODD.getPath(), teiSSKRelaxNg.getPath());
                }
            }
        }
    }
    
    //Here I have to send mail to Scenario Author if content is not valide against relaxNg
    public boolean validateSSKFile(String sskContent, boolean deleteFile) {
        boolean result = false;
        File command = getFile("/lib/jing.jar");
        if (command != null) {
            convertStringToFile(sskContent, sskContentFileName);
            File sskFile = getFile(sskContentFileName);
            File teiSSKRelaxNg = getFile(teiSSKRelaxNgPath);
            if (teiSSKRelaxNg != null && sskFile != null) {
                result = Boolean.parseBoolean(executeCommand(false, "java -jar " + command.getPath(), "", teiSSKRelaxNg.getPath(), sskFile.getPath()));
            }
            if (deleteFile) deleteFiles(sskFile, teiSSKRelaxNg);
        }
        
        return result;
    }
    
    public JsonObject teiToJson(String sskContent, boolean deleteFile, String type) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        sskContent = sskContent.replaceAll("<!--[\\s\\S]*?-->", "");
        File command = getFile("./lib/saxon9he.jar");
        JsonObject result = null;
        if (command != null) {
            convertStringToFile(sskContent, sskContentFileName);
            File sskFile = getFile(sskContentFileName);
            if (teiToJsonFile != null && sskFile != null) {
                String jSon = executeCommand(true, "java -jar " + command.getPath(), "", sskFile.getPath(), teiToJsonFile.getPath());
                result = this.parser.parse(jSon).getAsJsonObject();
                
            }
            if (result != null && type != null) {
                result.add("metadata", this.parser.parse(getMetadata(sskContent, type)));
                if (type.equals("step")) {
                    updateStandard(result, sskContent);
                }
            }
            if (deleteFile) deleteFiles(sskFile);
        }
        return result;
    }
    
    /*
     * Update Step's Standards with those in some resources
     */
    private void updateStandard(JsonObject result, String sskContent) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        setXmlStringBuilder(new StringBuilder().append(sskContent));
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
                        boolean isIn = true;
                        while (i >= 0) {
                            if (removeDoubleQuote(standards.get(i).getAsJsonObject().toString()).equals(removeDoubleQuote(standard.toString()))) {
                                break;
                            } else {
                                metaData.getAsJsonArray("standard").add(standard);
                            }
                            i = standards.size() - 1;
                        }
                    } else {
                        JsonArray jsonArray = new JsonArray();
                        jsonArray.add(standard);
                        metaData.add("standard", jsonArray);
                    }
                }
            }
        }
        result.add("metadata", metaData);
        setNode((NodeList) xPath.compile(resourcesPath).evaluate(doc, XPathConstants.NODESET));
        getStepResources(result, node);
    }
    
    public void convertStringToFile(String xmlStr, String path) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlStr)));
            DOMSource source = new DOMSource(doc);
            FileWriter writer = new FileWriter(new File(classLoader.getResource("./").getPath() + path));
            logger.info("--Create file '" + path + "' -- : OK");
            StreamResult result = new StreamResult(writer);
            
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.transform(source, result);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
    }
    
    private String getMetadata(String sskContent, String type) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        
        setXmlStringBuilder(new StringBuilder().append(sskContent));
        setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("UTF-8"))));
        setxPath(XPathFactory.newInstance().newXPath());
        setNode((NodeList) xPath.compile(type.equals(stepType) ? stepMetaData : scenarioMetaData).evaluate(doc, XPathConstants.NODESET));
        HashMap<String, List<JsonObject>> mapMetaData = new HashMap<>();
        
        for (int k = 0; k < node.getLength(); k++) {
            JsonObject metaData = new JsonObject();
            String metaDataType = removeDoubleQuote(node.item(k).getAttributes().getNamedItem("type").toString().split("=")[1]);
            for (int j = 0; j < node.item(k).getAttributes().getLength(); j++) {
                String[] attributes = node.item(k).getAttributes().item(j).toString().split("=", 2);
                metaData.addProperty(attributes[0], removeDoubleQuote(attributes[1]));
                if (removeDoubleQuote(attributes[1]).equals("discipline") && node.item(k).getTextContent() != "")
                    metaData.addProperty("key", node.item(k).getTextContent());
            }
            if (metaDataTab.contains(metaDataType)) {
                if (mapMetaData.containsKey(metaDataType)) {
                    mapMetaData.get(metaDataType).add(metaData);
                } else {
                    List<JsonObject> jsonArray = new ArrayList<>();
                    jsonArray.add(metaData);
                    mapMetaData.put(metaDataType, jsonArray);
                }
            } else {
                if (mapMetaData.containsKey("objects")) {
                    mapMetaData.get("objects").add(metaData);
                } else {
                    List<JsonObject> jsonArray = new ArrayList<>();
                    jsonArray.add(metaData);
                    mapMetaData.put("objects", jsonArray);
                }
            }
        }
        return gson.toJson(mapMetaData);
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
    
    private void getStepResources(JsonObject result, NodeList nodeParam) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        HashMap<String, List<JsonObject>> resourcesMap = new HashMap<>();
        for (int i = 0; i < nodeParam.getLength(); i++) {
            Element elt = (Element) nodeParam.item(i);
            String resourceType = removeDoubleQuote(elt.getAttributes().getNamedItem("type").toString().split("=")[1]);
            NodeList children = elt.getChildNodes();
            for (int k = 0; k < children.getLength(); k++) {
                if (children.item(k).getNodeType() != Node.TEXT_NODE && children.item(k).getNodeType() != Node.COMMENT_NODE) {
                    Node child = children.item(k);
                    NodeList grandChildren = child.getChildNodes();
                    JsonObject metaData = new JsonObject();
                    for (int j = 0; j < child.getAttributes().getLength(); j++) {
                        String[] attributes = child.getAttributes().item(j).toString().split("=", 2);
                        metaData.addProperty(attributes[0], removeDoubleQuote(attributes[1]));
                    }
                    if (resourcesMap.containsKey(resourceType)) {
                        resourcesMap.get(resourceType).add(metaData);
                    } else {
                        List<JsonObject> jsonArray = new ArrayList<>();
                        jsonArray.add(metaData);
                        resourcesMap.put(resourceType, jsonArray);
                    }
                }
            }
        }
        result.add("resources", this.parser.parse(resourcesMap.toString()));
    }
    
    /*
    This function retrieves from Elasticsearch whole data about  a specific standard
     */
    
    
    public JsonArray getWholeStandard(JsonArray standards) throws Exception {
        JsonArray result = new JsonArray();
        standards.forEach(standard -> {
            String clef = removeDoubleQuote(standard.getAsJsonObject().get("key").toString());
            if (standardsTab.containsKey(clef)) {
                result.add(standardsTab.get(clef));
            } else {
                try {
                    //ResponseEntity<String> response = this.restTemplate.getForEntity(dariahApiUrl + URLEncoder.encode(clef, "UTF-8") + "&wt=json", String.class);
                    JsonArray standardArray = this.elasticGetDataServices.getStandard(URLEncoder.encode(clef, "UTF-8")).getAsJsonArray();
                    if (standardArray.size() > 0) {
                        JsonObject standardElt = standardArray.get(0).getAsJsonObject().getAsJsonObject("_source");
                        JsonObject elt = new JsonObject();
                        JsonArray descArray = new JsonArray();
                        standardElt.getAsJsonObject().entrySet().forEach(entry -> {
                            String content = removeDoubleQuote(standardElt.get(entry.getKey()).toString());
                            switch (entry.getKey()) {
                                case "standard_abbr_name":
                                case "standard_complete_name":
                                case "standard_link":
                                case "standard_type":
                                    elt.addProperty(removeDoubleQuote(entry.getKey().split("_")[1].toString()), content);
                                    break;
                                case "standard_tags":
                                case "standard_resources":
                                    JsonArray eltArray = new JsonArray();
                                    String[] tags = content.replace("[", "").replace("]", "").split(",");
                                    for (int j = 0; j < tags.length; j++) {
                                        eltArray.add(tags[j]);
                                    }
                                    elt.add(removeDoubleQuote(entry.getKey().split("_")[1].toString()), eltArray);
                                default:
                                    if (entry.getKey().contains("desc")) {
                                        JsonObject desc = new JsonObject();
                                        desc.addProperty(removeDoubleQuote(entry.getKey().split("_")[2].toString()), removeDoubleQuote(content.toString()));
                                        descArray.add(desc);
                                    }
                                    break;
                            }
                        });
                        elt.add("desc", descArray.getAsJsonArray());
                        standardsTab.put(clef, elt);
                        result.add(elt);
                    } else {
                        standardsTab.put(clef, standard.getAsJsonObject());
                        if (!result.contains(standard.getAsJsonObject())) {
                            result.add(standard.getAsJsonObject());
                        }
                    }
                } catch (Exception e) {
                    logger.error(e.getMessage());
                    logger.error("Empty content for standard "+ clef + " This standard is not registered in our Database");
                }
            }
        });
        return result;
    }
    
    public JsonObject getZoteroResource(String id, String type) throws Exception {
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
        
        ResponseEntity<String> response = this.restTemplate.getForEntity(zoteroApihUrl + urlAddOn, String.class);
        JsonObject data = this.parser.parse(response.getBody()).getAsJsonObject().get("data").getAsJsonObject();
        if (data.has("title") && removeDoubleQuote(data.get("title").toString()) != "")
            result.addProperty("title", removeDoubleQuote(data.get("title").toString()));
        if (data.has("url") && removeDoubleQuote(data.get("url").toString()) != "")
            result.addProperty("url", removeDoubleQuote(data.get("url").toString()));
        if (data.has("date") && !removeDoubleQuote(data.get("date").toString()).isEmpty()){
            result.addProperty("date", data.get("date").toString());
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
        return result;
    }
    
    
    public JsonObject getHalResource(String target) throws IOException {
        org.jsoup.nodes.Document document = Jsoup.connect(target).get();
        JsonObject result = new JsonObject();
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
        result.addProperty("date", document.getElementsByAttributeValue("name", "citation_publication_date").attr("content"));
        result.addProperty("id", document.getElementsByAttributeValue("name", "DC.identifier").eq(1).attr("content"));
        return result;
    }
    
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
                result.addProperty("date", date.data());
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
    
    private void setDoc(StringBuilder content) throws SAXException{
    
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
        Runtime rt = Runtime.getRuntime();
        String result = "false";
        try {
            Process pr = rt.exec(input[0] + " " + input[1] + " " + input[2] + " " + input[3]);
            BufferedReader reader = new BufferedReader(new InputStreamReader(pr.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line = "";
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
            }
            
            if (!content)
                result = (output.toString().contains("SUCCESSFUL") || (output.toString().isEmpty())) ? "true" : "false";
            if (content) result = output.toString();
        } catch (IOException e) {
            logger.error(e.getMessage());
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
    
    public <T> T deepCopy(T object, Class<T> type) {
        try {
            Gson gson = new Gson();
            return gson.fromJson(gson.toJson(object, type), type);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    private String removeEltFromXML(String eltToRemove, String xmlContent) {
        if (xmlContent.contains(eltToRemove)) {
            xmlContent = xmlContent.substring(0, xmlContent.indexOf("<" + eltToRemove + ">")) + xmlContent.substring(xmlContent.indexOf("</" + eltToRemove + ">") + eltToRemove.length() + 3, xmlContent.length());
        }
        return xmlContent;
    }
    
    
    private void subtypeEventManagement(JsonArray scenarioAndSteps, JsonObject step, int stepPosition)
            throws SAXException, ParserConfigurationException, XPathExpressionException, IOException {
        
        String subtype = this.removeDoubleQuote(step.get("subtype").toString());
        String type = "";
        if (step.has("type")) {
            type = this.removeDoubleQuote(step.get("type").toString());
        }
        // String scenarioField = (subtype == "prerequisite") ? "prerequisites" : ;
        switch (subtype) {
            case "prerequisite":
                JsonArray prerequisites = new JsonArray();
                JsonObject item = new JsonObject();
                item.addProperty("type", (type.toLowerCase().contains("scenario")) ? "Scenario" : "Step");
                item.addProperty("ref", this.removeDoubleQuote(step.get("ref").toString()));
                if (scenarioAndSteps.get(0).getAsJsonObject().has("prerequisites")) {
                    scenarioAndSteps.get(0).getAsJsonArray().add(item);
                } else {
                    JsonArray items = new JsonArray();
                    items.add(item);
                    scenarioAndSteps.get(0).getAsJsonObject().add("prerequisites", items);
                }
                break;
            case "include":
                String scenarioReference = this.removeDoubleQuote(step.get("ref").toString());
                JsonObject param = (step.has("param")) ? step.getAsJsonObject("param") : null;
                if (param != null) {
                    this.includeStepFromOneScenarioToAnother(scenarioAndSteps, scenarioReference, param.get("value").getAsString(), stepPosition);
                }
                break;
            case "postStep":
                JsonArray optionals = new JsonArray();
                JsonObject elt = new JsonObject();
                elt.addProperty("type", (type.toLowerCase().contains("scenario")) ? "Scenario" : "Step");
                elt.addProperty("ref", this.removeDoubleQuote(step.get("ref").toString()));
                if (scenarioAndSteps.get(0).getAsJsonObject().has("optionals")) {
                    scenarioAndSteps.get(0).getAsJsonArray().add(elt);
                } else {
                    JsonArray items = new JsonArray();
                    items.add(elt);
                    scenarioAndSteps.get(0).getAsJsonObject().add("optionals", items);
                }
                break;
            default:
                break;
            
        }
        
    }
    
    
    /*
        This function retrieves step from a scenario and adds it to another
     */
    private void includeStepFromOneScenarioToAnother(JsonArray targetScenarioAndSteps, String sourceScenarioRef, String stepReference, int position) throws SAXException, ParserConfigurationException, XPathExpressionException, IOException {
        
        if (stepReference.contains(",")) {  // stepReference = "1,3-4,6"
            String[] stepReferences = stepReference.split(","); //stepReferences = ["1", "3-4", "6"]
            for (String stepRef : stepReferences) {
                this.includeStepFromOneScenarioToAnother(targetScenarioAndSteps, sourceScenarioRef, stepRef, position );
            }
        } else if (stepReference.contains("-")) { // stepReference = "3-4"
            String[] stepReferences = stepReference.split("-");  //stepReferences = ["3", "4"]
            for (String stepRef : stepReferences) {
                this.includeStepFromOneScenarioToAnother(targetScenarioAndSteps, sourceScenarioRef, stepRef, position );
            }
        } else { // stepReference = "4"
            targetScenarioAndSteps.add(this.getStepReferenceFromScenarioByPosition(sourceScenarioRef, stepReference, position));
            position++;
        }
    }
    
    
    /*
    This function gets a step's content from a source scenario and add it to a target one,
    this is to take into account the concept of parameters in scenario's step list
     */
    private JsonObject getStepReferenceFromScenarioByPosition(String scenarioRef, String positionInSourceScenario, int positionInTargetScenario) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        String scenarioContent = githubApiService.getGithubFileContent(scenarioType, scenarioRef+".xml");
        String listEvent = scenarioContent.substring(scenarioContent.indexOf("<listEvent>"), scenarioContent.indexOf("</listEvent>") + new String("</listEvent>").length());
        
        setXmlStringBuilder(new StringBuilder().append(listEvent));
        setDoc(DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(xmlStringBuilder.toString().getBytes("UTF-8"))));
        setxPath(XPathFactory.newInstance().newXPath());
        //String path = "//event[@xml:id = s" + positionInSourceScenario + " or  @xml:id=step" + positionInSourceScenario + "]";
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
    
    
    private void loadGlossaryTerms() throws Exception{
        String termsContentTEI = githubApiService.getGithubFileContent("spec", glossary);
        JsonObject termsContentJSON = teiToJson(termsContentTEI, true, null);
        termsContentJSON.addProperty("type", "glossary");
        HttpEntity entity = requestHeadersParams.addDetectNoop(termsContentJSON);
        logger.info(this.elasticServices.toHex(glossary));
        ResponseEntity<String> response = this.restTemplate.exchange( elasticSearchPort + "/" + sskIndex + "/_doc/"+this.elasticServices.toHex(glossary) , HttpMethod.PUT, entity, String.class);
        JSONObject responseBody = new JSONObject(response.getBody());
        if (responseBody.get("result").toString().equals("created")) {
            logger.info("Successful loading  of glossary");
        }
        else if(responseBody.get("result").toString().equals("updated")){
            logger.info("Successful updating of glossary");
        }
        else{
            logger.error("Failure loading  glossary terms");
        }
        
    }
    
    
    private void loadStandards(){
        File standard = this.getFile("./standards.json");
        JsonArray jsonStandards;
        final String[] standardAbbrName = new String[1];
        final String[] standardId = new String[1];
        try {
            final HttpEntity<String>[] entity = new HttpEntity[1];
            jsonStandards  = this.getParser().parse(new FileReader(standard)).getAsJsonArray();
            final JsonElement[] jsonResult = new JsonElement[1];
            jsonStandards.forEach(standardItem -> {
                standardAbbrName[0] = standardItem.getAsJsonObject().get("standard_abbr_name").toString().replaceAll("\"", "").replaceAll("\\\\n(\\s)+", " ");
                logger.info(standardAbbrName[0]);
                standardItem.getAsJsonObject().addProperty("standard_abbr_name", standardAbbrName[0]);
                standardId[0] = this.elasticServices.toHex(standardAbbrName[0]);
                standardItem.getAsJsonObject().addProperty("type", "standard");
                entity[0] = requestHeadersParams.addDetectNoop(standardItem);
                //ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort+ "/" + sskIndex + "/standard", HttpMethod.POST, entity[0], String.class);
                ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort+ "/" + sskIndex + "/_doc/"+ standardId[0], HttpMethod.PUT, entity[0], String.class);
                JSONObject responseBody = new JSONObject(response.getBody());
                if (responseBody.get("result").toString().equals("created")) {
                    logger.info("Successful pushed of " + standardItem.getAsJsonObject().get("standard_abbr_name").toString() + " Standard");
                }
                else if(responseBody.get("result").toString().equals("updated")){
                    logger.info("Successful update of " + standardItem.getAsJsonObject().get("standard_abbr_name").toString() + " Standard");
                }
                else {
                    logger.error("Standard" + standardItem.getAsJsonObject().get("standard_abbr_name").toString() + " have not been pushed to Elasticsearch");
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage());
            logger.error("Error when load standards");
        }
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
    
   
}

