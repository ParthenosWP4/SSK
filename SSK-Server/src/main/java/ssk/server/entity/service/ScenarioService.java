package ssk.server.entity.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssk.server.entity.Scenario;
import ssk.server.entity.Step;
import ssk.server.entity.reposiroty.ScenarioRepository;

import java.util.List;

@Service
public class ScenarioService {
	
	@Autowired
	ScenarioRepository scenarioRepository;
	
	@Autowired
	StepService stepService;
	
	Scenario existScenario;
	
	@Transactional
	public JsonObject saveScenario(Scenario scenario, boolean update){
		JsonObject result = checkWhetherScenarioExistOrNotByTitle(scenario);
		if(!result.get("exist").getAsBoolean()){
			if(update) {
				scenario.setId(existScenario.getId());
			}
			scenarioRepository.save(scenario);
			result.addProperty("operation", true);
		}
		return result;
	}
	
	
	public JsonObject checkWhetherScenarioExistOrNotByTitle(Scenario scenario) {
		JsonObject result = new JsonObject();
		Scenario existScenario = scenarioRepository.findByTitleIgnocase(scenario.getTitle());
		if(existScenario != null){
			result.addProperty("exist", true);
			result.addProperty("msg", "Scenario with title '" + scenario.getTitle() + "' already exist, please check whether content are the same or change title !!!");
			result.addProperty("existScenarioContent", existScenario.getTeiContent());
		}
		else {
			scenarioRepository.save(scenario);
			result.addProperty("exist", false);
		}
		return result;
		
	}
	
	@Transactional
	public JsonObject saveScenarioAndSteps(Scenario scenario, List<Step> steps, boolean update) {
		JsonObject stepExists,  result = null;
		boolean save = true;
		for (Step step:steps) {
			stepExists = stepService.checkWhetherStepExistOrNotByTitle(step);
			 if(stepExists.get("exist").getAsBoolean()) {
			    save = false;
			    result = stepExists;
			    break;
			 }
		}
		if(save){
			result = saveScenario(scenario, update);
			if(result.get("operation").getAsBoolean()) {
				JsonArray stepsResult = new JsonArray();
				for (Step step:steps) {
					stepsResult.add(stepService.saveStep(step, update));
				}
			}
		}
		else {
			return result;
		}
		return result;
	}
	
	//public  getAllScenariosByA
	
}
