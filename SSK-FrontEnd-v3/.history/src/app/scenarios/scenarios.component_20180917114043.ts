import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import { Router} from '@angular/router';
import {isUndefined} from 'util';
import * as _ from 'lodash';
import * as Fuse from 'fuse-js-latest';
import {SskServicesService} from '../ssk-services.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss']
})


export class ScenariosComponent implements OnInit {

  searchPlaceholder = 'Scenarios, steps or resources';
  active = 'scenarios';
  tabList: any = {};
  contentCol = 'col-lg-12';
  collapse = '';
  scenarios: any[];
   steps: any[];
  resources: any[];
  selectTab: string;
  error: string;
  p  = 1;
  title: boolean;
  border: any = {
    'class' : 'col-1',
    'border' : '1px solid #979797'
  } ;
  searchData = {};
  filters = {};
  tabStep  = false;
  tabScenarios  = true;
  tabRes = false;
  private options;
  private results = [];
  private scenarioResults = [];
  private stepsResults = [];
  private resourcesResults = [];
  resultCount = 0
  constructor(
    private elasticServices: ElastichsearchServicesService,
    private sskServices: SskServicesService,
    public el: ElementRef,
    private router: Router) {

  }

  ngOnInit() {
    if (this.router.url.includes('steps')) {
        this.active = 'steps';
    } else if (this.router.url.includes('resources')) {
      this.active = 'resources';
    } else {
      this.active = 'scenarios';
    }
    this.loadContents(this.active);
    this.sskServices.checkBackEndAvailability();
    if (this.sskServices.getStatusError() === null ) {
      this.sskServices.setTitle('SSK - Scenarios');
    }
    this.filters = this.sskServices.getFilters();
    this.options = this.sskServices.options;
    this.tabList = this.sskServices.browseItems;
    this.selectTab = this.tabList[0];
      this.scenarios = this.elasticServices.getScenarios();
      this.searchData['disciplines'] = this.elasticServices.getDisciplines();
      this.searchData['activities'] = _.flattenDeep(_.map(_.map(this.elasticServices.getActivities(), 'list'), 'item'));
      this.searchData['techniques'] = this.elasticServices.getTechniques();
      this.searchData['objects'] = this.elasticServices.getObjects();
      this.searchData['standards'] = this.elasticServices.getStandards();
      this.resultCount = this.elasticServices.getResultCount();

 }

  onKey(event: any) { // without type info
    console.log(event);
    if (event.target.value.length >= 3 ) {
      this.search(event.target.value);
    }else {
      this.searchInit();
    }

  }

  searchInit() {
    if (this.tabScenarios) {
      this.scenarios = this.elasticServices.getScenarios();
      this.resultCount = this.elasticServices.getScenarios().length;
    }

    if (this.tabStep) {
      this.setSteps(this.elasticServices.getSteps());
      this.resultCount = this.getSteps().length;
    }

    if (this.tabRes) {
      this.resources = this.elasticServices.getResources();
      this.resultCount = this.resources.length;
    }
  }

  searchTab() {
    this.resize();
  }

  search(tag: string) {

    let  fuse ;

    if ( this.tabScenarios) {
      this.options['keys'] =  this.sskServices.scenarioKeys;
      fuse = new Fuse(this.elasticServices.getScenarios(), this.options);
      this.results[tag] =  fuse.search(tag.trim());
      this.scenarioResults = _.concat(this.scenarioResults, this.results[tag])
      this.scenarios = _.uniqBy(this.scenarioResults, 'id');
      this.resultCount = this.scenarios.length;
    }

    if (this.tabStep) {
      this.options['keys'] = this.sskServices.stepsKeys;
      fuse = new Fuse(this.elasticServices.getSteps(), this.options);
      this.results[tag] =  fuse.search(tag.trim());
      this.stepsResults = _.concat(this.stepsResults, this.results[tag]);
      this.setSteps(_.uniqBy(this.stepsResults, 'id'))  ;
      this.resultCount = this.getSteps().length;
    }

    if (this.tabRes) {
      this.options['keys'] = this.sskServices.resourcesKeys;
      fuse = new Fuse(this.resources, this.options);
      this.results[tag] =  fuse.search(tag.trim());
      this.resourcesResults = _.concat(this.resourcesResults, this.results[tag]);
      this.resources = _.uniqBy(this.resourcesResults, 'id');
      this.resultCount = this.resources.length;
    }




  }

  toggle(item: string) {
    console.log(item)
    this.selectTab = item;
    this.active = item;
    if (item === 'scenarios') {
      this.router.navigate([{ outlets: { target: null }}]);
      if (this.elasticServices.getScenarioNumber() === 0) {
        this.router.navigate([{ outlets: { target: null }}]);
      }
      this.elasticServices.setResultCount(this.elasticServices.getScenarioNumber());
    } else {
      this.loadContents(item);
      this.router.navigate([{ outlets: { target : item}}]);
    }
  }

