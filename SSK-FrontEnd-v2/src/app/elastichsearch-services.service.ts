import { Injectable } from '@angular/core';
import {Http,  Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {environment} from '../environments/environment';


@Injectable()
export class ElastichsearchServicesService {

  private sskBackendEndpoint = environment.sskBackendEndpoint;
  private headers = new Headers({'Content-Type': 'application/json'});

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
  private params: URLSearchParams;
  private disciplines: any;
  private activities: any;
  private techniques: any;
  private objects: any;
  private standards: any;
  private tags = ['disciplines', 'object', 'techniques', 'activities'] ;
  private regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  ;searchData = {};
  private detailsResult = {};
  glossaryData: any;
  scenariosTemp: any[];


  constructor(private http: Http) {
    this.scenarios = new Array();
    this.params = new URLSearchParams();
    this.params.append('fromSSK', 'true');
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set('Access-Control-Allow-Methods', 'GET');
    this.setResultCount(0);
  }



  countItems(type: string): Observable<any> {
    this.setParams(['count'])
    this.setOptions(this.headers, this.params)
    return this.http.get(this.sskBackendEndpoint + type, this.options)
      .map((response: Response) => {
        return JSON.parse(response.text());
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getScenarioDetails(scenarioId: string): Observable<any> {
    this.setParams(['title', 'desc', 'image', 'scenario_metadata'])
    this.setOptions(this.headers, this.params)
    return this.http.get(this.sskBackendEndpoint + 'scenario/' + scenarioId, this.options)
      .map((response: Response) => {
        return JSON.parse(response.text());
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



  getAllSteps() {
    this.setOptions(this.headers, null);
    return this.http.get(this.sskBackendEndpoint + 'steps/', this.options)
      .map((response: Response) => {
        const result = JSON.parse(response.text());
        console.log(result)
        this.setStepNumber(result['total']);
        this.setSteps(result['steps'])
        return result;
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAllStepsMetaData() {
    this.setOptions(this.headers, null);
    return this.http.get(this.sskBackendEndpoint + 'steps/metadata', this.options)
      .map((response: Response) => {
        const result = JSON.parse(response.text());
        this.setStepsMetadata(result['step_metadata']);
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  setSearchData() {

    /*this.setActivities(_.uniq(_.map(Object.keys(_.groupBy(_.flattenDeep(_.map(_.map(this.getStepsMetadata(), '_source'), 'activity'))
      , 'key')), v => this.tagSanitize(v.toLowerCase()).replace(/[0-9]/g, '').replace('_', '').trim())));

   this.setObjects(_.map(Object.keys(_.groupBy(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.getStepsMetadata(), '_source'), 'objects'),
      function(n) { return !isUndefined(n); })), 'type').object, 'key')), item => item.toLowerCase()));

    this.setTechniques(_.map(Object.keys(_.groupBy(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.getStepsMetadata(), '_source'),
      'objects'), function(n) { return !isUndefined(n); })), 'type').technique, 'key')), item => item.toLowerCase()));

    this.setStandards(_.concat(Object.keys(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.getStepsMetadata(), '_source'),
      'standards'),  function(n) { return !isUndefined(n); })), 'abbr')), Object.keys(_.groupBy(_.flattenDeep(_.remove(_.map(
      _.map(this.getStepsMetadata(), '_source'), 'standards'), function(n) { return !isUndefined(n); })), 'key'))));
  */
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
    let metadata: Array<any> = []
    if (this.getStepsMetadata().length > 0) {
      const item: any = _.find(this.getStepsMetadata(), (elt) => {
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


  getAllResources() {
    this.setOptions(this.headers, null);
    return this.http.get(this.sskBackendEndpoint + 'steps/resources', this.options)
      .map((response: Response) => {
        const result = JSON.parse(response.text());
        this.setResourceCount(result['total']);
        this.setResources(result['resources']);
      }).catch((error: any) => Observable.throw(error.json().error ||  console.log('Server error')));
  }

  testUrl(url: string) {
    this.setOptions(this.headers, null);
    return this.http.get ('https://cors-anywhere.herokuapp.com/' + url, this.options)
      .map((response: Response) => {
        console.log(response.headers);
      }).catch((error: any) => Observable.throw( console.log(error.json()) || console.log('Server error')));
  }

  testUrlForIframe(url: string) {
    this.setOptions(this.headers, null);
    return this.http.get ( url)
      .map((response: Response) => {
        console.log(response.headers.toString());
      }).catch((error: any) => Observable.throw( console.log(error.headers) || console.log(url + ' can\'t beload into iframe')));
  }

  loadTermsFromServer(type: string) {
    this.setOptions(this.headers, null);
    return this.http.get(this.sskBackendEndpoint + 'glossary/terms/' + type, this.options)
      .map((response: Response) => {
        const result = JSON.parse(response.text());
        switch (type.toLowerCase()) {
          case 'activities':
            this.setActivities(result);
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
      }).catch((error: any) => Observable.throw(error.json().error ||  console.log('Server error')));
  }


  loadStandards() {
    this.headers.set('origin', 'localhost')
    return this.http.get ('https://cors-anywhere.herokuapp.com/' + environment.standardEndpoint, this.options)
      .map((response: Response) => {
      const result = JSON.parse(response.text());
      this.setStandards(result['response']['docs']);
      }).catch((error: any) => Observable.throw(error.json().error ||  console.log('Server error')));

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
    return this.scenarios;
  }

  setScenarios(elt: any) {
     this.scenarios =  elt;
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

  setOptions(headers: Headers, params: URLSearchParams) {
    this.options = new RequestOptions({headers: this.headers, params: params});
  }

  setParams(fields: Array<string>) {
    this.params.delete('fields')
    this.params.append('fields', fields.toString());
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

  glossaryChange(item: string) {
    switch (item) {
      case 'objects':
        this.setGlossaryData(this.getObjects())
        break;
      case 'standards':
        this.setGlossaryData(this.getStandards())
        break;
      case 'techniques':
        this.setGlossaryData(this.getTechniques())
        break;
      case 'activities':
        this.setGlossaryData(this.getActivities())
        break;
      case 'disciplines':
        this.setGlossaryData(this.getDisciplines())
        break;
    }
    return this.getGlossaryData();
  }


  loadData () {
    let res: any;
    return new Promise ((resolve, reject) => {
        this.countItems('scenarios').subscribe(
          response => {
          res = response;
        },
        err => {},
        () => {
          this.setScenarioNumber(res['total']);
          this.setScenariosID(res['scenarios']);
          this.setScenariosTemp(new Array<any>(this.getScenarioNumber()));
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
          this.detailsResult = result;
        },
        error => {  },
        () => {
          this.addScenario(this.detailsResult);
          this.scenariosTemp.pop();
          this.setResultCount((this.getResultCount() + 1));
          if (this.getScenarios().length === this.getScenarioNumber()) {
            this.getAllSteps().subscribe(result => {},
              error => {},
              () => {
                this.getAllStepsMetaData().subscribe(
                  result => {   },
                  error => {  },
                  () => {
                    _.forEach(this.getSteps(), (step) => {
                      step['metadata'] = this.addStepMetadata(step._id);
                    });
                  } );
                this.getAllResources().subscribe(
                  result => {},
                  error => {  },
                  () => {}
                  );

                this.loadStandards().subscribe(result => {},
                  error => {},
                  () => {
                  });
                this.tags.forEach((obj)  => {
                  this.loadTermsFromServer(obj).subscribe(
                    result => {},
                    error => {},
                    () => {});
                });
              });
          }
        }
      );
   }, 1000);
  }
}
