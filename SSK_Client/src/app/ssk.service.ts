import { Injectable } from '@angular/core';
import {ElastichsearchService} from './elastichsearch.service';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Title} from '@angular/platform-browser';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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

  private _navItemSource = new BehaviorSubject<string>('');
  navItem$ = this._navItemSource.asObservable();

  constructor(private router: Router, private elasticService: ElastichsearchService,
              private http: HttpClient, private titleService: Title) {
  }

  changeNav(item) {
    this._navItemSource.next(item);
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
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
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
  if ( desc['content'] !== undefined && desc['content'] instanceof Array) {
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
          } else {
            return null;
          }
  return text;
}

setLink(content: object) {
  return '<a href=\"' + content['target'] + '\" target = \"_blank\" >' + ((content['content'])[0])['part'] + '</a>';
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
  } else {
    key1 = 'term'; key2 = 'key';
  }
  return new Promise(resolve => {
    resolve(_.intersectionWith(array1, array2, (item1: any, item2: any)  => {
    if ( typeof item2[key2] === 'undefined' ) {
      if (type === 'standard' && item2[key1] !== null) {
        term = item2[key1].toLowerCase();
      } else {
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

updateStepsOrScenarios(type: string, removeTag?: any ): Observable<any[]> {
  removeTag = removeTag[0];
  let retreivedElt: any;
    this.elasticService.setStepResults([]);
    this.elasticService.setScenarioResults([]);
    _.forEach(this.getFilters(), filter => {
      if ( _.includes(['activities', 'standards' ], filter.type) ) {
          retreivedElt = _.remove(_.clone(this.elasticService.getSteps()), item => {
                            return _.includes(_.map(filter['data'], '_id'), item['_id']);
                          });
          this.elasticService.setStepResults(_.uniqBy(_.filter(_.concat(this.elasticService.getStepResults(),
          retreivedElt), undefined), '_id'));
          retreivedElt = _.remove(_.clone(this.elasticService.getScenarios()), item => {
            return _.includes(_.uniq(_.flatMapDeep(_.map(this.elasticService.getStepResults(), 'parents.id'))), item['id']);
          });
          this.elasticService.setScenarioResults(_.uniqBy(_.filter(_.concat(this.elasticService.getScenarioResults(),
          retreivedElt), undefined), 'id'));
      } else {
        retreivedElt = _.remove(_.clone(this.elasticService.getScenarios()), item => {
          return _.includes(_.map(filter['data'], '_id'), item['id']);
        });
        this.elasticService.setScenarioResults(_.uniqBy(_.filter(_.concat(this.elasticService.getScenarioResults(),
          retreivedElt), undefined), 'id'));
          retreivedElt = [];
          _.forEach(this.elasticService.getScenarioResults(), (value) => {
            const elt = _.remove(_.clone(this.elasticService.getSteps()), item => {
              return _.includes(_.map(item['parents'], 'id'), value.id);
            });
            retreivedElt.push(elt);
          });
          retreivedElt = _.flatMapDeep(retreivedElt);
          this.elasticService.setStepResults(_.uniqBy(_.filter(_.concat(this.elasticService.getStepResults(),
          retreivedElt), undefined), '_id'));
      }
  });
    return Observable.of(this.elasticService.getStepResults());
}

updateScenarios(): Observable<any[]> {
   let scenarioResults: any;
    scenarioResults = _.remove(_.clone(this.elasticService.getScenarios()), item => {
      return _.includes(_.map(_.flattenDeep(_.map(_.filter(this.getFilters(), ['type' , 'scenario']), 'results')), '_id'), item['id']);
    });
    return Observable.of(scenarioResults);
}


/*
  According to research on step, this function updates list of scenarios
  containing these steps and the resources included in these steps
  */
 updateScenariosAndResouces(temp: any) {

  const  scenariosToFilter = [];
  _.forEach(temp, (value) => {
    const elt = _.remove(_.clone(this.elasticService.getScenarios()), item => {
      return _.includes(_.map(value.parents, 'id'), item['id']);
    });
    scenariosToFilter.push(elt[0]);
  });
  this.elasticService.setScenarioResults(scenariosToFilter);
   let  resourcesToFilter = _.remove(_.clone(this.elasticService.getResources()), item => {
    return _.includes(_.map(temp, '_id'), item['parent']);
  });
  resourcesToFilter = _.uniq(_.filter(_.concat(_.clone(this.elasticService.getResourceResults()), resourcesToFilter)));
  this.elasticService.setResourceResults(resourcesToFilter);
}


updateStepsAndResouces(temp: any, removeFromFilter: boolean) {
  let  steps = [];
  _.forEach(temp, (value) => {
    const elt = _.remove(_.clone(this.elasticService.getSteps()), item => {
      return _.includes(_.map(item['parents'], 'id'),  value.id);
    });
    steps.push(elt);
  });
  steps = _.flatten(steps);
  let removedResources = _.remove(_.clone(this.elasticService.getResources()), item => {
    return _.includes(_.map(steps, '_id'), item['parent']);
  });
  removedResources = _.uniq(_.filter(_.concat(_.clone(this.elasticService.getResourceResults()), removedResources)));
  this.elasticService.setStepResults(steps);
  this.elasticService.setResourceResults(removedResources);
}

}
