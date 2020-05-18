package ssk.server.entity.reposiroty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ssk.server.entity.Author;
import ssk.server.entity.Step;

import java.util.List;

@Repository
public interface StepRepository extends JpaRepository<Step, Long> {
	
	Step findById(long id);
	
	@Query("select step from Step step where lower(step.title) = lower(?1)")
	List<Step> findAllByTitleContains(String title);
	
}