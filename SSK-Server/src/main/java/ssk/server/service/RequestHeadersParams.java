package ssk.server.service;

import com.google.gson.JsonElement;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestHeadersParams {
	
	
	private HttpHeaders headers;
	
	public RequestHeadersParams() {
		this.headers = new HttpHeaders();
		this.headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
	}
	
	public HttpHeaders getHeaders() {
		return headers;
	}
	
	
	public HttpEntity<String> addDetectNoop(JsonElement content){
		//content.getAsJsonObject().addProperty("detect_noop", false);
		return new HttpEntity<String>(content.toString(), this.getHeaders());
	}
	
}
