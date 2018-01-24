import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppService} from './app.service';
import * as _ from 'lodash'
@Component({
    templateUrl: 'step-list.component.html'
})

export  class StepListComponent implements OnInit {

    private  content: any
    constructor( private _appService: AppService) {}

    ngOnInit() {
        if (!_.isEmpty(this._appService.constentList)) {
            return this._appService.constentList
        } else {
            this._appService.getList().subscribe(data => {
                    this.content = data;
                    console.log(this.content)
                },
                err => console.log(err),
            );
        }



    }
}
