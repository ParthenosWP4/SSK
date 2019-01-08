package ssk.server.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import java.io.IOException;


@Service
public class CommitsHandleService {
	
	private static final Logger logger = LoggerFactory.getLogger(CommitsHandleService.class);
	
	@Autowired
	private GithubApiService githubApiService;
	
	@Autowired
	private SSKServices sskServices;
	
	
	
	
	public void webhooksHandle(JsonArray commits) {
		logger.info(commits.toString());
		commits.forEach(commit -> {
			JsonObject jsonCommit = commit.getAsJsonObject();
			try{
				modifiedCommitsHandle(jsonCommit.getAsJsonArray("modified"));
				Thread t = new Thread(new Runnable() {
					@Override
					public void run() {
						//ch
					}
				});
				t.start();
				JsonArray addedFiles = jsonCommit.getAsJsonArray("added");
			}catch (Exception e) {
				e.printStackTrace();
				logger.error("Could not get objet with \'modified\' as key ");
			}
		});
	}
	
	
	
	
	/**
	 * <p>
	 *     Handles modified Commits
	 * </p>
	 * @param modifiedFiles A JsonArray of all files that have been modified on Github
	 */
	private void  modifiedCommitsHandle(JsonArray modifiedFiles){
		modifiedFiles.forEach(modified -> {
			String type = "";
			String[] types = modified.getAsString().split("/");
			if(types.length == 3){
				type =  types[1];
			} else if(types.length == 2){
				type =  types[0];
			}
			String xmlContent = this.githubApiService.getGithubFileContent(type, types[type.length()-1]);
			if(xmlContent == null){
				return;
			} else {
				switch (type) {
					case "scenarios":
						try {
							if (sskServices.checkIfScenarioIsComplete(xmlContent)) {
							
							} else {
								return;
							}
						} catch (IOException | SAXException | XPathExpressionException | ParserConfigurationException e) {
							e.printStackTrace();
							
						}
						break;
					case "steps":
						
						break;
					default:
						
						break;
				}
			}
		});
	}



}
