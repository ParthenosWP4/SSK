import {Component, Input, OnInit} from '@angular/core';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import {SskServicesService} from '../ssk-services.service';
import * as _ from 'lodash';
import * as $ from 'jquery';
import * as Fuse from 'fuse-js-latest';
import {ScenariosComponent} from '../scenarios/scenarios.component';
import {isUndefined} from 'util';


@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.scss']
})
export class SearchTabComponent implements OnInit {

  @Input() data: any;
  public activityCaret = 'fa-caret-up';
  public disciplines = 'fa-caret-up';
  public techniques = 'fa-caret-up';
  private options = {};
  public tags = ['disciplines', 'activities', 'techniques', 'objects' , 'standards'] ;

  private results = [];
  private scenarioResults = [];
  private stepsResults = [];
  private resourcesResults = [];

  constructor(private elasticSearchServ: ElastichsearchServicesService,
              private ssKServices: SskServicesService,
              private scenarioComponent: ScenariosComponent) { }

  searchData = {};




  ngOnInit() {
    this.options = this.ssKServices.options;
  }

  change(e, content: any) {
    let tag: string
    if ( ! isUndefined(content.standard_abbr_name)) {
      tag = content.standard_abbr_name;
    } else {
      tag = content.term;
    }

    console.log(this.ssKServices.scenarioKeys)

    let  fuse ;
    if ($("input[name = '" + tag + "']").is(':checked')
      &&  _.findIndex(this.ssKServices.getFilters(), function(o) { return o === tag; } ) === -1 ) {
      this.ssKServices.addToFilters(tag);

      if ( this.scenarioComponent.tabScenarios) {
        this.options['keys'] =  this.ssKServices.scenarioKeys;

        fuse = new Fuse(this.elasticSearchServ.getScenarios(), this.options);
        this.results[tag] =  fuse.search(tag);
        this.scenarioResults = _.concat(this.scenarioResults, this.results[tag])
        this.scenarioComponent.scenarios = _.uniqBy(this.scenarioResults, 'id');
        this.scenarioComponent.resultCount = this.scenarioComponent.scenarios.length;
      }

      if (this.scenarioComponent.tabStep) {
        this.options['keys'] = this.ssKServices.stepsKeys;
        fuse = new Fuse(this.elasticSearchServ.getSteps(), this.options);
        this.results[tag] =  fuse.search(tag);
        this.stepsResults = _.concat(this.stepsResults, this.results[tag]);
        this.scenarioComponent.setSteps(_.uniqBy(this.stepsResults, 'id'))  ;
        console.log(this.scenarioComponent.getSteps())
        this.scenarioComponent.resultCount = this.scenarioComponent.getSteps().length;
      }

      if (this.scenarioComponent.tabRes) {
        this.options['keys'] = this.ssKServices.resourcesKeys;
        fuse = new Fuse(this.scenarioComponent.resources, this.options);
        this.results[tag] =  fuse.search(tag);
        this.resourcesResults = _.concat(this.elasticSearchServ.getResources(), this.results[tag]);
        this.scenarioComponent.resources = _.uniqBy(this.resourcesResults, 'id');
        this.scenarioComponent.resultCount = this.scenarioComponent.resources.length;
      }
    }else {
        console.log()
      _.remove(this.ssKServices.getFilters(), function (v) {
        return v === tag;
      });

      if (this.scenarioComponent.tabScenarios) {
        this.options['keys'] =  this.ssKServices.scenarioKeys
        fuse = new Fuse(this.elasticSearchServ.getScenarios(), this.options);
        this.results[tag] =  fuse.search(tag);
        this.scenarioResults = _.differenceWith(this.scenarioResults, this.results[tag] , _.isEqual);
        this.scenarioComponent.scenarios = _.uniqBy(this.scenarioResults, 'id');
        this.scenarioComponent.resultCount = this.scenarioComponent.scenarios.length;
      }

      if (this.scenarioComponent.tabStep) {
        this.options['keys'] = this.ssKServices.stepsKeys;
        console.log(this.elasticSearchServ.getSteps());
        fuse = new Fuse(this.elasticSearchServ.getSteps(), this.options);
        this.results[tag] =  fuse.search(tag);
        this.stepsResults = _.differenceWith(this.stepsResults, this.results[tag] ,   _.isEqual);
        this.scenarioComponent.setSteps(_.uniqBy(this.stepsResults, 'id'));
        this.scenarioComponent.resultCount = this.scenarioComponent.getSteps().length;
      }


      if (this.scenarioComponent.tabRes) {
        this.options['keys'] = this.ssKServices.resourcesKeys;
        fuse = new Fuse(this.scenarioComponent.resources, this.options);
        this.results[tag] =  fuse.search(tag);
        this.resourcesResults = _.differenceWith(this.resourcesResults, this.results[tag] , _.isEqual);
        this.scenarioComponent.resources = _.uniqBy(this.resourcesResults, 'id');
        this.scenarioComponent.resultCount = this.scenarioComponent.resources.length;
      }


    }

    if ( this.ssKServices.getFilters().length === 0 ) {

      if (this.scenarioComponent.tabScenarios) {
        this.scenarioComponent.scenarios = this.elasticSearchServ.getScenarios();
        this.scenarioComponent.resultCount = this.elasticSearchServ.getScenarios().length;
      }

      if (this.scenarioComponent.tabStep) {
        this.scenarioComponent.setSteps(this.elasticSearchServ.getSteps());
        this.scenarioComponent.resultCount = this.scenarioComponent.getSteps().length
      }

      if (this.scenarioComponent.tabRes) {
        this.scenarioComponent.resources = this.elasticSearchServ.getResources();
        this.scenarioComponent.resultCount = this.scenarioComponent.resources.length;
      }

    }


  }

  /*reverse(type: string) {
    switch (type) {
      case 'activities':
        this.activities = (this.activities === 'fa-caret-down') ? 'fa-caret-up'  : 'fa-caret-down';
      break;
      case 'disciplines':
        this.disciplines = (this.disciplines === 'fa-caret-down') ? 'fa-caret-up'  : 'fa-caret-down';
      break;
      case 'techniques':
        this.techniques = (this.techniques === 'fa-caret-down') ? 'fa-caret-up'  : 'fa-caret-down';
      break;
    }
    //this.faCaret = identifier + ' fa-caret-down';
  }*/

  normalize(text: string ) {
    if (!isUndefined(text)) {
      text = text.replace('_', ' ');
    }
    return text;
  }
}
