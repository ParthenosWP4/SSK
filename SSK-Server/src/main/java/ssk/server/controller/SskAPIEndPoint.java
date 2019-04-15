package ssk.server.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ssk.server.service.SSKServices;
import ssk.server.service.SskAPIService;


@Controller
@RequestMapping(value = "/api")
public class SskAPIEndPoint {
	
	private static final Logger logger = LoggerFactory.getLogger(SskAPIEndPoint.class.getName());
	
	@Autowired
	SSKServices sskServices;
	
	@Autowired
	SskAPIService sskAPIService;
	
	HttpHeaders headers = new HttpHeaders();
	
	@ResponseBody
	@RequestMapping(value = "scenarios", method = {RequestMethod.GET })
	public ResponseEntity<String> getScenario(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "format", required = false) String format){
		String jsonResult = sskAPIService.createAPIResult(id, "scenarios",null);
		ResponseEntity<String> result;
		switch (jsonResult){
			case "not found":
				result =  sskServices.notFound();
			break;
			case "error":
				result =  sskServices.serverError();
			break;
			default:
				this.headers.setContentType(MediaType.parseMediaType("text/xml; charset=UTF-8"));
				result = new ResponseEntity<>(jsonResult, this.headers, HttpStatus.OK);
			break;
			
		}
		return result;
	}
	
	
}
