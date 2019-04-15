package ssk.server.service;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.dom4j.*;
import org.dom4j.dom.DOMDocument;
import org.dom4j.tree.DefaultElement;
import org.jaxen.NamespaceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.StringReader;
import java.util.*;

import org.dom4j.io.SAXReader;
import org.springframework.web.client.HttpClientErrorException;
import org.xml.sax.helpers.AttributesImpl;

@Service
public class SskAPIService {
	
		@Autowired
		private GithubApiService githubApiService;
		
		@Autowired
		private SSKServices sskServices;
		
		@Value("${stepsPath}")
		private String stepsPath;
	
		@Value("${sskZoteroGroupID}")
		private String sskZoteroGroupID;
		
		Document doc;
		SAXReader reader ;
		Map uris ;
		HashMap<String, List<String>> termsAndRefs;
	    Element note ;
	
	
	private static final Logger logger = LoggerFactory.getLogger(SskAPIService.class.getName());
 
  
	  public SskAPIService() {
		  uris = new HashMap();
		  uris.put("tei", "http://www.tei-c.org/ns/1.0");
		  termsAndRefs = new HashMap<>();
		  reader = new SAXReader();
		  note = DocumentHelper.createElement("note");
		  note.addAttribute("type", 		  "abstract");
	  }
	
	
	
	
	public String createAPIResult(String scenarioIds, String type, String format){
		String apiContent = "";
		
		if(format == null || format =="tei"){
			apiContent = generateTEIContent(type, scenarioIds );
		}
		else {
			//Request for Json Content
		}
		
		return apiContent;
	}
	
	
	private String generateTEIContent(String type, String scenarioIds ){
		String scenarioContent = "", result ="";
		for(String  scenarioId: scenarioIds.split(",")){
			scenarioContent = this.githubApiService.getGithubFileContent(type, scenarioId +".xml");
			if(scenarioContent.contains("encodingDesc"))
				scenarioContent = sskServices.removeEltFromXML("encodingDesc", scenarioContent);
			//sskServices.convertStringToFile(scenarioContent, scenarioId+ ".xml");
			try {
				doc = reader.read(new StringReader(scenarioContent));
				XPath xpathSelector = createXPath("//tei:event");
				List<Node> nodes = xpathSelector.selectNodes(doc);
				for (Node node : nodes) {
					if(node.valueOf("@subtype").equals("preliminary") || node.valueOf("@subtype").equals("followUp")){ // Scenario in step's list
						buildScenarioForApi((Element)node, node.valueOf("@ref"), true);
					}
					else {
						buildStepForApi(( Element)node, node.valueOf("@ref"));
					}
					
				}
				scenarioContent = doc.asXML().replaceAll("xmlns=\"\"", "");
			} catch (DocumentException e) {
				e.printStackTrace();
				scenarioContent += null;
			}
			result +=scenarioContent;
		}
		 return result;
	}
	
	
	
	
	private void buildStepForApi(Element eventNode, String stepReference){
		String stepContent = githubApiService.getGithubFileContent("steps", stepReference + ".xml");
		Element eltToAdd, element;
		initTermAndRefsValues();
		if(eventNode.valueOf("@mode").equals("change")){
			initTermsAndRefs( eventNode, stepContent);
		}
		try {
			Document document = DocumentHelper.parseText(stepContent).getDocument();
			element = DocumentHelper.createElement("biblFull");
			XPath xpath = createXPath("//tei:fileDesc");
			eltToAdd = ( Element) xpath.selectNodes(document).get(0);
			addElementContent(element, eltToAdd, new String[]{""}); // Adding fileDesc content to biblFull
			eventNode.add(element);
			
			xpath = createXPath("//tei:event");
			element = (Element) xpath.selectSingleNode(document);
			
			xpath = createXPath("//tei:desc[@type='terms']");
			List<Node> terms = xpath.selectNodes(document);
			
			addElementContent(eventNode, element, new String[]{"linkGrp"});
			
			xpath = createXPath("//tei:linkGrp");
			List<Node> resources = xpath.selectNodes(document);
			for (Node node : resources) {
				//if(node.valueOf("@type").equals("generalResources")){
					handleGeneralResources((Element)node, eventNode);
					node.detach();
					eventNode.add(node);
				/*}
				else {
				}*/
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
	
	private void initTermsAndRefs(Element eventNode, String stepContent) {
		
		XPath xpath = createXPath("//tei:desc[@type='terms']");
		List<Node> terms  = xpath.selectNodes(eventNode);
		for (Node desc : terms) {
			xpath = createXPath("//tei:term");
			List<Node> termsDesc = xpath.selectNodes(desc);
			for (Node term : termsDesc) {
				if(term.valueOf("@mode").equals("add")){
					termsAndRefs.get("termsToAdd").add(term.asXML());
				}
				else {
					termsAndRefs.get("termsToDelete").add(term.valueOf("@key"));
				}
			}
			desc.detach();
		}
		xpath = createXPath("//tei:linkGrp[@type='generalResources']");
		terms  =  xpath.selectNodes(eventNode);
		for (Node group : terms) {
			
			xpath = createXPath("//tei:ref");
			List<Node> refs = xpath.selectNodes(group.getDocument().getRootElement());
			for (Node ref : refs) {
					if(ref.valueOf("@mode").equals("add")){
						termsAndRefs.get("generalRefToAdd").add(ref.asXML());
					}
					else {
						termsAndRefs.get("generalRefToDelete").add(ref.valueOf("@target"));
					}
			}
			group.detach();
		}
		
		
		xpath = createXPath("//tei:linkGrp[@type='projectResources']");
		terms  =  xpath.selectNodes(eventNode);
		for (Node group : terms) {
			xpath = createXPath("//tei:ref");
			List<Node> refs = xpath.selectNodes(group);
			for (Node ref : refs) {
				if(ref.valueOf("@mode").equals("add")){
					termsAndRefs.get("projectRefToAdd").add(ref.asXML());
				}
				else {
					termsAndRefs.get("projectRefToDelete").add(ref.valueOf("@target"));
				}
			}
			group.detach();
		}
	}
	
	private void handleGeneralResources(Element resource, Node currentStep) {
		
		XPath xpathRef = createXPath("//tei:ref");
		
		List<Node> resourceRefs = xpathRef.selectNodes(resource), terms;
		Element biblStruct, biblStructContent;
		//String biblStructContent;
		List<String> toAvoidDuplicateReferences = new ArrayList<>();
		for (Node ref : resourceRefs) {
			if(ref.valueOf("@source").equals("zotero") &&  ref.valueOf("@target") != null){
				if(termsAndRefs.get("generalRefToDelete").toString().contains(ref.valueOf("@target"))){
					ref.detach();
				}
				else{
					biblStructContent = getZoteroBiblStruct(ref.valueOf("@target"), resource.valueOf("@xml:base"));
					if(biblStructContent != null){
						//biblStruct = reader.read(new StringReader(biblStructContent)).getRootElement();
						ref.detach();
						((Element) ref).add((Element) biblStructContent.clone());
						resource.add(ref);
						toAvoidDuplicateReferences.add(ref.valueOf("@target"));
					}
				}
			}
			else {
			
			}
			
		}
		// Adding new resources  from termsAndRefs
		Element refNode;
		for(String ref: termsAndRefs.get("generalRefToAdd")){
			try {
				 refNode = reader.read(new StringReader(ref)).getRootElement();
				if(!Arrays.asList( toAvoidDuplicateReferences ).contains(refNode.valueOf("@target"))){
					biblStructContent = getZoteroBiblStruct(refNode.valueOf("@target"), null);
					if(biblStructContent != null){
						//biblStruct = reader.read(new StringReader(biblStructContent)).getRootElement();
						refNode.add((Element) biblStructContent.clone());
						resource.add(refNode);
						refNode.detach();
					}
				}
			} catch (DocumentException e) {
				e.printStackTrace();
			}
		}
	}
	
	private void buildScenarioForApi(Element eventNode, String stepReference, boolean inStepsList){
		String scenarioContent = githubApiService.getGithubFileContent("scenarios", stepReference + ".xml");
		try {
			Document document = DocumentHelper.parseText(scenarioContent).getDocument();
			if(inStepsList){
				Element element = DocumentHelper.createElement("biblFull");
				//Query titleStmt
				XPath xpath = createXPath("//tei:titleStmt");
				Element eltToAdd = ( Element) xpath.selectNodes(document).get(0); //eltToAdd is titleStmt
				eltToAdd.detach();
				element.add(eltToAdd); // Here we add titleStmt to biblFull
				
				xpath = createXPath("//tei:publicationStmt");
				eltToAdd = ( Element) xpath.selectNodes(document).get(0);
				eltToAdd.detach();
				element.add(eltToAdd); // Here we add publicationStmt to biblFull
				
				eventNode.add(element); // Adding biblFull to event
				
				xpath = createXPath("//tei:div");
				element = (Element) xpath.selectSingleNode(document);
				addElementContent(eventNode, element, new String[]{"listEvent"});
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
	
	private  void addElementContent(Element addIn, Element toAdd, String [] ignoredElement) {
		for (Iterator<DefaultElement> i = toAdd.elementIterator(); i.hasNext();) {
			DefaultElement e = i.next();
			if((ignoredElement.length > 0) && Arrays.asList( ignoredElement ).contains(e.getName()))
				continue;
			else{
				e.setNamespace(Namespace.NO_NAMESPACE);
				e.detach();
				addIn.add(e);
			}
		}
	}
	
	private Element getZoteroBiblStruct(String resourceID, String groupId){
			String biblStruct= null;
			Document biblStructDoc;
		String urlAddOn;
		if (resourceID.contains("zotero.org")) {
			urlAddOn = resourceID.split("zotero.org/")[1];
			String [] terms = urlAddOn.split("/");
			resourceID = terms[terms.length -1];
		} else {
			if (resourceID.contains(":")) {
				urlAddOn = sskServices.getPlatforms().get(resourceID.split(":")[0]) + "/items/" + resourceID.split(":")[1];
			} else if (groupId != null && groupId != ""){
				groupId = "groups/" + groupId.split("groups/")[1].split("/")[0];
				urlAddOn = groupId + "/items/" + resourceID;
			}
			else {
				urlAddOn = sskZoteroGroupID+ "/items/" + resourceID;
			}
		}
		try{
			ResponseEntity<String> response = sskServices.getRestTemplate().getForEntity(sskServices.getZoteroApihUrl() + urlAddOn + "?include=data,tei", String.class);
			JsonObject data = sskServices.getParser().parse(response.getBody()).getAsJsonObject();
			if(data.has("tei")){
				biblStruct = data.get("tei").getAsString();
				biblStruct = biblStruct.replaceAll("\\\"", "\"" )
						             .replaceAll("^(\\<\\?xml).*?\\?\\>", "")
						             .replaceAll("(?s)(\\<listBibl).*?\\>", "")
						             .replaceAll("(?s)xmlns:ns1=\".*?(\")", "")
						             .replaceAll("(?s) ns1:id=\".*?(\")", "")
						             .replaceAll("\\<\\/listBibl\\>", "")
						             .replaceAll("\\\n", "");
				
			}
			biblStructDoc = reader.read(new StringReader(biblStruct));
			String abstractNote = getAbstratFromZotero(data);
			if(abstractNote != null &&  !abstractNote.equals("") ){
				note.setText(abstractNote);
				XPath notesQuery = DocumentHelper.createXPath("//imprint");
				List<Node> notes = notesQuery.selectNodes(biblStructDoc.getRootElement());
				if(notes.size() >0){
					((Element)notes.get(notes.size() -1)).add((Element)note.clone());
					//note.detach();
				}
			}
			
		}
		catch(  Exception exc ){
			exc.printStackTrace();
			logger.error(exc.getClass().getCanonicalName() + " - " + exc.getMessage()+ " Error when retrieving BiblStruct's resource from zotero with id "+ resourceID);
			return null;
		}
		return biblStructDoc.getRootElement();
	}
	
	public synchronized  XPath createXPath(String path){
		XPath xpath = DocumentHelper.createXPath(path);
		xpath.setNamespaceURIs(uris);
		return xpath;
	}
	
	private void initTermAndRefsValues(){
		termsAndRefs.put("termsToAdd", new ArrayList<>());
		termsAndRefs.put("termsToDelete", new ArrayList<>());
		termsAndRefs.put("generalRefToAdd", new ArrayList<>());
		termsAndRefs.put("generalRefToDelete", new ArrayList<>());
		termsAndRefs.put("projectRefToAdd", new ArrayList<>());
		termsAndRefs.put("projectRefToDelete", new ArrayList<>());
	}
	
	private String getAbstratFromZotero (JsonObject zoteroResult){
		if(zoteroResult.has("data") && zoteroResult.get("data").getAsJsonObject().has("abstractNote"))
			return zoteroResult.get("data").getAsJsonObject().get("abstractNote").getAsString();
		else  return null;
	}
}
