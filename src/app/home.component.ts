import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppService} from './app.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export  class HomeComponent implements OnInit{

    private scenarios: Array<any> = [];
    public  scenarioObjects:Array<any> = [];

    constructor(
      private router: Router,
      private _appService: AppService
    ) {}


  ngOnInit(){
    let _self = this;
    this._appService.fetchScenarios()
    .subscribe(
            comments => {_self.scenarios = comments;
            _self.otherFunction(_self.scenarios);}, //Bind to view
            err => { console.log(err);}
            );
    //console.log(this.scenarios)
  }

  onSelect(id: number) {
    this.router.navigate(['/scenario', id]);
  }

  
  otherFunction(scenarios: Array<any>){
    for (let entry of scenarios) {
      //console.log(entry); // 1, "string", false
    }
  }

}
