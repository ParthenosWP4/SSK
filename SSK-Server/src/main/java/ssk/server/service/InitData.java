package ssk.server.service;


import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.elasticsearch.ElasticsearchException;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.elasticsearch.client.Client;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import ssk.server.SSKApplication;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ConnectException;
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
	
	@Autowired
	private GithubApiService githubApiService;
	
	private RestTemplate restTemplate = new RestTemplate();
	
	@Value("${elasticsearch.port2}")
	private String elasticSearchPort;
	
	@Value("${elasticsearch.index}")
	private String sskIndex;
	
	@Autowired
	private ConfigurableApplicationContext context;
	
	
	
	public static  final String [] mappings  = { "resource_metadata", "resource", "step_metadata", "scenario_metadata", "step" ,"scenario"};
	
	boolean firstLaunch = false;
	
	@PostConstruct
	public void init() {
		
			getElasticSearchHealthAndRunIt();
		
	}
	
	
	 /*useful for debug, print elastic search details*/
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
                Map existsMappings = es.getMapping("ssk", mapping);
                if(elServices.createMappings(mapping)) logger.info("Type '"+mapping+ "' successful updated in mapping");

            } catch (ElasticsearchException e) {
               logger.error(e.getMessage());
               if(elServices.createMappings(mapping)) logger.info("Type '"+mapping+ "' successful created in mapping");
            }
        }
        logger.info("--ElasticSearch--");
    }

  
	
	
	public Boolean  runElasticSearch(){
		File command = sskServices.getFile("/elasticsearch-2.4.0/bin/elasticsearch-service-mgr.exe");
		boolean result = false;
		if(command != null){
			// = Runtime.getRuntime();
			try {
				Runtime rt  = Runtime.getRuntime();
				//.exec("/bin/bash /tmp/test.sh").getInputStream();
				//Process pr = rt.exec(new String[]{"/bin/bash", command.getPath()});
				Process pr = rt.exec(new String[]{"/bin/bash", command.getPath()});
				//Process pr = new ProcessBuilder(new String[]{"sh", "-c", command.getPath()}).start();
				pr.waitFor();
				System.out.println("Script executed successfully");
				BufferedReader reader  =  new BufferedReader(new InputStreamReader(pr.getInputStream()));
				StringBuilder output = new StringBuilder();
				String line = "";
				while ((line = reader.readLine())!= null) {
					output.append(line + "\n");
				}
				logger.info(output.toString());
				result = true;
			} catch (Exception e) {
				logger.error(e.getMessage());
				System.out.println(e.getMessage());
				result = Boolean.parseBoolean(null);
			}
		}
		return result;
	}
	
	public boolean getElasticSearchHealthAndRunIt() {
		HttpStatus status;
		boolean result = true;
		try {
			this.restTemplate.delete(elasticSearchPort + "ssk");
			printElasticSearchInfo();
			this.sskServices.initializeData();
		}
		catch (Exception e){
			//logger.error(e.getMessage());
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
	}

	
	
	
}
