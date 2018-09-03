package ssk.server.service;

import com.google.gson.JsonArray;
import java.io.File;
import java.io.FileReader;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import javax.annotation.PostConstruct;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.client.Client;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

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
	private RequestHeadersParams requestHeadersParams;
	@Value("${elasticsearch.index}")
	private String sskIndex;
	@Value("${elasticsearch_mappings}")
	private String[] mappings;
	@Value("${elasticsearch.link}")
	private String elasticSearchPort;
	@Autowired
	private ConfigurableApplicationContext context;
	boolean firstLaunch = false;
	
	public InitData(RequestHeadersParams requestHeadersParams) {
		this.requestHeadersParams = requestHeadersParams;
	}
	
	@PostConstruct
	public void init() {
		this.getElasticSearchHealthAndRunIt();
	}
	
	private void printElasticSearchInfo() {
		logger.info("--ElasticSearch--");
		Client client = this.es.getClient();
		Map<String, String> asMap = client.settings().getAsMap();
		asMap.forEach((k, v) -> {
			logger.info(k + " = " + v);
		});
		if (!this.es.indexExists(this.sskIndex)) {
			logger.info("index :" + this.es.createIndex(this.sskIndex));
			this.firstLaunch = true;
		}
		
		String[] var6 = this.mappings;
		int var5 = this.mappings.length;
		
		for(int var4 = 0; var4 < var5; ++var4) {
			String mapping = var6[var4];
			
			try {
				if (this.elServices.createMappings(mapping)) {
					logger.info("Type '" + mapping + "' successful updated in mapping");
				}
			} catch (ElasticsearchException var8) {
				logger.error(var8.getMessage());
				if (this.elServices.createMappings(mapping)) {
					logger.info("Type '" + mapping + "' successful created in mapping");
				}
			}
		}
		
		logger.info("--ElasticSearch--");
	}
	
	public boolean getElasticSearchHealthAndRunIt() {
		boolean result = true;
		
		try {
			this.restTemplate.delete(this.elServices.getElasticSearchPort() + "ssk", new Object[0]);
			this.printElasticSearchInfo();
			(new Thread(() -> {
				try {
					this.loadStandards();
					this.sskServices.initializeData();
				} catch (Exception var2) {
					logger.error(var2.getMessage());
				}
				
			})).start();
		} catch (Exception var5) {
			logger.error(var5.getMessage());
			if (var5.getMessage().contains("404")) {
				this.printElasticSearchInfo();
			} else {
				logger.error("ElasticSearch is not running !!!");
				int exitCode = SpringApplication.exit(this.context, new ExitCodeGenerator[]{new ExitCodeGenerator() {
					public int getExitCode() {
						return 0;
					}
				}});
				System.exit(exitCode);
			}
		}
		
		return result;
	}
	
	private void loadStandards() {
		logger.info("ici on entre");
		File standard = this.sskServices.getFile("./standards.json");
		
		try {
			HttpEntity[] entity = new HttpEntity[1];
			JsonArray jsonStandards = this.sskServices.getParser().parse(new FileReader(standard)).getAsJsonArray();
			jsonStandards.forEach((standardItem) -> {
				entity[0] = new HttpEntity(standardItem.toString(), this.requestHeadersParams.getHeaders());
				ResponseEntity<String> response = this.restTemplate.exchange(this.elasticSearchPort + "/" + this.sskIndex + "/standard", HttpMethod.POST, entity[0], String.class, new Object[0]);
				JSONObject responseBody = new JSONObject((String)response.getBody());
				if (Boolean.parseBoolean(responseBody.get("created").toString())) {
					logger.info("Successful pushed of " + standardItem.getAsJsonObject().get("standard_abbr_name").toString() + " Standard");
				} else {
					logger.error("Standard" + standardItem.getAsJsonObject().get("standard_abbr_name").toString() + "have not been pushed to Elasticsearch");
				}
				
			});
		} catch (Exception var4) {
			logger.error(var4.getMessage());
			logger.error("Error when load standards");
		}
		
	}
}