  private resize() {
    if (this.contentCol === 'col-lg-9') {
      this.contentCol = 'col-lg-12';
    }  else {
      this.contentCol = 'col-lg-9';
    }
  }

  loadContents(type: string) {
        switch (type) {
          case 'steps':
            this.sskServices.setTitle('SSK - Steps');
            this.steps = new Array();
            if (isUndefined(this.elasticServices.getSteps())) {
              setTimeout(() => {
                this.elasticServices.getAllSteps();
                this.steps = this.elasticServices.getSteps();
                this.elasticServices.setResultCount(this.elasticServices.getSteps().length);
                this.tabStep = true;
                this.tabRes = false ;
                 this.tabScenarios = false;
              }, 3000);
            }else {
                
            }
            break;
          case 'resources':
            this.sskServices.setTitle('SSK - Resources');
            this.tabStep = false;
            this.tabRes = true;
            this.tabScenarios = false;
            this.resources = this.elasticServices.getResources();
            this.elasticServices.setResultCount(this.elasticServices.getResourceCount());
            this.resultCount = this.elasticServices.getResourceCount();
            break;
        }
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if ( !isUndefined(this.scenarios) &&  this.scenarios.length  < this.elasticServices.getScenarioNumber() 
    && scrollPosition >= componentPosition) {
      const  elt: any = {};
      if (!isUndefined(this.elasticServices.getscenariosTemp().length)  && this.elasticServices.getscenariosTemp().length === 1) {
        this.elasticServices.getscenariosTemp().pop();
      }
    } else if ( this.scenarios.length >= this.elasticServices.getScenarioNumber()) {

    }
  }

  remove(tag: string) {
    console.log(tag)
    let fuse;
    _.remove(this.sskServices.getFilters(), function (v) {
      return v === tag;
    });
    $('#' + tag).prop('checked', false);

    if (this.tabScenarios) {
      this.options['keys'] =  this.sskServices.scenarioKeys
      fuse = new Fuse(this.elasticServices.getScenarios(), this.options);
      this.results[tag] =  fuse.search(tag);
      this.scenarioResults = _.differenceWith(this.scenarios, this.results[tag]    , _.isEqual);
      this.scenarios = _.uniqBy(this.scenarioResults, 'id');
      this.resultCount = this.scenarios.length;
    }

    if (this.tabStep) {
      this.options['keys'] = this.sskServices.stepsKeys;
      fuse = new Fuse(this.elasticServices.getSteps(), this.options);
      this.results[tag] =  fuse.search(tag);
      this.stepsResults = _.differenceWith(this.steps, this.results[tag] ,   _.isEqual);
      this.steps = _.uniqBy(this.stepsResults, 'id');
      this.resultCount = this.steps.length;
    }


    if (this.tabRes) {
      this.options['keys'] = this.sskServices.resourcesKeys;
      fuse = new Fuse(this.resources, this.options);
      this.results[tag] =  fuse.search(tag);
      this.resourcesResults = _.differenceWith(this.resources, this.results[tag] , _.isEqual);
      this.resources = _.uniqBy(this.resourcesResults, 'id');
      this.resultCount = this.resources.length;
    }

    if ( this.sskServices.getFilters().length === 0 ) {

      if (this.tabScenarios) {
        this.scenarios = this.elasticServices.getScenarios();
        this.resultCount = this.scenarios.length;
      }

      if (this.tabStep) {
        this.steps = this.elasticServices.getSteps();
        this.resultCount = this.steps.length;
      }

      if (this.tabRes) {
        this.resources = this.elasticServices.getResources();
        this.resultCount = this.resources.length;
      }

    }
  }

setStepTab() {
  this.steps = this.elasticServices.getSteps();
  this.elasticServices.setResultCount(this.elasticServices.getSteps().length);
  this.tabStep = true;
  this.tabRes = false ;
  this.tabScenarios = false;
}


  setSteps(elts: any) {
    this.steps = elts;
  }

  getSteps() {
    return this.elasticServices.getSteps();
  }

  getScenarios() {
    return this.elasticServices.getScenarios();
  }

  getResources() {
    return this.elasticServices.getResources();
  }

  getResultCount() {
      return this.elasticServices.getResultCount();
  }

  getScenarioTemp() {
    return this.elasticServices.getscenariosTemp();
  }

  getStepScenario(step: any) {
    return _.find(this.elasticServices.getScenarios(), (o)  => {
      return o.id === step.parent; });
  }

  setResultCount(elt: number ) {
    this.resultCount = elt;
  }

}



