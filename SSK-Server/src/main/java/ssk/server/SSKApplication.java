package ssk.server;


import org.apache.commons.lang.StringEscapeUtils;
import org.elasticsearch.client.Client;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.elasticsearch.ElasticsearchException;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import ssk.server.service.ElasticServices;
import ssk.server.service.GithubApiService;
import ssk.server.service.SSKServices;

import java.io.*;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@SpringBootApplication
@ComponentScan("ssk.server")
public class SSKApplication
       implements CommandLineRunner
{

    @Autowired
    private ElasticsearchOperations es;
    @Autowired
    private ElasticServices elServices;

    @Autowired
    private SSKServices sskServices;

    @Autowired
    private GithubApiService githubApiService;

    @Value("${elasticsearch.index}")
    private String sskIndex;

    public static  final String [] mappings  = { "resource_metadata", "resource", "step_metadata", "scenario_metadata", "step" ,"scenario"};

    boolean firstLaunch = false;
    private static final Logger logger = LoggerFactory.getLogger(SSKApplication.class);

    
    
    

    public static void main(String args[]) {
        SpringApplication.run(SSKApplication.class, args);

    }

    //useful for debug, print elastic search details
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
                if(elServices.createMappings(mapping)) logger.info("Type '"+mapping+ "' successful updated ");

            } catch (ElasticsearchException e) {
               logger.error(e.getMessage());
               if(elServices.createMappings(mapping)) logger.info("Type '"+mapping+ "' successful created ");
            }
        }
        logger.info("--ElasticSearch--");
    }

    @Override
    public void run(String... args) throws Exception {
       printElasticSearchInfo();
       //sskServices.initializeData();
    }
    
    
    
}
