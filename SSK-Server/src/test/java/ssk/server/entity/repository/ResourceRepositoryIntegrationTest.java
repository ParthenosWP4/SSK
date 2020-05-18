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
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ssk.server.entity.Author;
import ssk.server.entity.Resource;
import ssk.server.entity.reposiroty.AuthorRepository;
import ssk.server.entity.reposiroty.ResourceRepository;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@Transactional
@DataJpaTest(showSql=false)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class ResourceRepositoryIntegrationTest {
	
	private static final Logger logger = LoggerFactory.getLogger(ResourceRepositoryIntegrationTest.class.getName());
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private ResourceRepository resourceRepository;
	
	@Autowired
	private AuthorRepository authorRepository;
	
	
	
	@Before
	public void setUp(){
		// given
		
		Author author = new Author();
		author.setEmail("test@test.com");
		
		
		entityManager.persist(author);
		
		Resource resource = new Resource();
		resource.setTitle("Resource 1 for step 2");
		resource.setFetchBy(author);
		
		
		entityManager.persist(resource);
	}
	
	@Test
	public void whenFindByTitle_thenReturnResource() {
		// when
		Resource found = resourceRepository.findByTitle("Resource 1 for step 2");
		
		// then
		assertThat(found.getTitle()).isEqualTo("Resource 1 for step 2");
	}
	
	@Test
	public void testIntegirty() {
		Author author = authorRepository.findByEmail("test@test.com");
		
		// given
		Resource res = new Resource();
		res.setTitle("Resource 1 ");
		res.setFetchBy(author);
		logger.info(res.toString());
		entityManager.persistAndFlush(res);
		
		Resource res2 = new Resource();
		res2.setTitle("Resource 2 ");
		res2.setFetchBy(author);
		logger.info(res2.toString());
		entityManager.persistAndFlush(res2);
		
		res.setTitle("sdfsdfsd");
		logger.info(res.toString());
		
		entityManager.persistAndFlush(res);
	}
	
}
