package ssk.server.entity.reposiroty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ssk.server.entity.Author;
import ssk.server.entity.Scenario;

import java.util.List;

@Repository
public interface ScenarioRepository extends JpaRepository<Scenario, Long> {
	
	Scenario findById(long id);
	
	@Query("select scenario from Scenario scenario where lower(scenario.title) = lower(?1)")
	Scenario findByTitleIgnocase(String  title);
	
	
	List<Scenario> findAllByAuthorAndStatus(String status, Author author);
	
}