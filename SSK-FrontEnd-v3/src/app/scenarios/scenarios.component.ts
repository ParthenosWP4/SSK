import {Component, ElementRef, HostListener, OnInit, ApplicationRef} from '@angular/core';
import {ElastichsearchService} from '../elastichsearch.service';
import { Router} from '@angular/router';
import {isUndefined} from 'util';
import * as _ from 'lodash';
import * as Fuse from 'fuse-js-latest';
import {SskService} from '../ssk.service';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {Location} from '@angular/common';

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
  resultCount = 0;
  forImage = environment.forImage;
  spinner = false;
  empty = false;
  constructor(
    private elasticServices: ElastichsearchService,
    private sskServices: SskService,
    private location: Location,
    public el: ElementRef,
    private appRef: ApplicationRef,
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
      if (this.sskServices.getStatusError() === null ) {
        this.sskServices.setTitle('SSK - Scenarios');
      }
      this.sskServices.checkBackEndAvailability();
      this.filters = this.sskServices.getFilters();
      this.options = this.sskServices.options;
      this.tabList = this.sskServices.browseItems;
      this.selectTab = this.tabList[0];
     if (this.elasticServices.getSearchData() === undefined) {
        this.setSearchData();
      }else {
        this.searchData = this.elasticServices.getSearchData();
      }
      this.loadContents(this.active);
 }

 /* onKey(event: any) { // without type info
    if (event.target.value.length >= 3 ) {
      this.search(event.target.value);
    }else {
      this.searchInit();
    }

  }*/

  /*searchInit() {
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
      this.resultCount = this.getResources().length;
    }
  }*/

  setSearchData() {
    this.spinner = true;
    setTimeout(() => {
      this.searchData['disciplines'] = this.elasticServices.getDisciplines();
      this.searchData['activities'] = this.elasticServices.getActivities();
      this.searchData['techniques'] = this.elasticServices.getTechniques();
      this.searchData['objects'] = this.elasticServices.getObjects();
      this.searchData['standards'] = this.elasticServices.getStandards();
      this.elasticServices.setSearchData(this.searchData);
      this.spinner = false;
    }, 2000);
  }

  /*search(tag: string) {
    let  fuse ;
    if ( this.tabScenarios) {
      this.options['keys'] =  this.sskServices.scenarioKeys;
      fuse = new Fuse(this.elasticServices.getScenarios(), this.options);
      this.results[tag] =  fuse.search(tag.trim());
      this.scenarioResults = _.concat(this.scenarioResults, this.results[tag]);
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




  }*/

  toggle(item: string) {
    this.selectTab = item;
    this.active = item;
    this.loadContents(item);
    this.location.replaceState(item);
    //this.router.navigate([item]);
  }

  /*private resize() {
    if (this.contentCol === 'col-lg-9') {
      this.contentCol = 'col-lg-12';
    }  else {
      this.contentCol = 'col-lg-9';
    }
  }*/

   public loadContents(type: string) {
         switch (type) {
          case 'steps':
            this.sskServices.setTitle('SSK - Steps');
            this.setSteps(new Array());
            this.tabStep = true;
            this.tabRes = false ;
            this.tabScenarios = false;
            if (this.elasticServices.getSteps() === undefined) {
              setTimeout(() => {
                this.elasticServices.getAllSteps();
                this.setStepTab();
             }, 2000);
            }else {
                this.setStepTab();
            }
            break;
          case 'resources':
            this.sskServices.setTitle('SSK - Resources');
            this.tabStep = false;
            this.tabRes = true;
            this.tabScenarios = false;
            if (this.elasticServices.getResources() === undefined) {
              setTimeout(() => {
                this.elasticServices.getAllSteps();
                this.setResourcesTab();
              }, 2000);
            }else {
              this.setResourcesTab();
            }
          break;
          case'scenarios':
          this.setScenarios(this.elasticServices.getScenarios());
            if  (!this.elasticServices.getResearchStarted()) {
              this.setScenarios(this.elasticServices.getScenarios());
            } else {
              this.setScenarios(this.elasticServices.getScenarioResults());
            }
            this.sskServices.setTitle('SSK - Scenarios');
            this.elasticServices.setResultCount(this.elasticServices.getScenarios().length);
          break;
        }
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if ( !isUndefined(this.getScenarios()) &&  this.getScenarios().length  < this.elasticServices.getScenarioNumber()
    && scrollPosition >= componentPosition) {
      const  elt: any = {};
      if (!isUndefined(this.elasticServices.getscenariosTemp().length)  && this.elasticServices.getscenariosTemp().length === 1) {
        this.elasticServices.getscenariosTemp().pop();
      }
    } /*else if ( this.scenarios.length >= this.elasticServices.getScenarioNumber()) {
    }*/
  }

  remove(elt: any) {
    let temp: any;
    _.remove(this.sskServices.getFilters(), function (v) {
      return v.tag === elt.tag;
    });
    $('#' + elt.tag).prop('checked', false);
    this.elasticServices.searchFromServer(elt.type, elt.tag).subscribe(
      result => {
        console.log(result);
        this.elasticServices.searchResult = result;
      },
      error => {},
      () => {
        switch (elt.type) {
          case 'step':
            this.sskServices.updateSteps().subscribe((value) => {
              temp = value;
              }, (error) => {
              console.log(error);
              }, () => {
                this.elasticServices.setStepResults(temp);
                this.setSteps(temp);
                this.sskServices.updateScenariosAndResouces(temp);
                this.setScenarios(this.elasticServices.getScenarioResults());
                this.setResources(this.elasticServices.getResourceResults());
            });
          break;
          case 'scenario':
          this.sskServices.updateScenarios().subscribe((value) => {
            temp = value;
            }, (error) => {
            console.log(error);
            }, () => {
              this.elasticServices.setScenarioResults(temp);
              this.setScenarios(temp);
              this.sskServices.updateStepsAndResouces(temp);
              this.setSteps(this.elasticServices.getStepResults());
              this.elasticServices.setResourceResults(_.intersectionWith(this.elasticServices.getStepResults(),
                this.elasticServices.getResources(),  (o1, o2) => {
                return (o2.parent === o1['_id']);
              }));
              this.setResources(this.elasticServices.getResourceResults());
          });
          break;
        }
      });
  }

