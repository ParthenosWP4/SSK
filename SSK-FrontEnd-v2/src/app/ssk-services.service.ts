import { Injectable } from '@angular/core';
import {ElastichsearchServicesService} from './elastichsearch-services.service';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Title} from "@angular/platform-browser";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable()
export class SskServicesService {

  private filters = [];

  private statusError: number;
  private errorMsg: string;



  public options = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3

  };

  public browseItems: Array<string> = ['scenarios', 'steps', 'resources'];

  public  scenarioKeys = ['id', 'desc.content', 'desc[0].content', 'title.content', 'title[0].content',
    'scenario_metadata.discipline.key', 'scenario_metadata.objects.key' , 'scenario_metadata.standards.key', 'scenario_metadata.techniques.key'];

  public resourcesKeys = ['_id', 'category', 'title', 'redirect', 'date', 'creators', 'type'];

  public stepsKeys = ['_id', 'desc.content', 'description.content',  'desc[0].content', 'head.content', 'head[0].content', 'metadata.key',
    'date', 'creators'];

  glossaryLink: string ;

  constructor(private router: Router, private elasticService: ElastichsearchServicesService, private http: HttpClient, private titleService: Title) {
  }


  shorten(content: any, length: number) {
    const result: any  = {};
    const contentArray = new Array(content.content);
    if (contentArray[0] instanceof Array) {
      let newContent = '';
      _.forEach(contentArray[0], (value) => {
        if (value.constructor === {}.constructor) {
          if (!isUndefined(value.abbr)) {
            newContent = newContent.concat(value.abbr.toString());
            console.log(newContent);
          }
          if (!isUndefined(value.expan)) {
            newContent = newContent + ' ' + value.expan.toString();
          }
          if (!isUndefined(value.list)) {
            _.forEach(value.list.item, (val) => {
              newContent = newContent + ' ' + val.toString() + '<br/>';
            });
          }
        }
        if (value.constructor === 'test'.constructor) {
          newContent = newContent + ' ' + value.toString();
        }
      });
      result.content = newContent;
    }
    if (content.content.length > length) {
      result.content = content.content.substring(0, length) + '...';
    } else {
      result.content = content.content;
    }
    return result;
  }



  initializeScenariosID() {
    let res: any;
      this.elasticService.countItems('scenarios')
        .subscribe(
          result => {
            res = result;
            this.elasticService.setScenarioNumber(result['total']);
          },
          err => console.error('Initialize Scenarios Id Error : ' + err ),
          () =>  {
            this.elasticService.setScenariosID(res['scenarios']);
          }
        );
    }

  loadSteps() {
    if ( this.elasticService.getSteps().length <= 0) {
      this.elasticService.getAllSteps();
    }
  }

  loadPageContent(url: any) {
    return this.http.get(url.changingThisBreaksApplicationSecurity)
      .map((response: HttpResponse<any>) => {

      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  isUrl(s) {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
  }

  getFilters() {
    return this.filters;
  }

  setFilters(elts: any ) {
     this.filters = elts;
  }

  addToFilters(elt: string) {
    this.filters.push(elt);
  }

  getGlossarylink() {
    return this.glossaryLink;
  }

  setGlossarylink(elt: string ) {
    this.glossaryLink = elt;
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  public getTitle() {
    return this.titleService.getTitle();
  }

  public setStatusError( value: number) {
    this.statusError = value;
  }

  public getStatusError() {
    return this.statusError;
  }

  public setErrorMsg( value: string) {
    this.errorMsg = value;
  }

  public getErrorMsg() {
    return this.errorMsg;
  }

 checkBackEndAvailability () {
   if (this.getStatusError() ) {
     this.setErrorMsg('Oops… The server is temporarily unable to serve your request due to maintenance downtime or capacity problems.. Bloody Malork <br/> Please contact ssk@inria.fr !');
     switch (this.getStatusError()) {
       case 0:
         this.setTitle('SERVER NOT AVAILABLE')
         break;
       case 500:
         this.setTitle('SSK SERVER ERROR ')
         break;
       case 503:
         this.setTitle('SSK SERVICES NOT AVAILABLE ')
         break;
       case 404:
         this.setTitle('PAGE NOT FOUND');
         this.setErrorMsg('Oops… the page you were looking for doesn’t  exist... Bloody Malork !');
         break;
     }
     this.router.navigate(['errorpage']);
   }
 }

 updateScenarioMetadata(metadata: any) {


 }


}
