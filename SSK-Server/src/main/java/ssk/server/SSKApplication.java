package ssk.server;

/**
 * = Application
 *
 * Project version: {projectVersion}.
 *
 * Sample Java application in project {projectName}
 * to show Asciidoclet as replacement for the
 * default Javadoclet.
 *
 * We can apply Asciidoc syntax in our Javadoclet
 * comments, like:
 *
 *  - `code`
 *  - **bold**
 *  - _italics_
 *
 * include::./src/main/javadoc/usage.adoc[]
 *
 * [plantuml]
 * ....
 * hide footbox
 *
 * actor Client
 * Client -> Application : main()
 * ....
 *
 * @author mrhaki
 * @version 1.0
 */


import org.apache.commons.lang.StringEscapeUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.Banner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.elasticsearch.ElasticsearchException;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import ssk.server.service.ElasticServices;
import ssk.server.service.GithubApiService;
import ssk.server.service.SSKServices;

import java.awt.*;
import java.io.*;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@SpringBootApplication
@ComponentScan
public class SSKApplication
       // extends SpringBootServletInitializer
       // implements CommandLineRunner
{
        @Autowired
        SSKServices sskServices;
    
    private static final Logger logger = LoggerFactory.getLogger(SSKApplication.class);
    
    
    /*@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return configureApplication(builder);
    }*/
    
   
    
    private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
        return builder.sources(SSKApplication.class).bannerMode(Banner.Mode.OFF);
    }
    
    public static void main(String args[]) {
        SpringApplication.run(SSKApplication.class, args);
        
        
    }
    
    public Boolean  runElasticSearch(){
       
        File command = sskServices.getFile("/elasticsearch-2.4.0/bin/elasticsearch.bat");
        boolean result = false;
        if(command != null){
            ProcessBuilder processBuilder = new ProcessBuilder(command.getPath());
            
            try {
                Process process = processBuilder.start();
                BufferedReader reader  =  new BufferedReader(new InputStreamReader(process.getInputStream()));
                StringBuilder output = new StringBuilder();
                String line = "";
                while ((line = reader.readLine())!= null) {
                    output.append(line + "\n");
                }
                logger.info(output.toString());
                result = true;
            } catch (IOException e) {
                logger.error(e.getMessage());
                System.out.println(e.getMessage());
                result = Boolean.parseBoolean(null);
            }
        }
        return result;
    }
   
    
    
    
}
