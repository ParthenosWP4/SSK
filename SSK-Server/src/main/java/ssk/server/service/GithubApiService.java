package ssk.server.service;

import com.google.gson.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayInputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;


@Service
public class GithubApiService {
    
    @Value("${GITHUB_AUTH_TOKEN}")
    private String authorizationToken;
    
    private static final Logger logger = LoggerFactory.getLogger(GithubApiService.class.getName());
    
    @Value("${GITHUB_SSK_API}")
    private String githubUrl;
    
    @Value("${GITHUB_API}")
    private String githubApiUrl;
    
    private MultiValueMap<String, String> requestHeaders;
    
    private List<MediaType> responseHeaders;
    
    private HttpEntity<?> request;
    
    private RestTemplate restTemplate;
    
    private Gson gson ;
    
    public String url;
    
    private ResponseEntity<?> response ;
    
    public String getAuthorizationToken() {
        return authorizationToken;
    }
    
    public void setAuthorizationToken(String authorizationToken) {
        this.authorizationToken = authorizationToken;
    }
    
    public String getGithubApiUrl() {
        return githubApiUrl;
    }
    
    public void setGithubApiUrl(String githubApiUrl) {
        this.githubApiUrl = githubApiUrl;
    }
    
    public MultiValueMap<String, String> getHeaders() {
        return requestHeaders;
    }
    
    public HttpEntity<?> getRequest() {
        return request;
    }
    
    public String getGithubUrl() {
        return githubUrl;
    }
    
    @Autowired
    private SSKServices sskServices;
    
    @Autowired
    private ElasticGetDataServices elasticGetDataServices;
    
    public MultiValueMap<String, String> getRequestHeaders() {
        return requestHeaders;
    }
    
    
    
    
    
    public GithubApiService(){
        this.requestHeaders = new LinkedMultiValueMap<>();
        this.responseHeaders = new ArrayList<>();
        this.responseHeaders.add(MediaType.APPLICATION_JSON);
        
        this.restTemplate = new RestTemplate();
        gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    }
    
    public JsonArray getSSKElementsList(String type){
        this.request = new HttpEntity<>(this.updateRequestHeaders("json", null));
        this.url = "contents/"+ type+"/";
        ResponseEntity<String> responseEntity =  this.restTemplate.exchange(getGithubUrl() + this.url, HttpMethod.GET, this.getRequest(), String.class);
        return gson.fromJson(responseEntity.getBody(), JsonArray.class);
    }
    
    
    /**
     * <p>
     *     Get SSK file content
     *     File can be scenario, step or relaxNg
     * </p>
     * @param folderToRequestIn
     * @param fileName
     * @return
     * @throws HttpClientErrorException
     */
    public String getGithubFileContent (String  folderToRequestIn, String fileName) {
        String result ;
        this.request = new HttpEntity<>(this.updateRequestHeaders("xml", null));
        this.url  = "contents/" + folderToRequestIn + "/"+ fileName;
        try{
            result =  this.restTemplate.exchange(getGithubUrl() + this.url, HttpMethod.GET, this.request, String.class).getBody();
        }
        catch (HttpClientErrorException excep){
            logger.warn(excep.getClass().getCanonicalName() + " - " + excep.getMessage()+ " - Request to get file content  for " + fileName + " on Github failed!!!");
            result = null;
        }
       return result;
    }
    
    public JsonObject getRepositoryData(String repo, String type) throws UnsupportedEncodingException, HttpClientErrorException {
        this.request = new HttpEntity<>(this.updateRequestHeaders("json", null));
	        ResponseEntity<String> responseEntity =  this.restTemplate.exchange(getGithubApiUrl() + URLEncoder.encode(repo, "UTF-8"), HttpMethod.GET, this.getRequest(), String.class);
	        JsonObject result = gson.fromJson(responseEntity.getBody(), JsonObject.class);
	        JsonObject data = new JsonObject();
	        data.addProperty("type", type);
	        if(result.has("name")) data.addProperty("title", result.get("title").getAsString());
	        if(result.has("id")) data.addProperty("id", result.get("id").getAsString());
	        if(result.has("description"))  data.addProperty ("abstract", result.get("url").getAsString());
	        if(result.has("homepage")) data.addProperty ("url", result.get("homepage").getAsString());
	        if(result.has("created_at")) data.addProperty ("date", result.get("created_at").getAsString());
	        if(result.has("name")) {
		        JsonObject owner = result.getAsJsonObject("owner");
		        JsonObject elt = new JsonObject();
		        if(owner.has("type")) elt.addProperty("type",owner.get("type").getAsString());
		        if(owner.has("login")) elt.addProperty("name",owner.get("login").getAsString());
		        data.add ("creators", elt);
	        }
        return data;
    }

