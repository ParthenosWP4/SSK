package ssk.server.entity.service;


import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssk.server.entity.Scenario;
import ssk.server.entity.Step;
import ssk.server.entity.reposiroty.StepRepository;

import java.util.List;

@Service
public class StepService {

	@Autowired
	StepRepository stepRepository;
	
	Step existStep;
	
	@Transactional
	public JsonObject saveStep(Step step, boolean update){
		JsonObject result = checkWhetherStepExistOrNotByTitle(step);
		if (!result.get("exist").getAsBoolean()){
			if(update == true ){
				step.setId(existStep.getId());
			}
			//existStep = step;
			stepRepository.save(step);
			result.addProperty("operation", true);
		}
		return result;
	}
	
	
	
	@Transactional
	public JsonObject checkWhetherStepExistOrNotByTitle(Step step) {
		JsonObject result = new JsonObject();
		List<Step> existSteps = stepRepository.findAllByTitleContains(step.getTitle());
		for (Step stepFromDB : existSteps) {
			if (step.getTeiContent() == stepFromDB.getTeiContent()) {
				result.addProperty("exist", true);
				result.addProperty("msg", "Step with title '" + step.getTitle() + "'  already exist, please check whether content are the same or change title !!!");
				result.addProperty("existStep", existStep.getTeiContent());
			} else {
				result.addProperty("exist", false);
			}
		}
		return result;
	}
}
