package ssk.server;


import lombok.Builder;
import org.h2.tools.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@Configuration
@EnableAutoConfiguration
@SpringBootApplication (exclude = {SecurityAutoConfiguration.class })
@Builder
public class SSKApplication
         extends SpringBootServletInitializer
{
  
 @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
       setRegisterErrorPageFilter(false);
        return application.sources(SSKApplication.class);
    }
    
    public static void main(String[] args) throws Exception {
        SpringApplication.run(SSKApplication.class, args);
    }
    
   /* @Bean
    org.h2.tools.Server h2Server() {
        Server server = new Server();
        try {
            server.runTool("-tcp");
            server.runTool("-tcpAllowOthers");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return server;
        
    }*/
    
    
}
