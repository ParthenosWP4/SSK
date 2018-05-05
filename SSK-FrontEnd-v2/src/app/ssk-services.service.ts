import { Injectable } from '@angular/core';
import {ElastichsearchServicesService} from './elastichsearch-services.service';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";



@Injectable()
export class SskServicesService {

  private filters = [];

  public options = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3

  };

  public  scenarioKeys = ['id', 'desc.content', 'desc[0].content', 'title.content', 'title[0].content',
    'scenario_metadata.discipline.key', 'scenario_metadata.objects.key' , 'scenario_metadata.standards.key', 'scenario_metadata.techniques.key'];

  public resourcesKeys = ['_id', 'category', 'title', 'redirect', 'date', 'creators', 'type'];

  public stepsKeys = ['_id', 'desc.content', 'description.content',  'desc[0].content', 'head.content', 'head[0].content', 'metadata.key',
    'date', 'creators'];

  glossaryLink: string ;



  constructor(private elasticService: ElastichsearchServicesService, private http: Http) {
  }


  shorten(content: any, length: number) {
    let result: any  = {};
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
    }
    else {
      result.content = content.content;
    }
    return result;
  }

  addStepMetadata(stepId: string): any {
    let metadata: Array<any> = []
    if (this.elasticService.getStepsMetadata().length > 0) {
      const item: any = _.find(this.elasticService.getStepsMetadata(), (elt) => {
        return elt._parent === stepId;
      });
        let source: any;
        if (!isUndefined(item) && !isUndefined(item._source)) {
          source = item._source;
          if (source.objects instanceof Array) {
            metadata = metadata.concat(source.objects);
          }
          if (source.discipline instanceof Array) {
            metadata = metadata.concat(source.discipline);
          }
          if (source.activity instanceof Array) {
            metadata = metadata.concat(source.activity);
          }
          if (source.techniques instanceof Array) {
            metadata = metadata.concat(source.techniques);
          }
          if (source.standards instanceof Array) {
            metadata = metadata.concat(source.standards);
          }
        }
    }
    return metadata;
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
      this.elasticService.getAllSteps().subscribe(result => {
      });
    }
  }

  loadPageContent(url: any) {
    console.log(url.changingThisBreaksApplicationSecurity)
    console.log(url.changingThisBreaksApplicationSecurity)
    return this.http.get(url.changingThisBreaksApplicationSecurity)
      .map((response) => {
      console.log(response)
        return response.text();
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


}
