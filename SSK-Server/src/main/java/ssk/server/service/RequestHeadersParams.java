package ssk.server.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

@Service
public class RequestHeadersParams {
	
	
	private HttpHeaders headers;
	
	public void setHeaders() {
		this.headers = new HttpHeaders();
		this.headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
	}
	
	public HttpHeaders getHeaders() {
		return headers;
	}
	
}
