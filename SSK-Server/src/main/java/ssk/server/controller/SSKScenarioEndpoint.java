package ssk.server.controller;



import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ssk.server.service.ElasticGetDataServices;
import ssk.server.service.ElasticServices;
import ssk.server.service.SSKServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping(value = "/")
public class SSKScenarioEndpoint {
    
    
    @Autowired
    ElasticGetDataServices elasticGetDataServices;
    
    @Autowired
    ElasticServices esServices;
    
    @Autowired
    SSKServices sskServices;
    
    private static final Logger logger = LoggerFactory.getLogger(SSKScenarioEndpoint.class.getName());
    
    HttpHeaders headers = new HttpHeaders();
    
    
    
    @ResponseBody
    @RequestMapping(value = "/scenarios",  method = { RequestMethod.GET  }, produces="application/json")
    public  ResponseEntity<String>  getScenarioCount(@RequestParam(value = "fields", required = false) String fields, @RequestParam(value = "fromSSK", required = false) String fromSSK ){
        JsonObject jsonResult = new JsonObject();
        ResponseEntity<String> result;
        try{
            if(fields.split(",").length > 1){
                logger.info((fields.split(",").toString()));
                logger.info(Integer.toString(fields.split(",").length));
            }
            else{
                switch (fields){
                    case "count":
                        jsonResult = this.esServices.getItemsByID("scenario", Boolean.parseBoolean(fromSSK));
                        break;
                }
            }
        }
        catch (NullPointerException e) {
            logger.info("empty, Here get All fields");
            
        }
        result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
        
        if(jsonResult.isJsonNull()){
            return sskServices.serverError();
        }
        return result;
    }
    
    
    @ResponseBody
    @RequestMapping(value = "scenario/{scenarioId}",  method = { RequestMethod.GET  }, produces="application/json")
    public  ResponseEntity  getScenario(@PathVariable String scenarioId, @RequestParam(value = "fields", required = false) String fields){
        
        JsonObject jsonResult = new JsonObject();
        ResponseEntity<String> result;
        
        try {
            List<String> fieldTab = Arrays.asList(fields.split(","));
            if(fieldTab.size() > 0){
                fieldTab.forEach(field -> {
                    
                    try{
                        if(field.equals("image")){
                            
                            jsonResult.addProperty(field, sskServices.removeDoubleQuote (elasticGetDataServices.getScenarioDetails(scenarioId, field).getAsJsonObject().get("url").toString()));
                        }
                        else{
                            jsonResult.add(field, elasticGetDataServices.getScenarioDetails(scenarioId, field));
                        }
                    }
                    catch (NullPointerException e){
                        jsonResult.add(field, null);
                    }
                    
                });
            }
        }
        catch (NullPointerException e) {
            e.printStackTrace();
            logger.info("empty, Here get All fields");
            
        }
        return  new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
    }
}
