import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import * as _ from 'lodash';
import {ElastichsearchService} from '../elastichsearch.service';
import {SskService} from '../ssk.service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.scss'],
  //changeDetection: ChangeDetectionStrategy.Default
})
export class StepCardComponent implements OnInit {

  @Input() step: any;
  @Input() scenario: any;
  public  shortTitle: any;
  public shortDesc: any;
  public scenarioTitle: any;
  public activities: any;
  public standards: any;
 
  constructor(private elastichServices: ElastichsearchService, private sskServices: SskService,
              private router: Router, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.step.head instanceof Array) {
      this.step.title = this.sskServices.updateText(this.step.head[0], null);
    } else {
      this.step.title = this.sskServices.updateText(this.step.head, null);
    }
    if ( this.step.desc instanceof Array) {
          this.step.description = this.sskServices.updateText(this.step.desc[0], null);
    } else {
        this.step.description = this.sskServices.updateText(this.step.desc, null);
    }
    if (this.scenario.title instanceof Array) {
      this.scenarioTitle = this.sskServices.updateText(this.scenario.title[0], null);
    } else {
      this.scenarioTitle = this.sskServices.updateText(this.scenario.title, null);
    }

    const urlTag: Array<any>  = _.remove(this.step.metadata, (tag) => {
        return this.sskServices.isUrl(tag.key);
    });

    _.forEach(urlTag, (value) => {
      value['url'] = value.key;
      value.key = value.url.substr(value.url.lastIndexOf('/') + 1, value.url.length);
      const otherKey = value.key.split('=');
      if (otherKey.length > 0 ) {
        value.key = otherKey[otherKey.length - 1];
      }
      this.step.metadata.push(value);
    });

   /* this.step.metadata = _.map(this.step.metadata,  (x)  => {
      if (this.sskServices.isUrl(x.source) && x.source.includes('tadirah')) {
        x.source = 'Tadirah';
      }
      if (isUndefined(x.type) || (x.type).includes('[')) {
        x.type = 'standard';
      }
      return x;
    });*/
    //this.ref.detectChanges();
   }
  
  toStep() {
    this.router.navigate(['/', 'scenarios', this.scenario.id,  this.step.position]);
  }
}
