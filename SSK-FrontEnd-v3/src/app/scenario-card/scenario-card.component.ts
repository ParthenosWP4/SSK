import {Component, Input, OnInit} from '@angular/core';
import {SskServicesService} from '../ssk-services.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  selector: 'app-scenario-card',
  templateUrl: './scenario-card.component.html',
  styleUrls: ['./scenario-card.component.scss']
})
export class ScenarioCardComponent implements OnInit {

  @Input() scenario: any;
  public title: any
  public desc: any
  public metadata: Array<any> = new Array();
  public metadataPart1: Array<any> = new Array();
  public metadataPart2: Array<any>
  public defaultImage: string;
  public shortTitle: any = {}
  public shortDesc: any = {}

  constructor(private sskServices: SskServicesService,  private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {



    if (this.scenario.title instanceof Array) {
      this.title = this.scenario.title[0];
    } else {
      this.title = this.scenario.title;
    }
    this.shortTitle = this.sskServices.shorten(this.title, 99);

    if (this.scenario.image === null || this.scenario.image === 'null' ||  this.scenario.image === undefined) {
      this.defaultImage = '../../assets/images/ssk_logo.svg';
    }

    if (this.scenario.desc instanceof Array) {
      this.desc = this.scenario.desc[0];
    } else {
      this.desc = this.scenario.desc;
    }
    this.shortDesc = this.sskServices.shorten(this.desc, 250);


    if (this.scenario.scenario_metadata.objects instanceof Array ) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.objects);
    }

    if (this.scenario.scenario_metadata.discipline instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.discipline);
    }

    if (this.scenario.scenario_metadata.activity instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.activity);
    }

    if (this.scenario.scenario_metadata.techniques instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.techniques);
    }

    if (this.scenario.scenario_metadata.standards instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.standards);
    }



    this.metadata = _.forEach(this.metadata, function(value) {
      switch (value.type) {
        case 'objects':
          value.type = 'object'
        break;
        case 'disciplines':
          value.type = 'discipline'
        break;
        case 'techniques':
        case 'technique':
          value.type = 'technique'
        break;
        case 'datatype':
          value.type = 'object'
        break;
        case 'activities':
          value.type = 'activity'
        break;
        case 'standards':
          value.type = 'standard'
        break;
      }
    });

    if (this.metadata.length > 5) {
      this.metadataPart2 = this.metadata.slice(4, this.metadata.length );
    }
    this.metadataPart1 = this.metadata.slice(0, 3);
  }



  goToScenario(scenarioId: string) {
    this.router.navigate(['scenarios', scenarioId, 1]);
  }

  getInnerHTMLValue(text: string ) {
    return this.domSanitizer.bypassSecurityTrustHtml(text);
  }



}
