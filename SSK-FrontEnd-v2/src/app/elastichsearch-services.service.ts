import { Injectable } from '@angular/core';
import {Http,  Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {environment} from "../environments/environment";


@Injectable()
export class ElastichsearchServicesService {

  private sskBackendEndpoint = environment.sskBackendEndpoint
 //private sskBackendEndpoint = 'http://localhost:9000/ssk_services-0.0.1/';
  private headers = new Headers({'Content-Type': 'application/json'});

  private scenarioNumber: number;
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
  private tags = ['discipline', 'objects', 'techniques', 'activity', 'standards'] ;
  private regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

  constructor(private http: Http) {
    this.scenarios = new Array();
    this.params = new URLSearchParams();
    this.params.append('fromSSK', 'true');
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set('Access-Control-Allow-Methods', 'GET');
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
        this.setStepNumber(result['total']);
        this.setSteps(result['steps'])
        this.getAllStepsMetaData();

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

    this.setActivities(_.uniq(_.map(Object.keys(_.groupBy(_.flattenDeep(_.map(_.map(this.getStepsMetadata(), '_source'), 'activity'))
      , 'key')), v => this.tagSanitize(v.toLowerCase()).replace(/[0-9]/g, '').replace('_', '').trim())));

   this.setObjects(_.map(Object.keys(_.groupBy(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.getStepsMetadata(), '_source'), 'objects'),
      function(n) { return !isUndefined(n); })), 'type').object, 'key')), item => item.toLowerCase()));

    this.setTechniques(_.map(Object.keys(_.groupBy(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.getStepsMetadata(), '_source'),
      'objects'), function(n) { return !isUndefined(n); })), 'type').technique, 'key')), item => item.toLowerCase()));

    this.setStandards(_.concat(Object.keys(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.getStepsMetadata(), '_source'),
      'standards'),  function(n) { return !isUndefined(n); })), 'abbr')), Object.keys(_.groupBy(_.flattenDeep(_.remove(_.map(
      _.map(this.getStepsMetadata(), '_source'), 'standards'), function(n) { return !isUndefined(n); })), 'key'))));

  }

  tagSanitize(tag: string) {
        tag = tag.substr(tag.lastIndexOf('/') + 1, tag.length);
        const otherKey = tag.split('=');
        if (otherKey.length > 0) {
          tag = otherKey[otherKey.length - 1];
        }
      return tag;
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
    console.log(url);
    this.setOptions(this.headers, null);
    return this.http.get ('https://cors-anywhere.herokuapp.com/' + url, this.options)
      .map((response: Response) => {
        console.log(response.headers);
      }).catch((error: any) => Observable.throw( console.log(error.json()) || console.log('Server error')));
  }

  setResearchFacettes(){

    let data = this.getAllStepsMetaData()[0]._source;

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

}
