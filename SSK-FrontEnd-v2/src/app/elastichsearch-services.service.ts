import { Injectable } from '@angular/core';
import {Http,  Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {flatMap} from "tslint/lib/utils";


@Injectable()
export class ElastichsearchServicesService {

  private sskBackendEndpoint = 'http://localhost:8080/ssk/';
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

}
