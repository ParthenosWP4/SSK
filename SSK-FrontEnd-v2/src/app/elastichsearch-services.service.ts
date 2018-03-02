import { Injectable } from '@angular/core';
import {Http,  Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ElastichsearchServicesService {

  private sskBackendEndpoint = 'http://localhost:8080/ssk/';
  private headers = new Headers({'Content-Type': 'application/json'});

  private scenarioNumber: number;
  private scenariosId: any;
  private stepNumber: any;
  private steps: any;
  private scenarios: any[];


  constructor(private http: Http) {
  this.scenarios = new Array();
  }


  countItems(type: string): Observable<any> {
    const fields: Array<string> = ['count'];
    const params = new URLSearchParams();
    params.append('fromSSK', 'true');
    params.append('fields', fields.toString())
   const options = new RequestOptions({headers: this.headers, params: params});
    return this.http.get(this.sskBackendEndpoint + type, options)
      .map((response: Response) => {
        return JSON.parse(response.text());
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getScenarioDetails(scenarioId: string): Observable<any> {
    const fields: Array<string> = ['title', 'desc', 'image', 'scenario_metadata'];
    const params = new URLSearchParams();
    params.append('fields', fields.toString())
    const options = new RequestOptions({headers: this.headers, params: params});
    return this.http.get(this.sskBackendEndpoint + 'scenario/' + scenarioId, options)
      .map((response: Response) => {
        return JSON.parse(response.text());
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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
}
