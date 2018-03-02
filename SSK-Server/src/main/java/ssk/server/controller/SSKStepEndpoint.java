package ssk.server.controller;


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
import ssk.server.service.ElasticServices;
import ssk.server.service.SSKServices;

@Controller
@RequestMapping(value = "/ssk/steps")
public class SSKStepEndpoint {
	
	@Autowired
	ElasticServices esServices;
	
	@Autowired
	SSKServices sskServices;
	
	private static final Logger logger = LoggerFactory.getLogger(SSKScenarioEndpoint.class.getName());
	
	HttpHeaders headers = new HttpHeaders();
	
	
	
	@ResponseBody
	@RequestMapping(method = { RequestMethod.GET  }, produces="application/json")
	public ResponseEntity<String> getScenarioCount(
			@RequestParam(value = "fields", required = false) String fields,
            @RequestParam(value = "fromSSK", required = false) String fromSSK,
            @RequestParam(value = "from", required = true) int from,
            @RequestParam(value = "size", required = true) int size
			){
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
						jsonResult = this.esServices.getItemsByID("step", Boolean.parseBoolean(fromSSK));
						break;
				}
			}
		}
		catch (NullPointerException e) {
			this.esServices.getStepPagination(from,size);
			
		}
		result = new ResponseEntity<>(jsonResult.toString(), this.headers, HttpStatus.OK);
		
		if(jsonResult.isJsonNull()){
			return sskServices.serverError();
		}
		return result;
	}

}
