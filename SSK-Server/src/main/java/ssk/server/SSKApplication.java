package ssk.server;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;



@Configuration
@EnableAutoConfiguration
@SpringBootApplication
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
