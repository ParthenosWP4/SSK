package ssk.server.controller;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/webhooks")
public class GithubWebhooks {


    /*This function is executed when the TEI files's ODD is updated
     * Here we convert the TEI_SSK_ODD.xml's content to TEI_SSK_ODD.rng and push the new content on Github
     * Also we produce a new version of the documentation the SSK TEI  and also push it on Github
     */
    
    private static final Logger logger = LoggerFactory.getLogger(GithubWebhooks.class);
    
    private static Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    
    
    @RequestMapping(value = "/test",  method = { RequestMethod.POST  }, consumes="application/json")
    public ResponseEntity<String> getTElasticHealth(@RequestBody String postPayload){
        logger.info(postPayload);
        return new ResponseEntity<String>(gson.toJson("content: OK"), new HttpHeaders(), HttpStatus.MULTI_STATUS.OK);
    }
    
    @RequestMapping(value = "/second",  method = { RequestMethod.POST  }, produces="application/json", consumes="application/json")
    public ResponseEntity<String> commitWebhooks(@RequestBody String postPayload){
        logger.info(postPayload);
        return new ResponseEntity<String>(gson.toJson("content: OK"), new HttpHeaders(), HttpStatus.OK);
    }

}
