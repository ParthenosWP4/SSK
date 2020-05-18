package ssk.server.controller.edition;


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
import ssk.server.entity.Author;
import ssk.server.entity.service.AuthorService;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "edition/author")
public class SskAuthorEndPoint {
	
	@Autowired
	AuthorService authorService;
	
	private static final Logger logger = LoggerFactory.getLogger(SskAuthorEndPoint.class);
	
	@RequestMapping(value = "/add",  method =  RequestMethod.POST  , produces="application/json", consumes="application/json")
	public ResponseEntity<JsonObject> addUser(HttpServletRequest req, @RequestBody Author author, @RequestParam(value = "update", required = false) boolean update){
		
		JsonObject result;
		
		logger.info(req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + req.getContextPath());
		
		result = authorService.saveAuthor(author, update);
		
		return new ResponseEntity<JsonObject>(result, new HttpHeaders(), HttpStatus.OK);
	}

}
