import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import { CompileMetadataResolver } from '@angular/compiler';
import { SskService } from './ssk.service';


@Injectable()
export class ElastichsearchService {

  private sskBackendEndpoint = environment.sskBackendEndpoint;

  private scenarioNumber: number;
  private resultCount: number;
  private stepNumber: any;
  private resourceNumber: any;
  private scenariosId: any;
  private steps: any[];
  private scenarios: any[];
  private resources: any[];
  private stepsMetaData: any = [];
  private options: any;
  private params: any;
  private disciplines: any;
  private activities: any;
  private activitiesForCount: any;
  private activitiesKeys: any;
  private searchData: any;
  private techniques: any;
  private objects: any;
  private standards: any;
  private standardsForCount: any;
  private tags = ['disciplines', 'object', 'techniques', 'activities'] ;
  private regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  itemsCount: any;
  private detailsResult = {};
  glossaryData: any;
  scenariosTemp: any[];
  scenarioDetails: any;
  group: string;
  public searchResult: any;
  private researchStarted = false;
  private resourceResults = [];
  private scenarioResults= [];
  private stepResults= [];
  private http: any;
  public autoCompleteList: any;


  constructor(inj: Injector) {
    this.http = inj.get(HttpClient);
    this.scenarios = new Array();
    this.params = {'fromSSK': 'true'};
    this.setResultCount(0);
  }



  countItems(type: string): Observable<any> {
    this.setParams(['count']);
    this.setOptions(this.params);
    return this.http.get(this.sskBackendEndpoint + type, this.options);
      /*.map((response: HttpResponse<any>) => {
        this.itemsCount = response;
      }).catch((error: any) => Observable.throw(console.log(error.status) || console.log('Server error')));*/
  }

  getScenarioDetails(scenarioId: string): Observable<any> {
    this.setParams(['title', 'desc', 'image', 'scenario_metadata', 'author' ]);
    this.setOptions(this.params);
    return this.http.get(this.sskBackendEndpoint + 'scenario/' + scenarioId, this.options);
      /*.map((response: HttpResponse<any>) => {
        this.scenarioDetails(response);
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));*/
  }



  getAllStepsFromServer() {
    this.setOptions( null);
    return this.http.get(this.sskBackendEndpoint + 'steps/', this.options);
      /*.map((response: HttpResponse<any>) => {
        const result = response;
        console.log(result)
        this.setStepNumber(result['total']);
        this.setSteps(result['steps']);
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));*/
  }

  getAllStepsMetaDataFromServer() {
    this.setOptions(null);
    return this.http.get(this.sskBackendEndpoint + 'steps/metadata', this.options);
  }

  setSearchData(data: any) {
    this.searchData = data;
  }
  getSearchData() {
    return this.searchData;
  }

  tagSanitize(tag: string) {
        tag = tag.substr(tag.lastIndexOf('/') + 1, tag.length);
        const otherKey = tag.split('=');
        if (otherKey.length > 0) {
          tag = otherKey[otherKey.length - 1];
        }
      return tag;
  }

