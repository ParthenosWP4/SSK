import { Component, Injector, OnInit, Input, OnDestroy} from '@angular/core';
import { AppService } from './app.service';
import {ScenariosComponent} from './scenarios.component'
import * as xml2js from 'xml2js';
import * as _ from 'lodash'
import { Scenario } from './ScenarioObject';
import * as jsPath from 'jsonpath';
import * as $ from 'jquery';

@Component({
    selector: 'scenario',
    templateUrl: 'scenario.component.html'
})
export class ScenarioComponent implements OnInit  {

    @Input() scenario: any;
    scenariosTab: any;
    scenarioElt: Scenario;
    parentComponent: ScenariosComponent;
    private scenarioContent: {};
    constructor(private _appService: AppService, private inj: Injector) {
        this.parentComponent = this.inj.get(ScenariosComponent);
        this.scenarioElt = new Scenario();
        this.scenariosTab = new Array();
    }

    ngOnInit() {
        console.log(this.scenario.name)
        const _self = this;
        /*const index = _.findIndex(this._appService._scenarioList, function(o) { return o.name === _self.scenario.name });
        // _.findIndex(this._appService._scenario, ['name', _self.scenario.name]);

        console.log(index)
        if (index === undefined) {*/
            this._appService.getScenario(_self.scenario.name)
            .subscribe(
                 data => {
                    _self.scenarioElt = this._appService.createObject(data, _self.scenario.name) ;
                    _self.scenarioElt.shortTitle = this.shorten(_self.scenarioElt.title, 35, false)
                    _self.scenarioElt.shortDesc = this.shorten(_self.scenarioElt.desc, 55 * 6, true)
                    if ( !_self.scenarioElt.urlImage) {
                        _self.scenarioElt.urlImage = "assets/images/no-img.jpeg"
                    }
                  //  _self.removeDiv(_self.scenarioElt.name, _self.scenarioElt.title.en === undefined)
                },
                 err => console.log(err),
            );
       /* else {
            this.scenarioElt = this._appService._scenarioList[index]
            console.log(this.scenarioElt)
           //_self.removeDiv(_self.scenarioElt.name, _self.scenarioElt.title === undefined);
        }
       //$('[data-toggle="tooltip"]').tooltip();*/
    }

    removeDiv(identifier: String, remove: boolean) {
       const i =  _.findIndex(this.parentComponent.getScenarios(), function(o) { return o.name === identifier; });
       if ( remove ) {$('#div_' + i).remove(); }
    }

    shorten(content: any, length: number, type: boolean) {
        for (const key in content) {
            if (content[key].length > length) {
                content[key] = content[key].substring(0, length) + '...';
            }else if (type){
                const  x = (330 - (content[key].length)) / 55;
                for (let i = 0; i < x; i ++) {
                    content[key] += "\n";
                }
            }
        }
        return content
    }
}

