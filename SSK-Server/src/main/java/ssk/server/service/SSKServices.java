package ssk.server.service;


import com.google.gson.*;
import com.sun.org.apache.xerces.internal.parsers.DOMParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;

import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;


import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.soap.Node;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.*;
import java.io.*;
import java.util.List;

@Service
public class SSKServices {


    Gson gson;

    @Value("${elasticsearch.port2}")
    private String elasticSearchPort;

    @Autowired
    private GithubApiService githubApiService;

    @Autowired
    private ElasticServices elasticServices;

    private RestTemplate restTemplate;
    private  HttpHeaders headers;

    ClassLoader classLoader;

    public  static final String  teiSSKRelaxNgPath = "TEI_SSK_ODD.rng";

    public static final  String  sskContentFileName = "SSK_Content.xml";

    public static final String  teiToJsonFileName = "xml-to-json.xsl";

    public  static final String teiSSKODDPath = "TEI_SSK_ODD.xml";

    private final String standardPath = "/TEI/text/body/div/desc[@type='terms']";
    private final String resourcesPath = "/TEI/text/body/listEvent/event/linkGrp";




    public Gson getGson() {
        return gson;
    }

    public void setGson(Gson gson) {
        this.gson = gson;
    }

    public String getElasticSearchPort() {
        return elasticSearchPort;
    }

