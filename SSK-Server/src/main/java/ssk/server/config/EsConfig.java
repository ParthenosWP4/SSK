package ssk.server.config;

/*import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;*/


import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;*/


/*@SuppressWarnings("ALL")
@Configuration*/
/*@SuppressWarnings("ALL")
@Configuration*/
@Configuration
public class EsConfig {
	
	@Value("${elasticsearch.host}")
	private String esHost;
	
	@Value("${elasticsearch.port}")
	private int esPort;
	
	@Value("${elasticsearch.clustername}")
	private String esClusterName;
	
	@Autowired
	private ConfigurableApplicationContext context;
	
	private static final Logger logger = LoggerFactory.getLogger(EsConfig.class);
	
	

    /*@Bean
    public TransportClient transportClient() throws  UnknownHostException {

        Settings esSettings = Settings.builder()
                .put("cluster.name", EsClusterName)
                .put("client.transport.sniff", true)
                .build();
				

        //https://www.elastic.co/guide/en/elasticsearch/guide/current/_transport_client_versus_node_client.html
	    try {
		    return new PreBuiltTransportClient(esSettings)
					.addTransportAddress(new TransportAddress(InetAddress.getByName(esHost), esPort));
	    /*}
	    catch (UnknownHostException e) {
		    logger.error("ElasticSearch is not running !!!");
		    return null;
	    }
    }*/
	
	/*@Bean
	public RestClient client() throws Exception {
		
		Settings esSettings = Settings.settingsBuilder()
				                      .put("cluster.name", esClusterName)
				                      .build();
		
		RestClient restClient = RestClient.builder(
				new HttpHost("localhost", 9200, "http")).build();
		
		//https://www.elastic.co/guide/en/elasticsearch/guide/current/_transport_client_versus_node_client.html
		return TransportClient.builder()
				       .settings(esSettings)
				       .build()
				       .addTransportAddress(
						       new InetSocketTransportAddress(InetAddress.getByName(esHost), esPort));
	}
	
	@Bean
	public ElasticsearchOperations elasticsearchTemplate() throws Exception {
		return new ElasticsearchTemplate(new RestHighLevelClient(
				                                                        RestClient.builder(new HttpHost(esHost))));
	}*/
	
	@Bean(destroyMethod = "close")
	public RestHighLevelClient client() {
		
		RestHighLevelClient restHighLevelClient = new RestHighLevelClient(RestClient.builder(new HttpHost(esHost, esPort)));
		
		
		return restHighLevelClient;
		
	}
	
	/*@Bean
	public ElasticsearchTemplate elasticsearchTemplate() throws UnknownHostException {
		Settings esSettings = Settings.builder()
				                      .put("cluster.name", esClusterName)
				                      .build();
		TransportClient client = new PreBuiltTransportClient(esSettings)
				                         .addTransportAddress(new TransportAddress(InetAddress.getByName(esHost), esPort));
		return new ElasticsearchTemplate(client);
	}*/

}










