package ssk.server.controller;


import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriUtils;
import ssk.server.service.ElasticGetDataServices;
import ssk.server.service.ElasticServices;
import ssk.server.service.SSKServices;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

@Controller
@RequestMapping(value = "/_search")
public class SearchEndpoint {
	
	@Autowired
	ElasticServices esServices;
	
	@Autowired
	SSKServices sskServices;
	
	@Autowired
	private ElasticGetDataServices elasticGetServices;
	
	private static final Logger logger = LoggerFactory.getLogger(SearchEndpoint.class.getName());
	
	HttpHeaders headers = new HttpHeaders();
	
	@ResponseBody
	@RequestMapping(method = {RequestMethod.GET }, produces="application/json")
	public ResponseEntity<String> getElement(@RequestParam(value = "tag", required = false) String tag, @RequestParam(value = "type", required = false) String type){
		JsonObject jsonResult = elasticGetServices.searchInStepsAndScenarios(tag, type);
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
	@RequestMapping(value = "/{word}", method = {RequestMethod.GET }, produces="application/json")
	public ResponseEntity<String> fullTextSearch(@PathVariable String word){
		JsonObject jsonResult = elasticGetServices.fullSearch(word);
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