setStepTab() {
  if (!this.elasticServices.getResearchStarted()) {
    this.setSteps(this.elasticServices.getSteps());
  } else {
    this.setSteps(this.elasticServices.getStepResults());
  }
  this.elasticServices.setResultCount(this.elasticServices.getSteps().length);
  Promise.all(_.map(this.getSteps(), step => {
    step['metadata'] = this.elasticServices.addStepMetadata(step._id + step.position + 'Meta');
    step.metadata = _.map(step.metadata,  (x)  => {
      if (this.sskServices.isUrl(x.source) && x.source.includes('tadirah')) {
        x.source = 'Tadirah';
      }
      if (isUndefined(x.type) || (x.type).includes('[')) {
        x.type = 'standard';
      }
      return x;
    });
    return step;
  })).then((completed) => {
    this.setSteps (completed);
  });
}


setResourcesTab() {
   if (!this.elasticServices.getResearchStarted()) {
    this.setResources(this.elasticServices.getResources());
  } else {
    this.setResources(this.elasticServices.getResourceResults());
  }
}


  setSteps(elts: any) {
    this.steps = elts;
  }

  getSteps() {
    return this.steps;
  }

  getScenarios() {
    return this.scenarios;
  }

  setScenarios(elts: any) {
     this.scenarios = elts;
  }

  getResources() {
    return this.resources;
  }
  setResources(elts: any) {
     this.resources = elts;
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

  getSearchData() {
    return this.searchData;
  }
}
  /*private repopulate(steps) {
    if (this.elasticServices.getSearchData() !== undefined){
      _.forEach(steps, step => {
        const  activities = _.filter(step.metadata, item => { return item.type === 'activity'; });
        this.sskServices.addCount(this.elasticServices.getActivitiesForCount(), activities, 'activity')
            .then((activitiesCompleted) => {
              Promise.all(_.mergeWith(this.elasticServices.getActivitiesForCount(), activitiesCompleted,  (src, tar) => {
                if (_.isObject(src) && _.isObject(tar) && (src !== undefined) && (tar !== undefined)
                && (src.term !== undefined) && (tar.term !== undefined)
                && src.term.toLowerCase() === tar.term.toLowerCase()) {
                  src.scenarioIn += tar.scenarionIn;
                }
            })).then((activitiesResult) => {
              this.sskServices.alredyInStepCard++;
              this.elasticServices.setActivitiesForCount(activitiesResult);
              if (this.sskServices.alredyInStepCard === this.getSteps().length) {
                this.elasticServices.setActivities(_.groupBy(this.elasticServices.getActivitiesForCount(), 'group'));
              Promise.all(_.map(_.toPairs(this.elasticServices.getActivities()),
                   d => _.fromPairs([d]))).then((completed) => {
                   this.elasticServices.setActivities(completed);
                  this.elasticServices.getSearchData().activities = this.elasticServices.getActivities();
              });
              this.sskServices.alredyInStepCard = 0;
              this.appRef.tick();
              }
            });
          });
  
          new Promise((resolve, reject) => {
            this.sskServices.addCount(this.elasticServices.getStandardForCount(),
          _.filter(step.metadata, function (item) { return item.type === 'standard'; }), 'standard');
          })
          .then((standardCompleted) => {
            Promise.all( _.mergeWith(this.elasticServices.getStandardForCount(), standardCompleted,  (src, tar) => {
              if (_.isObject(src) && _.isObject(tar) && (src['standard_abbr_name'] !== undefined) &&
              src['standard_abbr_name'].toLowerCase() === tar['standard_abbr_name'].toLowerCase()) {
               if (isNaN(tar.scenarionIn)) {
                tar.scenarionIn = 0;
               }
                src.scenarioIn += tar.scenarionIn;
                return src;
              }
            })).then((standardResult) => {
              this.elasticServices.setStandardForCount(standardResult);
              this.sskServices.alredyInStepCard++;
               if ( this.sskServices.alredyInStepCard === this.getSteps().length){
               this.elasticServices.getSearchData().standards = this.elasticServices.getStandardForCount();
               this.appRef.tick();
              }
            });
          });
      });
    }
  }

  private emptyNumber() {
    Promise.all(_.map(this.elasticServices.getSearchData().objects, item => item.scenarioIn = 0))
    .then(() => (
      Promise.all(_.map(this.elasticServices.getSearchData().techniques, item => item.scenarioIn = 0))
        .then(() => (
          Promise.all(_.map(this.elasticServices.getSearchData().disciplines, item => item.scenarioIn = 0))
          .then(() => (
              Promise.all(_.map(this.elasticServices.getSearchData().standards, item => item.scenarioIn = 0))
              .then(() => (
                Promise.all(_.map(this.elasticServices.getSearchData().standards, item => item.scenarioIn = 0))
                .then(() => {
                    _.map(this.elasticServices.getSearchData().activities, item => {
                      const head = Object.keys(item)[0];
                      _.map(item[head], elt =>  {elt.scenarioIn = 0; });
                  });
                })
              ))
          ))
        ))
        ));
  }
}*/