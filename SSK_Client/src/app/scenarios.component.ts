import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppService} from './app.service';

@Component({
    selector: 'home',
    "styles": [
        "../../node_modules/font-awesome/css/font-awesome.css"
      ],
    templateUrl: './scenarios.component.html',
})
export  class ScenariosComponent implements OnInit {

    private scenarios: Array<any> = [];
    public  scenarioObjects: Array<any> = [];

    constructor(
      private router: Router,
      private _appService: AppService
    ) {}

    ngOnInit() {
    const _self = this;

    if ( this._appService._scenarioList.length > 0) {
      console.log(this._appService._scenarioList)
      this.scenarios = this._appService._scenarioList
    }
   // tslint:disable-next-line:one-line
   else {
      this._appService.getScenarios()
        .subscribe(
                data => {console.log(data) ; this._appService._scenarioList = data; _self.scenarios = data; },
                err => { console.log(err); }
        );
    }
  }

  onSelect(id: number) {
    this.router.navigate(['/scenario', id]);
  }


  getScenarios() {
    return this.scenarios;
  }

}
