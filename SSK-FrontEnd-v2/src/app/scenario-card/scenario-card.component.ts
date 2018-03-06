import {Component, Input, OnInit} from '@angular/core';
import {isUndefined} from "util";
import {SskServicesService} from "../ssk-services.service";

@Component({
  selector: 'app-scenario-card',
  templateUrl: './scenario-card.component.html',
  styleUrls: ['./scenario-card.component.scss']
})
export class ScenarioCardComponent implements OnInit {

  @Input() scenario: any;
  private title: any
  private desc: any
  private metadata: Array<any> = new Array();
  private defaultImage: string;
  private shortTitle: any = {}
  private shortDesc: any = {}
  constructor(private sskServices: SskServicesService) { }

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
  }



}
