package ssk.server.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.dom4j.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;


@Service
public class CommitsHandleService {
	
	private static final Logger logger = LoggerFactory.getLogger(CommitsHandleService.class);
	
	@Autowired
	private GithubApiService githubApiService;
	
	@Autowired
	private SSKServices sskServices;
	
	@Autowired
	ElasticServices elasticServices;
	
	public static ConcurrentHashMap<String, JsonObject> modifiedCommits = new ConcurrentHashMap<>();
	private static ConcurrentHashMap<String, JsonObject> removedCommits = new ConcurrentHashMap<>();
	public static ConcurrentHashMap<String, JsonObject> addedCommits = new ConcurrentHashMap<>();
	private static ConcurrentHashMap<String, JsonObject> committers = new ConcurrentHashMap<>();
	private static ConcurrentHashMap<String, JsonObject> commits = new ConcurrentHashMap<>();
	
	
	
	
	public JsonObject webhooksHandle(JsonArray commits) {
		 JsonObject result = new JsonObject();
		final boolean[] added = new boolean[1];
		final boolean[] modified = new boolean[1];
		final boolean[] removed = new boolean[1];
		commits.forEach(commit -> {
			JsonObject jsonCommit = commit.getAsJsonObject();
			if(jsonCommit.has("modified") && (jsonCommit.getAsJsonArray("modified").size() > 0)){
				modified[0] = true;
				extractCommits(jsonCommit.getAsJsonArray("modified"), "modified" );
			}
			if(jsonCommit.has("added") && (jsonCommit.getAsJsonArray("added").size() > 0)){
				added[0] = true;
				extractCommits(jsonCommit.getAsJsonArray("added"), "added" );
			}
			if(jsonCommit.has("removed") && (jsonCommit.getAsJsonArray("removed").size() > 0)){
				removed[0] = true;
				extractCommits(jsonCommit.getAsJsonArray("removed"), "removed" );
			}
		});
		if(added[0]) result.add("added", commitsHandle("added"));
		if(modified[0]) result.add("modified", commitsHandle("modified"));
		if(removed[0]) result.add("removed", commitsHandle("removed"));
		return result;
	}
	
	
	
	
	private void extractCommits(JsonArray commits, String typeOfCommits){
		JsonObject modifiedResult ;
		for(JsonElement commitJson: commits){
			String[] types = commitJson.getAsString().split("/");
			String type = (types.length == 3) ? types[1] : ((types.length == 2) ? types[0] : "");
			switch (type){
				case "scenarios":
				case "steps":
				case "standardsKB":
				case "spec":
					modifiedResult = new JsonObject();
					modifiedResult.addProperty("type", type);
					modifiedResult.addProperty("identifier", types[types.length-1]);
					switch (typeOfCommits) {
						case "modified":
							modifiedCommits.put(types[types.length - 1], modifiedResult);
							break;
						case "added":
							addedCommits.put(types[types.length - 1], modifiedResult);
							break;
						case "removed":
							removedCommits.put(types[types.length - 1], modifiedResult);
							break;
					}
				break;
				default:
				break;
			}
		}
		
		
	}
	
	
	/**
	 * <p>
	 *     Handles Added Commits
	 * </p>
	 */
	
