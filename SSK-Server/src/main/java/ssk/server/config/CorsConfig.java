package ssk.server.config;

import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebMvc
public class CorsConfig  extends  WebMvcConfigurerAdapter{
	
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		//config.setAllowCredentials(true);
		config.addAllowedOrigin("https://ssk.parthenos-project.eu");
		config.addAllowedOrigin("https://ssk-application.parthenos.d4science.org");
		config.addAllowedOrigin("http://ssk.huma-num.fr");
		config.addAllowedOrigin("http://ssk.paris.inria.fr");
		config.addAllowedOrigin("http://localhost:4300");
		config.addAllowedOrigin("http://localhost:4200");
		config.addAllowedHeader("*");
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("HEAD");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("DELETE");
		config.addAllowedMethod("PATCH");
		List<String> rules = new ArrayList<String>();
		rules.add("Authorization");
		config.setExposedHeaders(rules);
		source.registerCorsConfiguration("/**", config);
		// return new CorsFilter(source);
		final CorsFilter bean = new CorsFilter(source);
		//bean.s
		return bean;
	}
	
	/*@Bean
	public WebMvcConfigurer mvcConfigurer() {
		return new WebMvcConfigurerAdapter() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("GET", "PUT", "POST", "GET", "OPTIONS")
						.allowedOrigins("https://ssk.parthenos-project.eu", "https://ssk-application.parthenos.d4science.org", "http://ssk.huma-num.fr");
			}
		};
	}*/
}