  addStepMetadata(stepId: string): any {
    let metadata: Array<any> = [];
    if (this.getStepsMetadata().length > 0) {
      const item: any = _.find(this.getStepsMetadata(), (elt) => {
        return (elt._id === stepId);
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


  getAllResourcesFromServer() {
    this.setOptions(null);
    return this.http.get(this.sskBackendEndpoint + 'steps/resources', this.options);
  }


  testUrl(url: string) {
    this.setOptions(null);
    return this.http.get ('https://cors-anywhere.herokuapp.com/' + url, this.options);
      /*.map((response: HttpResponse<any>) => {
        console.log(response.headers);
      }).catch((error: any) => Observable.throw( console.log(error.json()) || console.log('Server error')));*/
  }

  testUrlForIframe(url: string) {
    if (url.indexOf('http') === -1) {
      url = 'http://' + url;
    }
    return this.http.get (url, this.options);
     /* .map((response: HttpResponse<any>) => {
        console.log(response.headers.toString());
      }).catch((error: any) => Observable.throw( console.log(error.headers) || console.log(url + ' can\'t beload into iframe')));*/
  }

  loadTermsFromServer(type: string) {
    this.setOptions( null);
    return this.http.get(this.sskBackendEndpoint + 'glossary/terms/' + type, this.options);
  }


  loadStandardsFromServer() {
   // return this.http.get ('https://cors-anywhere.herokuapp.com/' + environment.standardEndpoint, this.options);
   this.setOptions( null);
    return this.http.get(this.sskBackendEndpoint + 'standard/all', this.options);
  }

  searchFromServer(type, tag: string) {
    this.setOptions( null);
    if (type === null) {
      return this.http.get(this.sskBackendEndpoint + '_search/' + tag , this.options);
    } else {
      return this.http.get(this.sskBackendEndpoint + '_search/' + type + '/' + tag , this.options);
    }
  }


  glossaryChange(item: string) {
    switch (item) {
      case 'objects':
        this.setGlossaryData(this.getObjects());
        break;
      case 'standards':
        this.setGlossaryData(_.sortBy(this.getStandards(), [function(o) { return o.standard_abbr_name; }]));
        break;
      case 'techniques':
        this.setGlossaryData(this.getTechniques());
        break;
      case 'activities':
        const temp = _.groupBy(_.each(this.getActivitiesForCount(), elt => {
              elt['term'] = this.normalize(elt['term']);
        }), 'group');
        this.setGlossaryData(Object.entries(temp).map(([key, obj]) => Object.assign({ head: key , items: obj})));
        break;
      case 'disciplines':
        this.setGlossaryData(_.sortBy(this.getDisciplines(), [function(o) { return o.term; }]));
        break;
    }
    return this.getGlossaryData();
  }


  loadData () {
      return new Promise ((resolve, reject) => {
        this.countItems('scenarios').subscribe(
          response => {
            this.setScenarioNumber(response['total']);
            this.setScenariosID(response['scenarios']);
          },
          err => {
            resolve(true);
          },
          () => {
            this.setScenariosTemp(new Array<any>(this.getScenarioNumber()));
            this.getAllSteps();
            this.getScenariosID().forEach((obj)  => {
              this.asynchFunction(obj);
            });
            resolve(true);
          });
      });
    }


  asynchFunction(scenario: any) {
    setTimeout(() => {
      this.getScenarioDetails(scenario._id).subscribe(
        result => {
          result.id = scenario._id;
          result.lastUpdate = scenario._source.lastUpdate;
          this.detailsResult = result;
        },
        error => {  },
        () => {
          this.addScenario(this.detailsResult);
          this.scenariosTemp.pop();
          this.setResultCount((this.getResultCount() + 1));
          if (this.getScenarios().length === this.getScenarioNumber()) {
            _.forEach(this.getSteps(), (step) => {
              step['metadata'] = this.addStepMetadata(step._id + step.position + 'Meta');
            });
          }
        }
      );
   }, 1000);
  }


  getAllStepsMetaData() {
    this.getAllStepsMetaDataFromServer().subscribe(
      stepMetadataResult => {
        this.setStepsMetadata(stepMetadataResult['step_metadata']);
      },
      error => {},
      () => {
        this.getGlossaryTerms();
      }
    );
  }

  getAllSteps() {
    this.getAllStepsFromServer().subscribe(
      stepResult => {
        this.setStepNumber(stepResult['total']);
        this.setSteps(stepResult['steps']);
      },
      error => {},
      () => {
          this.getAllResources();
      });
  }

getGlossaryTerms() {
  this.tags.forEach((obj)  => {
    this.loadTermsFromServer(obj).subscribe(
      result => {
        switch (obj.toLowerCase()) {
          case 'activities':
            this.setActivities(result);
            this.setActivitiesKeys(_.map(this.getActivities(), 'head'));
            let items = _.map(_.flattenDeep(_.zip(_.flattenDeep(_.map(this.getActivities(), 'head')),
            _.map(_.map(this.getActivities(), 'list'), 'item' )) ),  (elt) => {
              if (typeof elt === 'string') {
                 this.group = elt;
                }else {
                 elt['group'] = this.group;
              return elt;
            }
          });
          items = _.filter(items, (o)  =>  {return typeof o !== 'undefined';} );
          this.setActivitiesForCount(items);
          this.setActivities(_.groupBy(items, 'group'));
          this.setActivities(_.map(_.toPairs(this.getActivities()), d => _.fromPairs([d])));
              /* this.setActivities(_.filter(this.getActivities(), (o)  =>  { return typeof o !== undefined;} ));
            this.setActivitiesForCount(this.getActivities());
            _.map(this.getActivitiesForCount(), item => {
              if (item.term.includes('_')) {
                   item.term = _.join(item.term.split('_'), ' ');
              }
            });
            ;*/
            break;
          case 'object':
            this.setObjects(result);
            break;
          case 'techniques':
            this.setTechniques(result);
            break;
          case 'disciplines':
            this.setDisciplines(result);
            break;
        }
      },
      error => {},
      () => {});
  });
  this.getAllStandards();
}

getAllStandards() {
   this.loadStandardsFromServer().subscribe(
    result => {
      this.setStandards(result['standards']);
      this.setStandardForCount(this.getStandards());
    },
    error => {},
    () => {
    });
}

  getAllResources() {
    this.getAllResourcesFromServer().subscribe(
      resResult => {
        this.setResourceCount(resResult['total']);
        this.setResources(resResult['resources']);
      },
      error => {  },
      () => {
        this.getAllStepsMetaData();
      }
    );
  }

  normalize(text: string ) {
    //if (!isUndefined(text)) {
      //text = text.split('_').join(' ');
    //}
    return _.capitalize(text);
  }


  getScenarioNumber(): number {
    return this.scenarioNumber;
  }

  setScenarioNumber(value: number) {
    this.scenarioNumber = value;
  }

  getstepNumber(): number {
    return this.stepNumber;
  }

  setStepNumber(value: number) {
    this.stepNumber = value;
  }

  getResourceCount(): number {
    return this.resourceNumber;
  }

  setResourceCount(value: number) {
    this.resourceNumber = value;
  }

  getScenariosID(): any {
    return this.scenariosId;
  }
  setScenariosID(param: any): any {
    this.scenariosId = param;
  }


  getScenarios() {
    const rems = _.remove(this.scenarios, function(n) {
      return n.id === 'SSK_sc_corpusModellingInTEI-minusDigitization';
    });
    return this.scenarios;
  }

  setScenarios(elts: any) {
    this.scenarios = elts;
  }

  addScenario(scenario: any) {
    this.scenarios.push(scenario);
  }

  getSteps() {
    return this.steps;
  }

  setSteps(steps: any): any  {
    this.steps = steps;
  }

  setOptions(params: any) {
    this.options = {params: params};
  }

  setParams(fields: Array<string>) {
    this.params = {'fields': fields.toString(), 'fromSSK': true};
  }

  getStepsMetadata() {
    return this.stepsMetaData;
  }

  setStepsMetadata(metadata: any): any  {
    this.stepsMetaData = metadata;
  }

  getResources() {
    return this.resources;
  }

  setResources(resources: any): any  {
    this.resources = resources;
  }

  getActivities() {
    return this.activities;
  }

  setActivities(activities: any): any  {
    this.activities = activities;
  }

  getDisciplines() {
    return this.disciplines;
  }

  setDisciplines(disciplines: any): any  {
    this.disciplines = disciplines;
  }

  getObjects() {
    return this.objects;
  }

  setObjects(objects: any): any  {
    this.objects = objects;
  }

  getTechniques() {
    return this.techniques;
  }

  setTechniques(techniques: any): any  {
    this.techniques = techniques;
  }

  getStandards() {
    return this.standards;
  }

  setStandards(standards: any): any  {
    this.standards = standards;
  }

  getTags() {
    return this.tags;
  }

  isUrl(s) {

    return this.regexp.test(s);
  }

  getGlossaryData() {
    return this.glossaryData;
  }

  setGlossaryData(elt: any ) {
    this.glossaryData = elt;
  }

  getscenariosTemp() {
    return this.scenariosTemp;
  }

  setScenariosTemp(elt: any ) {
    this.scenariosTemp = elt;
  }

  getResultCount() {
    return this.resultCount;
  }

  setResultCount(elt: number ) {
    this.resultCount = elt;
  }

  getActivitiesForCount() {
    return this.activitiesForCount;
  }

  setActivitiesForCount(activites: any ) {
    this.activitiesForCount = activites;
  }

  getActivitiesKeys() {
    return this.activitiesKeys;
  }

  setActivitiesKeys(keys: any ) {
    this.activitiesKeys = keys;
  }

  getStandardForCount() {
    return this.standardsForCount;
  }

  setStandardForCount(standards: any ) {
    this.standardsForCount = standards;
  }

  getResearchStarted() {
    return this.researchStarted;
  }

  setResearchStarted(item: boolean ) {
    this.researchStarted = item;
  }

  getResourceResults() {
    return this.resourceResults;
  }

  setResourceResults(elts: any) {
   this.resourceResults = elts;
  }

   getScenarioResults() {
     return this.scenarioResults;
   }

   setScenarioResults(elts: any) {
    this.scenarioResults = elts;
  }
  getStepResults () {
    return this.stepResults;
  }

  setStepResults (elts: any) {
     this.stepResults = elts;
  }


}
