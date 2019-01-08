import { Component, Injector, OnInit, Input} from '@angular/core';
import { AppService } from './app.service';
import {Subscription} from 'rxjs/Subscription';
import * as _ from "lodash"



@Component({
    selector: 'step-resources',
    templateUrl: 'step-resources.component.html',
})
export class StepResourcesComponent  implements OnInit {

    @Input() stepContent: any;
    //stepContent : any
    subscription: Subscription;

    constructor(private _appService:AppService){}

    ngOnInit(){
        if(JSON.stringify(this._appService._stepArray) == '{}'){
			this._appService.getStepContent(this.stepContent.ref)
				.subscribe(data => {
                    this.stepContent  = data
                   //Object.assign(this.stepContent , this._appService.handleStepContent(data))
                },
            	err => console.log(err),
            );
		}
		else{
			this.stepContent = this._appService._stepArray[this.stepContent.ref];
		}
    }

    isObjectEmpty(card) {
        if ( card === undefined) return true
        else return false
     }
}