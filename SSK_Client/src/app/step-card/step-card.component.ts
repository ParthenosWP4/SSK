import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import * as _ from 'lodash';
import {ElastichsearchService} from '../elastichsearch.service';
import {SskService} from '../ssk.service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.scss'],
})
export class StepCardComponent implements OnInit {

  @Input() step: any;
  scenario: any;
  public  shortTitle: any;
  public shortDesc: any;
  public scenarioTitle: any;
  public activities: any;
  public standards: any;
 
  constructor(private elasticServices: ElastichsearchService, private sskService: SskService,
              private router: Router, private ref: ChangeDetectorRef) {}

  ngOnInit() {
      this.setStepsInformations();
    const urlTag: Array<any>  = _.remove(this.step.metadata, (tag) => {
        return this.sskService.isUrl(tag.key);
    });
    Observable.of(urlTag).subscribe(
      result => {
        _.forEach(urlTag, (value) => {
          value['url'] = value.key;
          value.key = value.url.substr(value.url.lastIndexOf('/') + 1, value.url.length);
          const otherKey = value.key.split('=');
          if (otherKey.length > 0 ) {
            value.key = otherKey[otherKey.length - 1];
          }
          this.step.metadata.push(value);
        });
      },
      err => {},
      () => {}
    );
  }

  setStepsInformations() {
    if (this.step.head instanceof Array) {
      this.step.title = this.sskService.updateText(this.step.head[0], null);
    } else if (this.step['head'] !== null) {
      this.step.title = this.sskService.updateText(this.step.head, null);
    }
    if (this.step['stepDesc'] !== undefined) {
      this.step.description  = this.step.stepDesc[0]['content'];
    }
    if (this.step.metadata === undefined) {
      this.step.metadata = this.elasticServices.addStepMetadata(this.step._id + this.step.position + 'Meta');
    }
  }

  getScenarioTitle(scenarioId: string) {
    let scenaTitle: string;
    Observable.of(_.find(this.elasticServices.getScenarios(), (o)  => {
      return   o.id === scenarioId;
    })).subscribe(
           (value) => {
             if (value !== undefined) {
              if (value.title instanceof Array) {
                scenaTitle = this.sskService.updateText(value.title[0], null);
              } else {
                scenaTitle = this.sskService.updateText(value.title, null);
              }
            }
          },
        (error) => { console.log(error); },
        () => {
          
        });
        return scenaTitle;
  }



  toStep() {
    //this.router.navigate(['/', 'scenarios', this.scenario.id,  this.step.position]);
    this.router.navigate(['/', 'scenarios', this.scenario.id]);
  }

  tagShow(tag: any) {
    if (tag['abbr'] !== undefined ) {
      tag.key = tag.abbr;
    }
    if ( this.sskService.isUrl(tag.key)) {
      tag.url  = tag.key;
      tag.key = tag.url.substr(tag.url.lastIndexOf('/') + 1, tag.url.length);
      const otherKey = tag.key.split('=');
      if (otherKey.length > 0) {
        tag.key = otherKey[otherKey.length - 1];
      }
    }
      return tag;
    }
}
