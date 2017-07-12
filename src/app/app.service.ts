import {  Injectable } from '@angular/core';  
import { Http, RequestOptions,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Scenario} from './ScenarioObject';

@Injectable()
export class AppService {  

    public scenario: Scenario;
    private result: Array<any> = [];

    constructor(private http: Http) {};

    fetchScenarios() { 
      return  this.http.get('/contents/scenarios')
            .map(response => response.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    };

    fetchScenario(scenarioName :String) { 
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Accept', 'application/vnd.github.VERSION.raw');
      return  this.http.get('/contents/scenarios/'+scenarioName, options)
            .map(response => response.text())
             .catch((error:any) => Observable.throw(error || 'Server error'));
    };
    

   
} 