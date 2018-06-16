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
  resultCount =  0
  constructor(
    private elasticServices: ElastichsearchServicesService,
    private sskServices: SskServicesService,
    public el: ElementRef,
    private router: Router) {

  }

  ngOnInit() {
    this.sskServices.setTitle('SSK - Scenarios')
    this.filters = this.sskServices.getFilters();
    this.options = this.sskServices.options;
    this.router.navigate([{outlets: {target: null}}]);
    this.tabList = this.sskServices.browseItems;
    this.selectTab = this.tabList[0];
     //setTimeout(() => {


        this.scenarios = this.elasticServices.getScenarios();
        this.searchData['disciplines'] = this.elasticServices.getDisciplines();
        this.searchData['activities'] = _.flattenDeep(_.map(_.map(this.elasticServices.getActivities(), 'list'), 'item'));
        this.searchData['techniques'] = this.elasticServices.getTechniques();
        this.searchData['objects'] = this.elasticServices.getObjects();
        this.searchData['standards'] = this.elasticServices.getStandards();
        this.resultCount = this.elasticServices.getResultCount();
    console.log(this.elasticServices.getResultCount()
    );
    //  }, 1000);

      /*this.elasticServices.countItems('scenarios').subscribe(
        result => {
          this.elasticServices.setScenariosID(result['scenarios']);
          this.elasticServices.setScenarioNumber(result['total']);
          this.scenariosTemp = new Array<any>(this.elasticServices.getScenarioNumber());
          this.elasticServices.getScenariosID().forEach((obj)  => {
            this.asynchFunction(obj);
          });
        }, error => {
          this.error = '500 - Internal Server Error';
        },
        () => {
          this.scenarios = this.elasticServices.getScenarios();
          this.elasticServices.getAllSteps().subscribe(result => {},
            error => {},
            () => {
              this.loadStepsMetaData();
              this.loadResources();
              this.resultCount = this.elasticServices.getScenarios().length;
            });
        });
    } else {
      this.resultCount = this.elasticServices.getScenarios().length;
      this.scenarios = this.elasticServices.getScenarios();
    }*/
  }
   /*asynchFunction(scenario: any) {
     setTimeout(() => {
       this.elasticServices.getScenarioDetails(scenario._id).subscribe(
         result => {
            result.id = scenario._id;
            this.detailsResult = result;
         },
         error => { this.error = '500 - Internal Server Error'; },
         () => {
           this.elasticServices.addScenario(this.detailsResult);
           this.scenariosTemp.pop();
           this.resultCount += 1;
           if (this.scenarios.length === this.elasticServices.getScenarioNumber()) {
             this.elasticServices.setObjects(_.uniqBy(_.concat(this.elasticServices.getObjects(),
               _.map(Object.keys(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.elasticServices.getScenarios(), 'scenario_metadata'),
                 'objects'), function(n) { return !isUndefined(n); })), 'key')), v => v.toLowerCase()))));

             this.elasticServices.setDisciplines(_.map(Object.keys(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(
               this.elasticServices.getScenarios(), 'scenario_metadata'), 'discipline'), function(n) {
               return !isUndefined(n); })), 'key')), v => v.replace(/\s+/g, ' ')));

             this.elasticServices.setTechniques(_.uniqBy(_.concat(this.elasticServices.getTechniques(),
               _.map(Object.keys(_.groupBy(_.flattenDeep(_.remove(_.map(_.map(this.elasticServices.getScenarios(), 'scenario_metadata'),
                 'techniques'), function(n) { return !isUndefined(n); })), 'key')), v => v.toLowerCase()))));

             this.searchData['disciplines'] = this.elasticServices.getDisciplines();
             this.searchData['activities'] = this.elasticServices.getActivities();
             this.searchData['techniques'] = this.elasticServices.getTechniques();
             this.searchData['objects'] = this.elasticServices.getObjects();
             this.searchData['standards'] = this.elasticServices.getStandards();


             /*console.log(this.elasticServices.getDisciplines());
             console.log(this.elasticServices.getTechniques());
             console.log(this.elasticServices.getStandards());
             console.log(this.elasticServices.getObjects());
             console.log(this.elasticServices.getActivities());

           }
         }
       );
     }, 1000);
   }*/


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
    this.selectTab = item;
    if (item === 'scenarios') {
      this.router.navigate([{ outlets: { target: null }}]);
      console.log(this.elasticServices.getScenarioNumber())
      this.elasticServices.setResultCount(this.elasticServices.getScenarioNumber());
    }else {
      this.router.navigate([{ outlets: { target : item}}]);
      this.loadContents(item);
    }
  }

  private resize() {
    if (this.contentCol === 'col-lg-9') {
      this.contentCol = 'col-lg-12';
    }  else {
      this.contentCol = 'col-lg-9';
    }
  }

  loadContents(type: string) {console.log(type)
        switch (type) {
          case 'steps':
            this.sskServices.setTitle('SSK - Steps')
            this.steps = new Array();
            //this.loadSteps();
           this.steps = this.elasticServices.getSteps();
            this.elasticServices.setResultCount(this.elasticServices.getSteps().length);
            this.tabStep = true;
            this.tabRes = false
            this.tabScenarios = false
            break;
          case 'resources':
            this.sskServices.setTitle('SSK - Resources')
            this.tabStep = false;
            this.tabRes = true;
            this.tabScenarios = false
            this.resources = this.elasticServices.getResources();
            this.elasticServices.setResultCount(this.elasticServices.getResourceCount());
            this.resultCount = this.elasticServices.getResourceCount();
            break;
        }
  }

  /*loadSteps() {
    console.log(this.elasticServices.getSteps())
    if (isUndefined(this.steps)) {
      this.elasticServices.getAllSteps().subscribe(result => {
        this.elasticServices.setResultCount(this.elasticServices.getstepNumber());
        //this.resultCount = this.elasticServices.getstepNumber();
        this.steps = this.elasticServices.getSteps();
      });
    }else {
      this.elasticServices.setResultCount(this.elasticServices.getResourceCount());
      //this.resultCount = this.elasticServices.getstepNumber();
      this.steps = this.elasticServices.getSteps();
    }

  }

  loadResources() {
    if (isUndefined(this.resources)) {
      this.elasticServices.getAllResources().subscribe(result => {
        this.resources = this.elasticServices.getResources();
      });
    } else {
      this.resources = this.elasticServices.getResources();
    }

  }

  loadStepsMetaData() {
    this.elasticServices.getAllStepsMetaData().subscribe(
      result => {   },
      error => { this.error = '500 - Internal Server Error'; },
      () => {
        this.elasticServices.setSearchData();
      } );
  }*/

  @HostListener('window:scroll', ['$event']) checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if ( !isUndefined(this.scenarios) &&  this.scenarios.length  < this.elasticServices.getScenarioNumber() && scrollPosition >= componentPosition) {
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
      return o.id === step._parent; });
  }

  setResultCount(elt: number ) {
    this.resultCount = elt;
  }

}



