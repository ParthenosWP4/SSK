import { Injectable } from '@angular/core';
import {ElastichsearchService} from './elastichsearch.service';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Title} from '@angular/platform-browser';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class SskService {

  private filters = [];
  private statusError: number;
  private errorMsg  = '';
  public empty = false;
  public alredyInStepCard = 0;



  public options = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3

  };

  public browseItems: Array<string> = ['scenarios', 'steps', 'resources'];

  public  scenarioKeys = ['id', 'desc.content', 'desc[0].content', 'title.content', 'title[0].content', 'scenario_metadata.discipline.key'
                        , 'scenario_metadata.objects.key' , 'scenario_metadata.standards.key', 'scenario_metadata.techniques.key'];

  public resourcesKeys = ['_id', 'category', 'title', 'redirect', 'date', 'creators', 'type'];

  public stepsKeys = ['_id', 'desc.content', 'description.content',  'desc[0].content', 'head.content', 'head[0].content', 'metadata.key',
    'date', 'creators'];

  glossaryLink: string ;

  constructor(private router: Router, private elasticService: ElastichsearchService,
              private http: HttpClient, private titleService: Title) {
  }


  shorten(content: any, length: number) {
    /*const result: any  = {};
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
    }*/
    return content;
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

  addToFilters(elt: any) {
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
   if (this.getStatusError() === 0 ) {
     this.setErrorMsg('Oops… The server is temporarily unable to serve your request due to maintenance' +
                      ' downtime or capacity problems.. Bloody Malork <br/> Please contact ssk@inria.fr !');
     switch (this.getStatusError()) {
       case 0:
         this.setTitle('SERVER NOT AVAILABLE');
         break;
       case 500:
         this.setTitle('SSK SERVER ERROR ');
         break;
       case 503:
         this.setTitle('SSK SERVICES NOT AVAILABLE ');
         break;
       case 404:
         this.setTitle('PAGE NOT FOUND');
         this.setErrorMsg('Oops… the page you were looking for doesn’t  exist... Bloody Malork !');
         break;
     }
     this.router.navigate(['errorpage']);
   }
 }


 updateText(desc: any, type: string) {
  let text = '';
  if ( desc['content'] && (desc.content) instanceof Array) {
      _.forEach(Array.from(desc.content), (part) => {
          if (part['ref']) {
            text += this.setLink(part['ref']) + ' ';
          } else if (part['list']) {
            const list = part['list'];
            text += this.setList(list['item']);
          } else {
          text += part['part'] + ' ';
        }
      });
  } else  if (desc.content !== undefined) {
            return desc['content'];
          }
          else {
            return desc;
          }
  return text;
}

setLink(content: object) {
  return '<a href=\"' + content['target'] + '\" target = \"_blank\" >' + ((content['content'])[0])['part']+ '</a>';
}

setList(part: object) {
  let list = '<ul>';
  _.forEach(part, (item) => {
      list += '<li>' + item + '</li>';
  });
  list += '</ul>';
  return list;
}

addCount(array1, array2: Array<any>, type: string):  Promise<any[]> {
  let key1, key2, term;
  if (type === 'standard') {
    key1 = 'standard_abbr_name'; key2 = 'abbr';
  }else {
    key1 = 'term'; key2 = 'key';
  }
  /*Promise.all(_.intersectionWith(array1, array2, (item1: any, item2: any)  => {
    if ( typeof item2[key2] === 'undefined' ) {
      if (type === 'standard' && item2[key1] !== null) {
        term = item2[key1].toLowerCase();
      }else {
        term = item2['term'].toLowerCase();
      }
    } else  {
      term = item2[key2].toLowerCase();
    }
    if (item1[key1].toLowerCase().trim() === term.trim()) {

      if ( typeof item1['scenarioIn'] !== 'undefined' || !isNaN(item1['scenarioIn']) ) {
      item1['scenarioIn'] += 1;
      } else {
      item1['scenarioIn'] = 1;
      }
      return item1;
    }
 })).then((completed) => return completed;});*/

  return new Promise(resolve => {
    resolve(_.intersectionWith(array1, array2, (item1: any, item2: any)  => {
    if ( typeof item2[key2] === 'undefined' ) {
      if (type === 'standard' && item2[key1] !== null) {
        term = item2[key1].toLowerCase();
      }else {
        term = item2['term'].toLowerCase();
      }
    } else  {
      term = item2[key2].toLowerCase();
    }
    if ((item1[key1] !== undefined) && (term !== undefined) && item1[key1].toLowerCase().trim() === term.trim()) {
      if ( typeof item1['scenarioIn'] !== 'undefined' || !isNaN(item1['scenarioIn']) ) {
      item1['scenarioIn'] += 1;
      } else {
      item1['scenarioIn'] = 1;
      }
      return item1;
    }
 }));
});
}

updateSteps(): Observable<any[]> {
  let stepsResults: any ;
  if (this.elasticService.getStepResults().length > this.elasticService.searchResult['total']) {
    stepsResults = _.differenceBy(this.elasticService.getStepResults(), this.elasticService.searchResult['data'], '_id');
    return Observable.of(stepsResults);
  }else {
    stepsResults = _.differenceBy(this.elasticService.getSteps(), this.elasticService.searchResult['data'], '_id');
    stepsResults = _.uniq(_.concat(this.elasticService.getStepResults(), stepsResults));
    return Observable.of(stepsResults);
  }
}

updateScenarios(): Observable<any[]> {
  let scenarioResults: any;
  if (this.elasticService.getScenarioResults().length > this.elasticService.searchResult['total']) {
    scenarioResults = _.differenceWith(this.elasticService.getScenarioResults(),
                                      this.elasticService.searchResult['data'],   (o1, o2) => {
                                        return (o1['id'] === o2['_id']);
                                      });
    return Observable.of(scenarioResults);
  }else {
    scenarioResults = _.differenceWith(this.elasticService.getScenarios(), this.elasticService.searchResult['data'],
                                            (o1, o2) => {
                          return (o1.id === o2['_id']);
                        });
      scenarioResults = _.uniq(_.concat(this.elasticService.getScenarios(), scenarioResults));
    return Observable.of(scenarioResults);
  }
}


/*
  According to research on step, this function updates list of scenarios
  containing these steps and the resources included in these steps
  */
 updateScenariosAndResouces(temp: any) {
  const scenariosToFilter = this.elasticService.getScenarios();
  const resourcesToFilter = this.elasticService.getResources();
 this.elasticService.setScenarioResults( _.intersectionWith(scenariosToFilter, temp,  (o1, o2) => {
   return (o1.id === o2['parent']);
 }));
 this.elasticService.setResourceResults( _.intersectionWith(resourcesToFilter, temp,  (o1, o2) => {
   return (o1.parent === o2['_id']);
 }));
}


updateStepsAndResouces(temp: any) {
  const stepsToFilter = this.elasticService.getSteps();
  this.elasticService.setStepResults(_.intersectionWith(stepsToFilter, temp,  (o1, o2) => {
   return (o1.parent === o2['id']);
  }));
}


}
