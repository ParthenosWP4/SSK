package ssk.server.service;


import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class SSKUserService {
	
	@Autowired
	SSKServices sskServices;
	
	@Autowired
	RequestHeadersParams requestHeadersParams;
	
	@Autowired
	ElasticGetDataServices elasticGetDataServices;
	private HttpEntity<String> entity;
	private static final Logger logger = LoggerFactory.getLogger(SSKUserService.class.getName());
	private RestTemplate restTemplate = new RestTemplate();
	
	@Value("${elasticsearch.host}")
	private String host;
	
	@Value("${elasticsearch.link}")
	private String elasticSearchPort;
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
	public String addUser(String userJson, boolean update){
		JsonObject user; String email, result=null;
		try{
			user = sskServices.getParser().parse(userJson).getAsJsonObject();
			email = user.get("email").getAsString();
			 user = elasticGetDataServices.getDocumentById(email);
			 if(user != null && !update) {
				return "exist";
			 } else {
				 user = sskServices.getParser().parse(userJson).getAsJsonObject();
				 user.addProperty("type", "user");
				 JsonObject toSend = new JsonObject();
				 toSend.add("doc", user);
				 toSend.addProperty("doc_as_upsert", true);
				 toSend.addProperty("detect_noop",  false);
				 entity = requestHeadersParams.addContentToHeader(toSend);
				 ResponseEntity<String> response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex + "/_doc/" + email +"/_update" , HttpMethod.POST, entity, String.class);
				 if (response.getStatusCode().is2xxSuccessful()) {
					 logger.info("Client  with _id/email " + email + "has been successful created/update");
					 result =  email;
				 }
			 }
			}
			catch(HttpClientErrorException ex) {
				logger.error(ex.getClass().getCanonicalName() + " - " + ex.getMessage());
				logger.error("Error when created User  - Elasticsearch Problem");
			}
			catch (Exception excep){
				logger.error(excep.getClass().getCanonicalName() + " - " + excep.getMessage());
			}
		return result;
	}
}
