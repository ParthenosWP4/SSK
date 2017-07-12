import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import '../main.js';
import {Scenario} from './ScenarioObject';
import { AppService } from './app.service';

@Component({
    selector: 'scenario-details',
    templateUrl: './scenario-details.component.html',
    styleUrls: ['../timeline.scss']
})


export class ScenarioDetailsComponent implements OnInit{

    scenarioElt : Scenario;
    left : number;
    constructor(private route: ActivatedRoute, private router: Router, private _appService:AppService) {
        this.left = 170;
    }

    ngOnInit() {
        this.scenarioElt = this._appService.scenario;
        console.log(this.scenarioElt);
    }


    trackStep(index, step){
        console.log(index);
    }

}