	private synchronized JsonArray  commitsHandle(String typeOfCommit){
		JsonArray commitResult  = new JsonArray();
		JsonObject metaData = null, resources = null;
		 ConcurrentHashMap<String, JsonObject> commits = (typeOfCommit.equals("modified")) ? modifiedCommits : (typeOfCommit.equals("added") ? addedCommits : (typeOfCommit.equals("removed")? removedCommits: null));
		
		List<String> values = new ArrayList<>(commits.keySet());
		Collections.sort(values);
		
		for (String key: values)
		{
			JsonObject commit = commits.get(key);
			String type = commit.get("type").getAsString();
			String identifier = commit.get("identifier").getAsString();
			identifier = identifier.substring(0, identifier.length()-4);
			commit.addProperty("ACTION", (typeOfCommit.equals("modified")) ? "UPDATE" : (typeOfCommit.equals("added") ? "ADD" : (typeOfCommit.equals("removed")? "DELETE": null)));
			switch (type){
				case "scenarios":
					if(typeOfCommit.equals("removed")){
						if(elasticServices.deleteElementById("scenario", identifier)){
							commit.addProperty("successful", "YES");
							commit.addProperty("msg", "Commit: Scenario with identifier "+ identifier+ " has been successful removed from Elasticsearch");
							commitResult.add(commit);
						}
						else{
							commit.addProperty("successful", "NO");
							commit.addProperty("msg", "Commit: Scenario with identifier "+ identifier+  " has not  been  update on Elasticsearch");
							commitResult.add(commit);
						}
					}
					else {
						String xmlContent = this.githubApiService.getGithubFileContent(type,  identifier + ".xml");
						if(xmlContent != null){
							try {
								if(sskServices.checkIfScenarioIsComplete(xmlContent,  identifier )) {
									// Check if scenario is well formed (@Charles method)
									sskServices.scenarioHandling(identifier, true);
									commit.addProperty("successful", "YES");
									commit.addProperty("msg", "Commit\" : Scenario "+ identifier+ " has  been successful update into Elasticsearch");
									commitResult.add(commit);
								} else {
									commit.addProperty("successful", "NO");
									commit.addProperty("msg", "Scenario has not been add/update due to the fact his steps are not completely available on Github");
									commitResult.add(commit);
									updateCommitsResult(commitResult, identifier, ElasticServices.commitedSteps, true);
								}
							} catch (DocumentException e) {
								logger.error(e.getClass().getCanonicalName() + "Commit \" :" + e.getMessage()+ " Error when  checking if scenario is completed or not ." + identifier );
								setCommit(commit, commitResult, identifier);
							}
						}
						else {
							logger.error( "Content with identifier " + identifier + "is not available on Github!!! " );
							setCommit(commit, commitResult, identifier);
						}
					}
				break;
				case "steps":
					if(ElasticServices.commitedSteps.indexOf(identifier) != -1){
						commit.addProperty("successful", "YES");
						commit.addProperty("msg", "Commit : Step with identifier "+ identifier+ " has  been successful update into Elasticsearch");
						commitResult.add(commit);
						continue;
					}
					if(typeOfCommit.equals("modified")){
						JsonObject jsonStep = new JsonObject();
						jsonStep.addProperty("ref", identifier);
						JsonObject step = sskServices.stepProcessing(jsonStep,0, null, true).getAsJsonObject();
						if(step.has("metadata")) metaData = step.getAsJsonObject("metadata");
						if(step.has("resources")) resources = step.getAsJsonObject("resources");
						if(elasticServices.updateElementById("step", identifier.substring(0, identifier.length()-4), step, "step_metadata", metaData, resources, true)){
							commit.addProperty("successful", "YES");
							commit.addProperty("msg", "Commit : Step with identifier "+ identifier+ " has  been successful update into Elasticsearch");
							commitResult.add(commit);
						}
						else{
							commit.addProperty("successful", "NO");
							commit.addProperty("msg", "Commit: Step with identifier "+ identifier+  " has not  been  update on Elasticsearch");
							commitResult.add(commit);
						}
					}
					if(typeOfCommit.equals("removed")){
						if(elasticServices.deleteElementById("step", identifier)){
							commit.addProperty("successful", "YES");
							commit.addProperty("msg", "Commit: Step with identifier "+ identifier+ " has been successful removed from Elasticsearch");
							commitResult.add(commit);
						}
						else{
							commit.addProperty("successful", "NO");
							commit.addProperty("msg", "Commit: Step with identifier "+ identifier+  "  has not  been  update on Elasticsearch");
							commitResult.add(commit);
						}
					}
				break;
				case "standardsKB":
					elasticServices.deleteAllStandards();
					sskServices.loadStandards();
					commit.addProperty("msg", "Commit : Standards have been successful update into Elasticsearch");
					commitResult.add(commit);
				break;
				case "spec":
					sskServices.loadGlossaryTerms();
					commit.addProperty("msg", "Commit : Vocabularies have been successful update into Elasticsearch");
					commitResult.add(commit);
					break;
			}
		}
		return  commitResult;
	}
	
	private void setCommit(JsonObject commit, JsonArray commitResult, String identifier){
		commit.addProperty("successful", "NO");
		commit.addProperty("msg", "Scenario has not been add/update, it's not well formed!!!");
		commitResult.add(commit);
		updateCommitsResult(commitResult, identifier, SSKServices.stepsToIgnore, false);
		SSKServices.stepsToIgnore.clear();
	}
	
	
	private void updateCommitsResult(JsonArray commitsRes, String scenarioIdentifier, CopyOnWriteArrayList<String> steps, Boolean workWell){
		JsonObject commit = new JsonObject();
		String  msg = (workWell)? "":"not";
		for(String stepToIgnore: steps){
			commit.addProperty("type", "step");
			commit.addProperty("identifier", stepToIgnore);
			commit.addProperty("successful", (workWell)? "YES":"NO");
			commit.addProperty("msg", "Commit\" : Step with id "+ stepToIgnore+ " has " + msg +  " been  create/update on Elasticsearch for scenario " + scenarioIdentifier );
			commitsRes.add(commit);
		}
	}
	
	



}
