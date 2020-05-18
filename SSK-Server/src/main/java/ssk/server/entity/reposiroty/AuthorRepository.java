package ssk.server.entity.reposiroty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssk.server.entity.Author;


@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
	
	Author findById(long id);
	
	Author findByEmail(String email);
	
}