package ssk.server.entity.service;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssk.server.entity.Author;
import ssk.server.entity.reposiroty.AuthorRepository;

@Service
public class AuthorService {
	
	
	@Autowired
	private AuthorRepository authorRepository;
	
	Gson gson = new Gson();
	
	public Author getAuthorById (long id){
		return authorRepository.findById(id);
	}
	
	public Author getAuthorByEmail (String email){
		return authorRepository.findByEmail(email);
	}
	
	public JsonObject saveAuthor(Author author, boolean update){
		JsonObject result = new JsonObject();
		Author existAuthor = authorRepository.findByEmail(author.getEmail());
		if (existAuthor != null){
			if(update){
				author.setId(existAuthor.getId());
				authorRepository.save(author);
				result.addProperty("operation", true);
			} else {
				result.addProperty("operation", false);
				result.addProperty("msg", "Author with same email already exist, Please change your email and resubmit");
			}
		}
		else {
			author.setRegistred(true);
			authorRepository.save(author);
			result.addProperty("operation", true);
			result.addProperty("entity", gson.toJson(author));
		}
		return result;
	}
}