    public void setElasticSearchPort(String elasticSearchPort) {
        this.elasticSearchPort = elasticSearchPort;
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public HttpHeaders getHeaders() {
        return headers;
    }

    public void setHeaders(HttpHeaders headers) {
        this.headers = headers;
    }

    private File teiToJson;

    public SSKServices(){
        gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        this.headers =  new HttpHeaders();
        this.headers.set("Content-Type", "application/json; charset=utf-8");
        restTemplate = new RestTemplate();
        classLoader = getClass().getClassLoader();

    }

    public String toJson(Object object){
        return gson.toJson(object);
    }


    /* In this function, we call application's services to
     * push all SSK file content in ElasticSerah
     * This function is launched one time when deploy SSK application on new environment
     * For each scenario :
         * get scenario content
         * validate scenario against relaXNG file
         * get scenaio's stpes and for each of them
               * get step content
               * validate step against relaXNG file
         *  if all step files are valide
         *  convert scenario content to json and push them in ElasticSearch
         *  make the same with all scenario's step
     */
    public void initializeData(){
        JSONArray scenarioAndStep;
        String relaxNgContent =  githubApiService.getGithubFileContent ("spec", teiSSKRelaxNgPath);
        System.out.println("--Get relaxNG SSK file content-- : OK");
        convertStringToFile(relaxNgContent, teiSSKRelaxNgPath);
        String xsltContent = githubApiService.getGithubFileContent("spec", teiToJsonFileName);
        convertStringToFile(xsltContent, teiToJsonFileName);
        teiToJson = getFile(teiToJsonFileName);
        // Get List of Scenarios
        JSONArray scenarios = githubApiService.getSSKElementsList("scenarios");
        JSONObject scenario;

        for (int i = 0; i < scenarios.length(); i++) {
            scenarioAndStep = new JSONArray();
           scenario = scenarios.getJSONObject(i);
           System.out.println(scenario.getString("name"));
           String scenarioContent = githubApiService.getGithubFileContent("scenario", scenario.getString("name"));
               if(validateSSKFile(scenarioContent, (i==scenarios.length()-1))){
                   JsonParser parser = new JsonParser();
                   try{

                       JSONObject scenarioJson = teiToJson(scenarioContent, true, "step");
                       scenarioAndStep.put(scenarioJson);
                       JSONArray steps = scenarioJson.getJSONObject ("TEI").getJSONObject("text").getJSONObject("body").getJSONObject("div").getJSONObject("listEvent").getJSONArray("event");
                       for (int j = 0; j < steps.length(); j++) {
                           JSONObject step = steps.getJSONObject(j);
                           String stepContent = githubApiService.getGithubFileContent("step", step.get("ref").toString()  +".xml");
                           if(!validateSSKFile(stepContent, false)) {
                               break;
                           }
                           else {
                               JSONObject stepJson = teiToJson(stepContent, false, "scenario");
                               scenarioAndStep.put(stepJson);
                           }
                       }
                   }
                   catch (ParserConfigurationException| SAXException| XPathExpressionException | IOException e ){

                   }

               }
               else {
                   System.out.println("**************NON  VALIDE***************"+  scenario.getString("name"));
               }

           if (! elasticServices.pushData(scenarioAndStep, i)) continue;
        }
    }


    public void  generateRelaxNgFromXML(String teiODDContent){
        File command = getFile("/Stylesheets-dev/bin/teitorelaxng");
        if(command != null){
            convertStringToFile(teiODDContent, teiSSKODDPath);
            File teiSSKODD = getFile(teiSSKODDPath);
            if(teiSSKODD != null){

                File teiSSKRelaxNg = getFile(teiSSKRelaxNgPath);
                if(teiSSKRelaxNg != null){
                   executeCommad(false, command.getPath(), "--xml", teiSSKODD.getPath(), teiSSKRelaxNg.getPath());
                }
            }
        }
    }

    // Here I have to send mail to Scenario Author if content is not valide against relaxNg
    public boolean validateSSKFile(String sskContent, boolean deleteFile){
        boolean result = false;
        File command = getFile("/Stylesheets-dev/lib/lib/jing.jar");

        if(command != null){
            convertStringToFile(sskContent, sskContentFileName);
            File sskFile = getFile(sskContentFileName);
            File teiSSKRelaxNg = getFile(teiSSKRelaxNgPath);
            if(teiSSKRelaxNg != null && sskFile !=null){
                result =  Boolean.parseBoolean(executeCommad(false, "java -jar "+command.getPath(), "",teiSSKRelaxNg.getPath(), sskFile.getPath()));
            }


            if(deleteFile) deleteFiles(sskFile, teiSSKRelaxNg );
        }

        return result;
    }

    public JSONObject  teiToJson(String sskContent, boolean deleteFile, String type) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {
        File command = getFile("./Stylesheets-dev/lib/saxon9he.jar");
        JSONObject  result = null;
        if(command != null){

            convertStringToFile(sskContent, sskContentFileName);
            File sskFile = getFile(sskContentFileName);

            if(teiToJson != null && sskFile !=null){
                String jSon =  executeCommad(true, "java -jar "+command.getPath(), "",sskFile.getPath(), teiToJson.getPath());
                result =  new JSONObject(jSon);
            }
            if(result != null){
                if(type.equals("step")){
                    result.put("metadata", getMetadata(sskContent, type ));
                }
                else{

                }
            }

            if(deleteFile) deleteFiles(sskFile );
        }
        return result;
    }



    public   void  convertStringToFile(String xmlStr, String path) {

        try
        {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse( new InputSource( new StringReader( xmlStr ) ) );
            DOMSource source = new DOMSource(doc);
            FileWriter writer = new FileWriter(new File(classLoader.getResource("./").getPath() + path));
            System.out.println("--Create file '"+ path +"' -- : OK");
            StreamResult result = new StreamResult(writer);

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.transform(source, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private JSONObject getMetadata(String  sskContent, String type) throws IOException, SAXException, XPathExpressionException, ParserConfigurationException {

        JSONObject result = new JSONObject();

        DocumentBuilderFactory factory =
                DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        StringBuilder xmlStringBuilder = new StringBuilder();
        xmlStringBuilder.append(sskContent);
        ByteArrayInputStream input =  new ByteArrayInputStream(
                xmlStringBuilder.toString().getBytes("UTF-8"));
        Document doc = builder.parse(input);

        XPath xPath = XPathFactory.newInstance().newXPath();
        NodeList nodeList = ( NodeList) xPath.compile(standardPath).evaluate(
                doc, XPathConstants.NODESET);
       System.out.println(nodeList.item(0).getTextContent());
        JSONObject metadata =  teiToJson(nodeList.toString() , false, type);
       result.put("metadata", metadata);
       if(type.equals("step")){

       }
        return result;
    }


    private File getFile(String path){
        File result  = null;
        try{
            result =  new File(classLoader.getResource(path).getFile());
        }
        catch (Exception e){
            //e.printStackTrace();
            result = new File(classLoader.getResource("./").getPath() + path);
        }
        return result;
    }

    private String  executeCommad (boolean content, String ... input){
        Runtime rt = Runtime.getRuntime();
        String result = "false";
        try {
            Process pr = rt.exec( input[0] + " "+ input[1]+ " "+input[2]+ " "+input[3]);
            BufferedReader reader  =  new BufferedReader(new InputStreamReader(pr.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line = "";
            while ((line = reader.readLine())!= null) {
                output.append(line + "\n");
            }
            if (!content) result =  (output.toString().contains("SUCCESSFUL") || (output.toString().isEmpty())) ? "true" : "false";
            if(content) result = output.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  result;
    }


    private void deleteFiles(File ...files) {
        for (File file:files
                ) {
            file.delete();
        }
    }
}
