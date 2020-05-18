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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import ssk.server.service.ElasticGetDataServices;
import ssk.server.service.SSKUserService;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "/user")
public class SskUserEndpoint {
	
	@Autowired
	SSKUserService sskUserService;
	
	@Autowired
	ElasticGetDataServices elasticGetDataServices;
	
	private static final Logger logger = LoggerFactory.getLogger(SskUserEndpoint.class.getName());
	
	
	@RequestMapping(value = "/add",  method =  RequestMethod.POST  , produces="application/json", consumes="application/json")
	public ResponseEntity<String> addUser(HttpServletRequest req, @RequestBody String userJson, @RequestParam(value = "update", required = false) boolean update){
		logger.info(req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + req.getContextPath());
		// boolean update = (tag) ? true : false;
		if(userJson == null){
			return new ResponseEntity<String>("", new HttpHeaders(), HttpStatus.BAD_REQUEST);
		}
		else {
			String result = sskUserService.addUser(userJson, update);
			if(result == "exist"){
				return new ResponseEntity<String>("Your email is already use", new HttpHeaders(), HttpStatus.CONFLICT);
			}
			if(result == null){
				return new ResponseEntity<String>("", new HttpHeaders(), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<String>("Your account has been successful " + ((update == true) ? "updated" : "created"), new HttpHeaders(), HttpStatus.OK);
		}
	}
	
	@RequestMapping(value = "/get",  method =  RequestMethod.GET  , produces="application/json", consumes="application/json")
	public ResponseEntity<String> addUser(HttpServletRequest req, @RequestParam(value = "email", required = true) String email) {
		JsonObject user = elasticGetDataServices.getDocumentById(email);
		if(user == null) {
			return new ResponseEntity<String>("", new HttpHeaders(), HttpStatus.FORBIDDEN);
		}
		else {
			user.remove("password");
			return new ResponseEntity<String>(user.get("_source").getAsJsonObject().toString(), new HttpHeaders(), HttpStatus.OK);
		}
	}
	
	
	}