    /* Get Commits on specific Github path */
    public String getLastCommitDate(String type, String fileName ){
        this.url  = "commits?path=" + type + "/" + fileName;
        JsonElement jsonResult;
        this.request = new HttpEntity<>(this.updateRequestHeaders("json", null ));
        ResponseEntity<String> response =  this.restTemplate.exchange(getGithubUrl() + this.url, HttpMethod.GET, this.request , String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            jsonResult = this.sskServices.getParser().parse(response.getBody()).getAsJsonArray().get(0).getAsJsonObject().get("commit").getAsJsonObject().get("author");
            jsonResult = this.elasticGetDataServices.loadContentByKey(new JSONObject(jsonResult.toString()), "date");
            return jsonResult.getAsJsonObject().get("date").getAsString();
        }
        else{
            return null;
        }
    }
    
    
    private MultiValueMap<String, String>  updateRequestHeaders(String type, JSONObject jSon){
        switch (type){
            case "xml":
                this.getRequestHeaders().set("Accept", "application/vnd.github.VERSION.raw");
                this.getRequestHeaders().set("Content-Type", MediaType.APPLICATION_XML_VALUE);
                break;
            case "json":
                this.getRequestHeaders().set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
                break;
            default:
                //this.getRequestHeaders().set("Content-Type", "application/json;UTF-8");
                break;
        }
        this.getRequestHeaders().set("Authorization", authorizationToken);
        if(jSon !=null) {
            Iterator<?> keys = jSon.keys();
            while (keys.hasNext()) {
                String key = (String) keys.next();
                this.getRequestHeaders().set(key, (String) jSon.get(key));
            }
        }
        return this.getRequestHeaders();
    }
    
    /* Here I've to validate the XML scenario content before any operations on it*/
    private Document string2XMl(String content){
        
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder;
        try {
            builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(content.getBytes()));
            System.out.print("Root element: ");
            System.out.println(doc.getDocumentElement().getNodeName());
            System.out.println(nodeToString(doc.getDocumentElement()));
            return doc;
        } catch (Exception e) {
            e.printStackTrace();
            return  null;
        }
        
        
    }


    /* Transform XML scenario document in Json content for Search engine */
    
    private JSONObject getScenarioFromXML(Document document){
        JSONObject scenario = new JSONObject();
        
        
        return scenario;
    }
    
    
    private String nodeToString(Node node) {
        StringWriter sw = new StringWriter();
        try {
            Transformer t = TransformerFactory.newInstance().newTransformer();
            t.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            t.transform(new DOMSource(node), new StreamResult(sw));
        } catch (TransformerException te) {
            System.out.println("nodeToString Transformer Exception");
        }
        return sw.toString();
    }
    
    private JSONObject getMostUpdated(JSONArray jsonArray){
        JSONObject result = jsonArray.getJSONObject(0);
        if(jsonArray.length()> 1) {
            for (int i = 1; i < jsonArray.length(); i++) {
                JSONObject explrObject = jsonArray.getJSONObject(i);
                if(converDate(getDate(result)).compareTo(converDate(getDate(explrObject))) <= 0){
                    result = explrObject;
                }
            }
        }
        return result;
    }
    
    private Date converDate(String date ){
        SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-DDTHH:MM:SSZ");
        Date result = null;
        try {
            result =  sdf.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return result;
    }
    
    private String getDate(JSONObject json){
        String result = "";
        if ( json.get("commit") instanceof JSONObject ) {
            JSONObject commit = new JSONObject(json.get("commit").toString());
            if ( commit.get("committer") instanceof JSONObject ){
                JSONObject committer = new JSONObject(commit.get("committer").toString());
                result = (String) committer.get("date");
            }
        }
        return result;
    }
}
