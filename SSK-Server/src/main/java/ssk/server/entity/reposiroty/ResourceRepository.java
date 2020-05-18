package ssk.server.entity.reposiroty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssk.server.entity.Resource;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
	
	Resource findById(long id);
	
	Resource findByTitle(String title);
	
	List<Resource> findAllByTitleContainingIgnoreCase(String word);
	
	//Resource cr
	
	
}