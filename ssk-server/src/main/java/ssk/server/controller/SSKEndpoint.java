package ssk.server.controller;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ssk.server.service.ElasticServices;
import ssk.server.service.GithubApiService;
import ssk.server.service.SSKServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@Controller
@RequestMapping(value = "/ssk")
public class SSKEndpoint {


    @Autowired
    GithubApiService githubApiService;

    @Autowired
    ElasticServices esServices;

    @Autowired
    SSKServices sskServices;


    @RequestMapping(value = "/scenarios", method = { RequestMethod.GET  })
    public
    ResponseEntity <Object[]>  getScenarioList(){
        return githubApiService.getScenarioList();
    }

    @RequestMapping(value = "/scenario", params = "identifier",  method = { RequestMethod.GET  })
    public  ResponseEntity <String> getScenarioContent( @RequestParam("identifier") String identifier ){
        return githubApiService.getGithubFileContent("scenario", identifier);

    }


    @ResponseBody
    @RequestMapping(value = "/health",  method = { RequestMethod.GET  }, produces="application/json")
    public  ResponseEntity  getElasticHealth(){
        return esServices.getElastichHealth();

    }





}
