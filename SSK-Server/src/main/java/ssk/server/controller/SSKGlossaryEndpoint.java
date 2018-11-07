package ssk.server.controller;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ssk.server.service.ElasticGetDataServices;
import ssk.server.service.ElasticServices;
import ssk.server.service.SSKServices;

@Controller
@RequestMapping(value = "/glossary")
public class SSKGlossaryEndpoint {
	
	
	
	@Autowired
	ElasticGetDataServices elasticGetDataServices;
	
	@Autowired
	ElasticServices esServices;
	
	@Autowired
	SSKServices sskServices;
	
	private static final Logger logger = LoggerFactory.getLogger(SSKScenarioEndpoint.class.getName());
	
	HttpHeaders headers = new HttpHeaders();
	
	
	@ResponseBody
	@RequestMapping(value = "/terms",  method = { RequestMethod.GET  }, produces="application/json")
	public ResponseEntity<String> getAllTerms(){
		JsonElement jsonResult ;
		ResponseEntity<String> result;
		jsonResult = this.elasticGetDataServices.getAllResources("glossary").getAsJsonArray();
		result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
		
		if(jsonResult.isJsonNull()){
			return sskServices.serverError();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "/terms/{type}",  method = { RequestMethod.GET  }, produces="application/json")
	public ResponseEntity<String> getTerms(@PathVariable String type){
		JsonArray jsonResult ;
		ResponseEntity<String> result;
		jsonResult = this.elasticGetDataServices.getAllResources("glossary").getAsJsonArray();
		jsonResult = this.sskServices.getTermsByType(jsonResult, type);
		result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
		if(jsonResult.isJsonNull()){
			return sskServices.serverError();
		}
		
		return result;
	}
}
