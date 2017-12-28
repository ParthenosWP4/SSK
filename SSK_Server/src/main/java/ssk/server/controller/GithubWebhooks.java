package ssk.server.controller;


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

    @RequestMapping(value = "/rng",  method = { RequestMethod.POST  }, consumes="application/json")
    public  void  getTElasticHealth(@RequestBody String postPayload){

    }

}
