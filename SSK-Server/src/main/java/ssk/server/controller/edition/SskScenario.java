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
import ssk.server.entity.Scenario;
import ssk.server.entity.service.ScenarioService;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "edition/scenario")
public class SskScenario {
	
	private static final Logger logger = LoggerFactory.getLogger(SskScenario.class.getName());
	
	@Autowired
	ScenarioService scenarioService;
	
	@RequestMapping(value = "/add",  method =  RequestMethod.POST  , produces="application/json", consumes="application/json")
	public ResponseEntity<JsonObject> addScenario(HttpServletRequest req, @RequestBody Scenario scenario, @RequestParam(value = "update", required = false) boolean update){
		
			logger.info(req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + req.getContextPath());
			
			JsonObject result = null;
		
			if(scenario.getSteps().isEmpty()){
				 result = scenarioService.saveScenario(scenario, update);
			}
			else {
				result = scenarioService.saveScenarioAndSteps(scenario, scenario.getSteps(), update);
			}
			
			return new ResponseEntity<JsonObject>(result, new HttpHeaders(), HttpStatus.OK);
		}
	
	
	@RequestMapping(value = "/publish",  method =  RequestMethod.POST  , produces="application/json", consumes="application/json")
	public ResponseEntity<JsonObject> publishScenario(HttpServletRequest req, @RequestBody Scenario scenario){
		
		logger.info(req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + req.getContextPath());
		
		JsonObject result = null;
		
		//Here code to save and publish a scenario abd her steps.
		
		
		return new ResponseEntity<JsonObject>(result, new HttpHeaders(), HttpStatus.OK);
	}
		
		
		
}
	
