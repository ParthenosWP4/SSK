import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { AppService } from './app.service';
import * as xml2js from 'xml2js';
import * as _ from "lodash"
import { Scenario } from './ScenarioObject';
import  * as jsPath from 'jsonpath';

@Component({
    selector: 'scenario',
    templateUrl: 'scenario.component.html'
})
export class ScenarioComponent implements OnInit, OnDestroy  {

    @Input() scenario: any;
    scenariosTab: any;
    scenarioElt: Scenario;
    private scenarioContent: {};
    constructor(private _appService: AppService) {
        this.scenarioElt = new Scenario();
        this.scenariosTab = new Array();
    }

    ngOnInit() {
        let _self = this;
        this._appService.fetchScenario(this.scenario.name)
            .subscribe(
            data => {
                var parser = new xml2js.Parser();
                parser.parseString(data, function (err, result) {
                    _self.scenarioContent = JSON.parse(JSON.stringify(result).replace(/\$/g, 'attr').replace(/xml:id/g, 'xmlId'));
                });
                //console.log(jsPath.query(_self.scenarioContent, "$..attr"));
                _self.scenarioElt.id = jsPath.query(_self.scenarioContent, '$..xmlId')[0];
                _self.scenarioElt.title = jsPath.query(_self.scenarioContent, '$..label[0]._')[0];
                _self.scenarioElt.desc = jsPath.query(_self.scenarioContent, '$..gloss[0]');
                _self.scenarioElt.steps = jsPath.query(_self.scenarioContent, '$..event')[0];
                
            },
            err => console.log(err)
            );
    }

    ngOnDestroy(){
        this._appService.scenario = this.scenarioElt
        console.log(this.scenarioElt);
    }
}

