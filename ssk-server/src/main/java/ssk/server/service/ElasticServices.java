package ssk.server.service;


import com.google.gson.JsonParser;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Iterator;
import java.util.Set;

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
    private HttpHeaders headers ;

    public ElasticsearchOperations getEs() {
        return es;
    }

    public void setEs(ElasticsearchOperations es) {
        this.es = es;
    }




    public ResponseEntity<Object> getElastichHealth(){
        HttpStatus status;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("content", "AVAILABLE");
        ResponseEntity<String> response = this.restTemplate.getForEntity("http://localhost:"+elasticSearchPort+"_cat/health", String.class);
        if(response.getStatusCode().equals(HttpStatus.NOT_FOUND) || response.getBody().contains("red")){
            jsonObject.put("content", "NOT AVAILABLE");
        }
        return ResponseEntity.status(HttpStatus.OK)
        .headers(this.headers)
        .body(sskServices.toJson(jsonObject));
    }

    public  boolean createMappings(String indexType, String index){

        JSONObject enabled = new JSONObject();
        enabled.put("enabled", false);

        /*JSONObject all = new JSONObject();
        all.put("_all", enabled);

        JSONObject dynamic = new JSONObject();
        dynamic.put("dynamic", true);*/

        JSONObject typeContent = new JSONObject();
        //type.append(indexType, dynamic);
        typeContent.put("_all", enabled);
        typeContent.put("dynamic", true);

        JSONObject type = new JSONObject();
        type.put(indexType, typeContent);
        JSONObject mapping = new JSONObject();
       // mapping.put("mappings", type);

        System.out.println(typeContent.toString());

        this.headers = getHeaders();
        this.headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String > entity = new HttpEntity<String>(typeContent.toString(), this.headers);
      ResponseEntity<String >  response = this.restTemplate.exchange("http://localhost:"+elasticSearchPort+"/"+index+"/_mapping/"+indexType, HttpMethod.PUT, entity, String.class);
              //this.restTemplate.exchange("http://localhost:"+elasticSearchPort+"/"+index, HttpMethod.PUT, entity, String.class).getBody();
       String responseBody = response.getBody();
        mapping = new JSONObject(responseBody);
        boolean result = false;
        Set keys = mapping.keySet();
        Iterator iter= keys.iterator();
        while(iter.hasNext()) {
            String key = (String)iter.next();// loop to get the dynamic key
            result = (boolean)mapping.get(key);
            System.out.print("key : "+key);
            System.out.println(" value :"+result);
        }
        return result;
    }


    public  HttpHeaders  getHeaders(){
        this.headers =  new HttpHeaders();
        //this.headers.set("Content-Type", "application/json; charset=utf-8");
        //headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        return this.headers;
    }
}
