package ssk.server.service;


import org.elasticsearch.ElasticsearchException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.elasticsearch.client.Client;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.Map;

@Component
public class InitData {
	
	private static final Logger logger = LoggerFactory.getLogger(InitData.class);
	
	@Autowired
	 private ElasticsearchOperations es;
	
	
	@Autowired
	private ElasticServices elServices;
	
	@Autowired
	private SSKServices sskServices;
	
	
	private RestTemplate restTemplate = new RestTemplate();
	
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
	@Autowired
	private ConfigurableApplicationContext context;
	
	
	
	
	public static  final String [] mappings  = { "resource_metadata", "resource", "step_metadata", "scenario_metadata", "step" ,"scenario", "glossary"};
	
	boolean firstLaunch = false;
	
	@PostConstruct
	public void init() {
		//builder = RestClient.builder(new HttpHost(elasticSearchHost,Integer.valueOf(elasticSearchPort), "http"));
		//client = new RestHighLevelClient(builder);
			getElasticSearchHealthAndRunIt();
		
	}
	
	
	
	
	private void printElasticSearchInfo() {
		logger.info("--ElasticSearch--");
		Client client = es.getClient();
		Map<String, String> asMap = client.settings().getAsMap();
		asMap.forEach((k, v) -> {
			logger.info(k + " = " + v);
		});
		if(!es.indexExists(sskIndex)){
			logger.info("index :" + es.createIndex(sskIndex));
			firstLaunch = true;
		}
		for (String mapping : mappings ) {
			try {
				//Map existsMappings = es.getMapping(sskIndex, mapping);
				if(elServices.createMappings(mapping)) logger.info("Type '"+mapping+ "' successful updated in mapping");
				
			} catch (ElasticsearchException e) {
				logger.error(e.getMessage());
				if(elServices.createMappings(mapping)) logger.info("Type '"+mapping+ "' successful created in mapping");
			}
		}
		logger.info("--ElasticSearch--");
	}
	
	
	public boolean getElasticSearchHealthAndRunIt() {
		HttpStatus status;
		boolean result = true;
		try {
			this.restTemplate.delete(this.elServices.getElasticSearchPort() + "ssk");
			printElasticSearchInfo();
			this.sskServices.initializeData();
		}
		catch (Exception e){
			logger.error(e.getMessage());
			if(e.getMessage().contains("404")){
				printElasticSearchInfo();
			}
			else{
				logger.error("ElasticSearch is not running !!!");
				int exitCode = SpringApplication.exit(context, new ExitCodeGenerator() {
					@Override
					public int getExitCode() {
						return 0;
					}
				} );
				context.refresh();
				System.exit(exitCode);
			}
		}
		return result;
	}
	
	
	 /*
	    useful for debug, print elastic search details : Elasticsearch 6.2.4
    private void printElasticSearchInfo() throws IOException {
        logger.info("--ElasticSearch--");
        
	    MainResponse response = this.client.info(new BasicHeader(HTTP.CONTENT_TYPE, ContentType.APPLICATION_JSON.toString()));
	    logger.info("Cluster Name: " + response.getClusterName().value());
	    logger.info("Cluster Uuid: " + response.getClusterUuid());
	    logger.info("Node Name: " + response.getNodeName());
	    logger.info("Build : " + response.getBuild().toString());
	
	    logger.warn(String.valueOf(this.client.exists(new GetRequest().index(sskIndex).id("1"))));
	    if(!this.client.exists(new GetRequest().index(sskIndex))){
		    //CreateIndexRequest request; = new CreateIndexRequest(sskIndex);
		    //logger.info("index :" + this.client.indices().create(new CreateIndexRequest( sskIndex)));
		    firstLaunch = true;
		    
	    }
        logger.info("--ElasticSearch--");
    }
	public boolean getElasticSearchHealthAndRunIt() {
		HttpStatus status;
		boolean result = true;
		try {
			if(this.client.ping( new BasicHeader(HTTP.CONTENT_TYPE, ContentType.APPLICATION_JSON.toString())) &&
					   this.client.exists(new GetRequest(sskIndex).id("1"))){
				this.client.indices().delete(new DeleteIndexRequest("ssk"));
			}
			printElasticSearchInfo();
			
		} catch (IOException e) {
			logger.error("ElasticSearch is not running !!!");
			int exitCode = SpringApplication.exit(context, new ExitCodeGenerator() {
				@Override
				public int getExitCode() {
					return 0;
				}
			});
			System.exit(exitCode);
		}
		return result;
	}*/
}
