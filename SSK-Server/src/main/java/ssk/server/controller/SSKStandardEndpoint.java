package ssk.server.controller;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ssk.server.service.ElasticGetDataServices;
import ssk.server.service.SSKServices;

@Controller
@RequestMapping(value = "/standard")
public class SSKStandardEndpoint {
	
	@Autowired
	ElasticGetDataServices elasticGetDataServices;
	
	@Autowired
	SSKServices sskServices;
	
	HttpHeaders headers = new HttpHeaders();
	
	@ResponseBody
	@RequestMapping(value = "/all",  method = { RequestMethod.GET  }, produces="application/json")
	public ResponseEntity<String> getAllStandard(){
		JsonElement jsonResult ;
		ResponseEntity<String> result;
		jsonResult = this.elasticGetDataServices.getAllResourcesByType("standard");
		result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
		if(jsonResult.isJsonNull()){
			return sskServices.serverError();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "/{shortName}",  method = { RequestMethod.GET  }, produces="application/json")
	public ResponseEntity<String> getOneStandard(@PathVariable String shortName){
		JsonElement jsonResult ;
		ResponseEntity<String> result;
		jsonResult = this.elasticGetDataServices.getStandard(shortName);
		
		if(jsonResult == null){
			return sskServices.notFound();
		}
		else {
			result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
		}
		return result;
	}
	
}
