package ssk.server.service;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.dom4j.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import java.io.StringReader;
import java.util.List;


@Service
public class SskTEIHandler  {
	
	@Autowired
	private GithubApiService githubApiService;
	
	@Autowired
	private SskAPIService sskAPIService;
	
	private static final Logger logger = LoggerFactory.getLogger(SskTEIHandler.class.getName());
	
	
	public void setScenarioOrStepAuthors(String scenarioOrStep, String authorsPath){
		List<Node> authors = queryContent(scenarioOrStep, authorsPath);
		synchronized (this){
			if(authors != null && authors.size() > 0){
				for(Node author: authors ){
					for(Object authorChild:   ((Element)author).elements()){
						logger.info(((Element)authorChild).getName());
						logger.info(((Element)authorChild).getText());
					}
				}
			}
		}
		
	}
	
	private synchronized List<Node> queryContent(String content, String authorsPath ){
		Document doc = null;
		try {
			doc = sskAPIService.reader.read(new StringReader(content));
			XPath xpathSelector = sskAPIService.createXPath(authorsPath);
			return xpathSelector.selectNodes(doc);
		} catch (DocumentException e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	public JsonArray setScenarioDesc(String scenarioContent, String descPath){
		JsonElement jsonDesc = new JsonArray(), descItem = new JsonObject();
		List<Node> descTab = queryContent(scenarioContent, descPath);
		synchronized (this){
			if(descTab != null && descTab.size() > 0){
				for(Node desc: descTab ){
					if (desc.valueOf("@xml:lang") != null)
					descItem.getAsJsonObject().addProperty("lang",desc.valueOf("@xml:lang"));
					String content = desc.asXML().replaceAll("^(<desc).*?(>)", "").replace("</desc>", "").trim();
					descItem.getAsJsonObject().addProperty("content", normalizeDesc(content));
					jsonDesc.getAsJsonArray().add(descItem);
				}
			}
		}
		return jsonDesc.getAsJsonArray();
	}
	
	private String normalizeDesc(String desc){
		desc = desc.replaceAll("<list", "<ul") //replacement of <list> by <ul >
					.replaceAll("</list","</ul") //replacement of </list> by </ul >
					.replaceAll("type=\"listElt\"", "") //removing type="listElt" from item element
					.replaceAll("<item", "<li")
			        .replaceAll("</item","</li")
		            .replaceAll("target=","href=")
			        .replaceAll("type=\"linkDesc\"", "")
			        .replaceAll("<ref","<a target=\"_blank\"")
			        .replaceAll("</ref","</a")
				     //  .replaceAll("\"","\\\\\"")
			        .replaceAll("\\s+"," ");
		
		return desc;
	}
}
