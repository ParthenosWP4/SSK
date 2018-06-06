package ssk.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import ssk.server.service.SSKServices;





@Configuration
@EnableAutoConfiguration
@ComponentScan
public class SSKApplication
        //extends SpringBootServletInitializer
{
    
    /*@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SSKApplication.class);
    }*/
    
    public static void main(String[] args) throws Exception {
        SpringApplication.run(SSKApplication.class, args);
    }
    
}
