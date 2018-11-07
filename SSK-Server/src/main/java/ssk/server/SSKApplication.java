package ssk.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import ssk.server.service.SSKServices;





@Configuration
@EnableAutoConfiguration
@ComponentScan
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
    
}
