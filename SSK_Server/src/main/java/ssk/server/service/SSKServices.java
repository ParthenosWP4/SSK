package ssk.server.service;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;

@Service
public class SSKServices {


    Gson gson;

    @Value("${elasticsearch.port2}")
    private String elasticSearchPort;

    @Autowired
    private GithubApiService githubApiService;

    private RestTemplate restTemplate;
    private  HttpHeaders headers;

    ClassLoader classLoader;

    public static final String  teiSSKRelaxNgPath = "TEI_SSK_ODD.rng";

    public static final  String  sskContentFileName = "SSK_Content.xml";

    public static final String  teiToJsonFileName = "teiToJson.xsl";

    private final String regex = ",\\n\\s+\\}";


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



    /* Fetch Data from GithHub to Elastic Search

    public  String fetchData(){

        JSONArray specs = githubApiService.getSpecifications().getBody();
        for (int i = 0; i < specs.length(); i++) {
            if()
        }
       return null ;
    }*/

    public File  generateRelaxNgFromXML(String teiODDContent){
        String teiSSKODDPath = "TEI_SSK_ODD.xml";
        File command = getFile("/Stylesheets-dev/bin/teitorelaxng");
        if(command != null){
            convertStringToFile(teiODDContent, teiSSKODDPath);
            File teiSSKODD = getFile(teiSSKODDPath);
            if(teiSSKODD != null){

                File teiSSKRelaxNg = getFile(teiSSKRelaxNgPath);
                if(teiSSKRelaxNg != null && Boolean.parseBoolean(executeCommad(false, command.getPath(), "--xml", teiSSKODD.getPath(), teiSSKRelaxNg.getPath()))){
                        return teiSSKRelaxNg;
                }
            }

        }
        return null;
    }


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

    public JSONObject teiToJson(String xsltContent, String sskContent, boolean deleteFile){
        File command = getFile("/Stylesheets-dev/lib/saxon9he.jar");
        JSONObject result = new JSONObject();
        if(command != null){
            convertStringToFile(xsltContent, teiToJsonFileName);
            convertStringToFile(sskContent, sskContentFileName);
            File sskFile = getFile(sskContentFileName);
            File teiToJson = getFile(teiToJsonFileName);
            if(teiToJson != null && sskFile !=null){
                String jSon =  executeCommad(true, "java -jar "+command.getPath(), "",sskFile.getPath(), teiToJson.getPath());
                jSon = jSon.replaceAll(",\\n\\s+\\}", "}");
                result =  new JSONObject(jSon);
            }
            if(deleteFile) deleteFiles(sskFile, teiToJson );
        }
        return result;
    }



    private  void  convertStringToFile(String xmlStr, String path) {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder;
        try
        {
            builder = factory.newDocumentBuilder();
            Document doc = builder.parse( new InputSource( new StringReader( xmlStr ) ) );
            DOMSource source = new DOMSource(doc);
            FileWriter writer = new FileWriter(new File(classLoader.getResource("./").getPath() + path));
            StreamResult result = new StreamResult(writer);

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.transform(source, result);
            //return doc;
        } catch (Exception e) {
            e.printStackTrace();
        }
        //return null;
    }


    private File getFile(String path){
        File result  = null;
        try{
            result =  new File(classLoader.getResource(path).getFile());
        }
        catch (Exception e){
            e.printStackTrace();
            result = new File(classLoader.getResource("./").getPath() + path);
        }
        return result;
    }

    private String  executeCommad (boolean content, String ... input){
        Runtime rt = Runtime.getRuntime();
        String result = "false";
        try {
            Process pr = rt.exec( input[0] + " "+ input[1]+ " "+input[2]+ " "+input[2]);
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
