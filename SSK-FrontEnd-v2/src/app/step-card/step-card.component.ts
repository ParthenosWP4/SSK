import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import {SskServicesService} from '../ssk-services.service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.scss']
})
export class StepCardComponent implements OnInit {

  @Input() step: any;
  @Input() scenario: any;
  public  shortTitle: any
  public shortDesc: any
  public scenarioTitle: any
  //public scenario: any

  constructor(private elastichServices: ElastichsearchServicesService, private sskServices: SskServicesService,  private router: Router) { }

  ngOnInit() {

    if (this.step.head instanceof Array) {
      this.step.title = this.step.head[0];
    } else {
      this.step.title = this.step.head;
    }
    this.shortTitle = this.sskServices.shorten(this.step.title, 57);

    if ( this.step.desc instanceof Array) {
          // 'description' is new field
          this.step.description = this.step.desc[0];
    } else {
        this.step.description = this.step.desc;
    }
    const content: any  = this.step.description.content;
    if (!isUndefined(content)) {
      this.shortDesc = this.sskServices.shorten(this.step.description, 470);
    }

    if (this.scenario.title instanceof Array) {
      this.scenarioTitle = this.scenario.title[0];
    } else {
      this.scenarioTitle = this.scenario.title;
    }

    //this.step['metadata'] = this.sskServices.addStepMetadata(this.step._id);

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
  }

  toStep() {
    this.router.navigate(['/', 'scenarios', this.scenario.id,  this.step.position]);
  }




}
