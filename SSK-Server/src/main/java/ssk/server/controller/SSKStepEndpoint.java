package ssk.server.controller;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ssk.server.service.ElasticGetDataServices;
import ssk.server.service.ElasticServices;
import ssk.server.service.SSKServices;

@Controller
@RequestMapping(value = "/ssk/steps")
public class SSKStepEndpoint {
	
	@Autowired
	ElasticServices esServices;
	
	@Autowired
	SSKServices sskServices;
	
	@Autowired
	private ElasticGetDataServices elasticGetServices;
	
	private static final Logger logger = LoggerFactory.getLogger(SSKScenarioEndpoint.class.getName());
	
	HttpHeaders headers = new HttpHeaders();
	
	@ResponseBody
	@RequestMapping(method = { RequestMethod.GET  }, produces="application/json")
	public ResponseEntity<String> getAllSteps(){
		JsonObject jsonResult = elasticGetServices.getAllSteps();
		ResponseEntity<String> result;
		if(jsonResult != null) {
			result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
		}
		else{
			result =  sskServices.serverError();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "metadata", method = { RequestMethod.GET  }, produces="application/json")
	public ResponseEntity<String> getAllStepsMetaData(){
		JsonObject jsonResult =  new JsonObject();
		jsonResult.add("step_metadata", elasticGetServices.getAllStepMetaData());
		ResponseEntity<String> result;
		if(jsonResult != null) {
			result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
		}
		else{
			result =  sskServices.serverError();
		}
		return result;
	}
	

}
