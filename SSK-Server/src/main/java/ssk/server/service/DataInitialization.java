package ssk.server.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.admin.indices.get.GetIndexRequest;
import org.elasticsearch.action.admin.indices.get.GetIndexResponse;
import org.elasticsearch.action.admin.indices.open.OpenIndexRequest;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.xcontent.XContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ConnectException;
import java.util.List;
import java.util.stream.Collectors;

//import org.elasticsearch.ElasticsearchException;
//import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
//import org.elasticsearch.client.Client;

@Component
@Slf4j
public class DataInitialization {
	
	private static final Logger logger = LoggerFactory.getLogger(DataInitialization.class);
	
	
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
	
	private RestHighLevelClient client;
	
	public DataInitialization(RequestHeadersParams requestHeadersParams){
		this.requestHeadersParams = requestHeadersParams;
	}
	
	@Autowired
	public DataInitialization(RestHighLevelClient client) {
		this.client = client;
	}
	
	
	@PostConstruct
	public void init() {
		getElasticSearchHealthAndRunIt();
	}
	
	
	/**
	 * <p>
	 *     This function is the entry point of the SSK.
	 *     It tries to create the index into Elasticsearch that the application will needs to store contents converted from TEI to JSON
	 * </p>
	 * @return boolean
	 */
	
	public boolean getElasticSearchHealthAndRunIt() {
		boolean result = true;
		new Thread(() -> {
			try {
				//this.createIndex();
				//this.sskServices.initializeData();
			} catch (Exception e) {
				e.printStackTrace();
				if(e.getMessage().contains("I/O error on HEAD request for \"" + elasticSearchPort + "/" +sskIndex + "\"")){
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
	
	/**
	 * <P>
	 *
	 *     "step_tokenizing",
	 "step_posTagging",
	 "step_lemmatizing",
	 "step_stemming",
	 "step_ner",
	 "step_manualAnnotation",
	 "step_nlpPipeline"
	 *     This function is in charged of creating the index (ssk) into elasticsearch when launching the Application for the first time
	 * </P>
	 * @throws ConnectException
	 */
	
	
	private void createIndex() throws ConnectException {
		
		
		ResponseEntity<String> response;
		try {
			response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.HEAD,null,  String.class);
			logger.info((response.toString()));
			this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.DELETE, null,  String.class);
		} catch (HttpClientErrorException hre){
			logger.error(hre.getMessage());
			logger.error("Index doesn't exist !!! We have to create it");
		}
		
		HttpEntity<String> entity  = new HttpEntity<>("{ \"settings\" : {\"number_of_shards\" : 2	}}", requestHeadersParams.getHeaders());
		response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.PUT,null,  String.class);
		if(response.getStatusCode().is2xxSuccessful()) {
			logger.info("Successful creation of \"SSK\" index");
		}
		
		try {
		
		InputStream inputStream = client.getLowLevelClient()
				                          .performRequest("GET", "/_cat/indices?h=i")
				                          .getEntity()
				                          .getContent();
		
		List<String> indexes = new BufferedReader(new InputStreamReader(inputStream))
				                       .lines()
				                       .collect(Collectors.toList());
			logger.info(indexes.toString());
		if(!indexes.contains("ssk")){
			CreateIndexRequest request = new CreateIndexRequest("ssk");
			request.settings(Settings.builder()
					                 .put("index.number_of_shards", 3)
					                 .put("index.number_of_replicas", 2)
			);
			request.mapping("_doc",
					"{}",
					XContentType.JSON);
			CreateIndexResponse createIndexResponse = client.indices().create(request);
			logger.info(createIndexResponse.toString());
		}
		
		
		}
		catch(IOException exc){
			logger.info(exc.toString());
		}
		
	}
	
	private void setElasticForResearch(){
		ResponseEntity<String> response;
		HttpEntity<String> entity  = new HttpEntity<>(" {\"index\": {\"blocks\": {\"read_only_allow_delete\": \"false\"}}}", requestHeadersParams.getHeaders());
		response = this.restTemplate.exchange(elasticSearchPort + "/" + sskIndex , HttpMethod.PUT,entity,  String.class);
		if(response.getStatusCode().is2xxSuccessful()) {
			logger.info("Successful set Elasticsearch for research !!!");
		}else{
			logger.info("Error");
		}
	}
}
