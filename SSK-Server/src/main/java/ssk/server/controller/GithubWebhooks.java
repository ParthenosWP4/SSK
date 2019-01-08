package ssk.server.controller;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ssk.server.service.CommitsHandleService;
import ssk.server.service.SSKServices;

@Controller
@RequestMapping(value = "/webhooks")
public class GithubWebhooks {


    /*This function is executed when the TEI files's ODD is updated
     * Here we convert the TEI_SSK_ODD.xml's content to TEI_SSK_ODD.rng and push the new content on Github
     * Also we produce a new version of the documentation the SSK TEI  and also push it on Github
     */
    
    private static final Logger logger = LoggerFactory.getLogger(GithubWebhooks.class);
    
    private static Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    
    @Autowired
    private SSKServices sskServices;
    
    @Autowired
    private CommitsHandleService commitsHandleService;
    
    
   
    
    @RequestMapping(value = "/commits",  method = { RequestMethod.POST  }, produces="application/json", consumes="application/json")
    public ResponseEntity<String> webhooksHandle(@RequestBody String payload){
        JsonArray commits =sskServices.getParser().parse(payload).getAsJsonObject().getAsJsonArray("commits");
        if(commits.size() > 0){
            Thread t = new Thread(new Runnable() {
                @Override
                public void run() {
                    commitsHandleService.webhooksHandle(commits);
                }
            });
            t.start();
            return new ResponseEntity<String>(gson.toJson("content: commits found"), new HttpHeaders(), HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(gson.toJson("content: No commits found"), new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
    }

}
