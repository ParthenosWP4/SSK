package ssk.server.config;

import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.adapters.springsecurity.KeycloakSecurityComponents;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.preauth.x509.X509AuthenticationFilter;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Configuration
public class KeycloakConfig  {
	
	@Configuration
	@EnableWebSecurity
	@ConditionalOnProperty(name = "keycloak.enabled", havingValue = "true", matchIfMissing = true)
	@ComponentScan(basePackageClasses = KeycloakSecurityComponents.class)
	public static class KeycloakConfigurationAdapter extends KeycloakWebSecurityConfigurerAdapter {
		@Bean
		@Override
		protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
			// required for bearer-only applications.
			return new NullAuthenticatedSessionStrategy();
		}
		
		
		@Autowired
		public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
			KeycloakAuthenticationProvider keycloakAuthenticationProvider = keycloakAuthenticationProvider();
			// simple Authority Mapper to avoid ROLE_
			keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(new SimpleAuthorityMapper());
			auth.authenticationProvider(keycloakAuthenticationProvider);
		}
		
		/**
		 * Required to handle spring boot configurations
		 * @return
		 */
		@Bean
		public KeycloakConfigResolver KeycloakConfigResolver() {
			return new KeycloakSpringBootConfigResolver();
		}
		
		
		/**
		 * Configuration spécifique à keycloak (ajouts de filtres, etc)
		 * @param http
		 * @throws Exception
		 */
		@Override
		protected void configure(HttpSecurity http) throws Exception
		{
			http
					// disable csrf because of API mode
					.csrf().disable()
					.sessionManagement()
					// use previously declared bean
					.sessionAuthenticationStrategy(sessionAuthenticationStrategy())
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
					// keycloak filters for securisation
					.and()
					.addFilterBefore(keycloakPreAuthActionsFilter(), LogoutFilter.class)
					.addFilterBefore(keycloakAuthenticationProcessingFilter(), X509AuthenticationFilter.class)
					.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())
					// delegate logout endpoint to spring security
					.and()
					.logout()
					.addLogoutHandler(keycloakLogoutHandler())
					.logoutUrl("/logout").logoutSuccessHandler(
					// logout handler for API
					(HttpServletRequest request, HttpServletResponse response, Authentication authentication) ->
							response.setStatus(HttpServletResponse.SC_OK)
			)
					.and()
					// manage routes securisation here
					.authorizeRequests().antMatchers(HttpMethod.OPTIONS).permitAll()
					.antMatchers("/logout", "/", "/scenarios", "/h2-console/**").permitAll()
					.antMatchers("/webhooks/*").hasRole("USER")
					.antMatchers("/steps").hasRole("uma_authorization")
					.anyRequest().denyAll();
		}
	}
}