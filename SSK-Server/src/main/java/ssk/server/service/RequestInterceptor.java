package ssk.server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class RequestInterceptor extends HandlerInterceptorAdapter {
	
	
	@Autowired
	private SSKServices sskServ;
	
	private static final Logger logger = LoggerFactory.getLogger(RequestInterceptor.class);
	
	/**
	 * This is not a good practice to use sysout. Always integrate any logger
	 * with your application. We will discuss about integrating logger with
	 * spring boot application in some later article
	 */
	@Override
	public boolean preHandle(HttpServletRequest request,
	                         HttpServletResponse response, Object object) throws Exception {
		logger.info("In preHandle we are Intercepting the Request");
		logger.info("____________________________________________");
		String requestURI = request.getRequestURI();
		logger.info("Data collection on Github ....." + this.sskServ.isHandleData());
		if (this.sskServ.isHandleData()){
			logger.info("Data collection on Github .....");
			response.setStatus(HttpStatus.SERVICE_UNAVAILABLE.value());
			response.sendError(503, "Data collection on Github .....");
			throw new SSKUnavailableException("SSK not available at the moment... Please try later");
			
		}
		/*Integer personId = ServletRequestUtils.getIntParameter(request, "personId", 0);
		System.out.println("RequestURI::" + requestURI +
				                   " || Search for Person with personId ::" + personId);
		System.out.println("____________________________________________");*/
		
		
		return true;
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
	                       Object object, ModelAndView model)
			throws Exception {
		System.out.println("_________________________________________");
		System.out.println("In postHandle request processing "
				                   + "completed by @RestController");
		System.out.println("_________________________________________");
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
	                            Object object, Exception arg3)
			throws Exception {
		System.out.println("________________________________________");
		System.out.println("In afterCompletion Request Completed");
		System.out.println("________________________________________");
	}
}

class SSKUnavailableException extends RuntimeException {
	public SSKUnavailableException(String message) {
		super(message);
	}
}