package ssk.server.service;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
//import org.elasticsearch.ElasticsearchException;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
//import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
//import org.elasticsearch.client.Client;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileReader;
import java.net.ConnectException;
import java.util.Map;

@Component
public class InitData {
	
	private static final Logger logger = LoggerFactory.getLogger(InitData.class);
	
	/*@Autowired
	 private ElasticsearchOperations es;*/
	
	
	@Autowired
	private ElasticServices elServices;
	
	@Autowired
	private ElasticGetDataServices elasticGetDataServices;
	
	@Autowired
	private SSKServices sskServices;
	
	private RestTemplate restTemplate = new RestTemplate();
	
	private RequestHeadersParams requestHeadersParams;
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
	@Value("${elasticsearch_mappings}")
	private  String [] mappings;
	
	@Value("${elasticsearch.link}")
	private String elasticSearchPort;
	
	
	@Autowired
	private ConfigurableApplicationContext context;
	
	boolean firstLaunch = false;
	
	public InitData(RequestHeadersParams requestHeadersParams){
		this.requestHeadersParams = requestHeadersParams;
	}
	
	
	@PostConstruct
	public void init() {
		getElasticSearchHealthAndRunIt();
	}
	
	public boolean getElasticSearchHealthAndRunIt() {
		boolean result = true;
		new Thread(() -> {
			try {
				this.createIndex();
				 this.sskServices.initializeData();
			} catch (Exception e) {
				logger.error(e.getMessage());
				if(e.getMessage().contains("I/O error on HEAD request for \"" + elasticSearchPort+"/"+sskIndex+"\"")){
					logger.error("Elasticsearch is not running, Please contact server administrator!!!");
					int exitCode = SpringApplication.exit(context, new ExitCodeGenerator() {
						@Override
						public int getExitCode() {
							return 0;
						}
					} );
					System.exit(exitCode);
				}
			}
		}).start();
		return result;
	}
	
	
	
	private void createIndex() throws ConnectException {
		ResponseEntity<String> response;
		try {
			response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.HEAD,null,  String.class);
		} catch (HttpClientErrorException hre){
			logger.error(hre.getMessage());
			logger.error("Index doesn't exist !!! We have to create it");
			HttpEntity<String> entity  = new HttpEntity<>("{ \"settings\" : {\"number_of_shards\" : 2	}}", requestHeadersParams.getHeaders());
			response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.PUT,entity,  String.class);
			if(response.getStatusCode().is2xxSuccessful()) {
				logger.info("Successful creation of \"SSK\" index");
			}
		}
	}
}
