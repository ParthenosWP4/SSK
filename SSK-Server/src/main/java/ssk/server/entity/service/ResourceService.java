package ssk.server.entity.service;


import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssk.server.entity.Resource;
import ssk.server.entity.reposiroty.ResourceRepository;

import java.util.List;

@Service
public class ResourceService {
	
	@Autowired
	ResourceRepository resourceRepository;
	
	public Resource getResourceById(long id){
		return resourceRepository.findById(id);
	}
	
	public  Resource getResourceByTitle(String title){
		return  resourceRepository.findByTitle(title);
	}
	
	
	public List<Resource> getAllResourcesWithTitleContaining(String seq){
		return resourceRepository.findAllByTitleContainingIgnoreCase(seq);
	}
	
	
	public JsonObject saveResource(Resource resource){
		JsonObject result = new JsonObject();
		Resource existRes = resourceRepository.findByTitle(resource.getTitle());
		if( existRes != null){
			result.addProperty("operation", false);
			result.addProperty("existContent", existRes.getJsonContent());
		}
		else {
			resourceRepository.save(resource);
			result.addProperty("operation", true);
		}
		return result;
	}
	
	
	
	
}
