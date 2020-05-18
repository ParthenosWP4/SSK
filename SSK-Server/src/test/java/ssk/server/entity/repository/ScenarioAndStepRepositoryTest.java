package ssk.server.entity.repository;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ssk.server.entity.Author;
import ssk.server.entity.Scenario;
import ssk.server.entity.reposiroty.ScenarioRepository;
import ssk.server.entity.reposiroty.StepRepository;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@Transactional
@DataJpaTest(showSql=false)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class ScenarioAndStepRepositoryTest {
	
	
	private static final Logger logger = LoggerFactory.getLogger(ScenarioAndStepRepositoryTest.class.getName());
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private ScenarioRepository scenarioRepository;
	
	@Autowired
	private StepRepository stepRepository;
	
	
	
	
	
	
	@Test
	@Transactional
	public void testSaveScenario() {
		logger.info("testSaveClient start");
		
		Author author = new Author();
		author.setEmail("test@test.com");
		
		
		Scenario scenario = new Scenario();
		scenario.setTitle("Scenario test  1 ");
		scenario.setTeiContent("TEI Scenario Content");
		scenario.setAuthor(author);
		
		logger.info(scenario.toString());
		
		Scenario newScenario =  scenarioRepository.save(scenario);
		
		logger.info(newScenario.toString());
		
		assertThat(newScenario.getTitle()).isEqualTo("Scenario test  1 ");
	}
}
