import {Component, ElementRef, HostListener, OnInit, ApplicationRef, ViewChild, Input, AfterViewInit} from '@angular/core';
import {ElastichsearchService} from '../elastichsearch.service';
import { Router} from '@angular/router';
import {isUndefined} from 'util';
import * as _ from 'lodash';
import * as $ from 'jquery';
import {SskService} from '../ssk.service';
import {environment} from '../../environments/environment';
import {Location} from '@angular/common';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/delay';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
  selector: 'app-scenario',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss'],
  providers: [NgbTypeaheadConfig]
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
  private scenarioResults = [];
  private stepsResults = [];
  private resourcesResults = [];
  resultCount = 0;
  forImage = environment.forImage;
  spinner = false;
  empty = false;
  public model: any;
  list = [];
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  keydown$ = new Subject<HTMLInputElement>();
  public lodash: any;
  inputSize = '5%';
  fullTextSearch = false;

  constructor(
    private elasticServices: ElastichsearchService,
    private sskServices: SskService,
    private location: Location,
    public el: ElementRef,
    private appRef: ApplicationRef,
    config: NgbTypeaheadConfig,
    private router: Router) {config.showHint = true; config.focusFirst = true; }

    search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.list.filter(v => v.term.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10)));

    formatter = (x: {term: string}) => x['term'];

  ngOnInit() {
    this.lodash = _;
    this.list = _.map(this.elasticServices.getActivitiesForCount(), 'term');
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
      this.tabList = this.sskServices.browseItems;
      this.selectTab = this.active;
     if (this.elasticServices.getSearchData() === undefined) {
        this.setSearchData();
        this.loadContents(this.active);
      } else {
        this.searchData = this.elasticServices.getSearchData();
        this.list = this.elasticServices.autoCompleteList ;
        this.loadContents(this.active);
      }
 }

  setSearchData() {
    this.spinner = true;
    setTimeout(() => {
      this.searchData['disciplines'] = this.elasticServices.getDisciplines();
      this.searchData['activities'] = this.elasticServices.getActivities();
      this.searchData['techniques'] = this.elasticServices.getTechniques();
      this.searchData['objects'] = this.elasticServices.getObjects();
      this.searchData['standards'] = this.elasticServices.getStandards();
      this.elasticServices.setSearchData(this.searchData);
      this.list =
      _.concat(_.map(this.elasticServices.getActivitiesForCount(), item => { return {'term' : this.elasticServices.normalize(item['term']), 'type': 'step'};
        }), this.elasticServices.getDisciplines(), this.elasticServices.getTechniques(), this.elasticServices.getObjects(),
        _.map(this.elasticServices.getStandards(), item => { return { 'term' : item['standard_abbr_name'], 'type': 'step' }; }));
      this.elasticServices.autoCompleteList = this.list;
      this.spinner = false;
    }, 5000);
  }

  toggle(item: string) {
    this.selectTab = item;
    this.active = item;
    this.loadContents(item);
    this.location.replaceState(item);
  }

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
            } else {
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
            } else {
              this.setResourcesTab();
            }
          break;
          case'scenarios':
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
      const removedTag = _.remove(this.sskServices.getFilters(), function (v) {
        return v.tag === elt.tag;
      });
      const htmlElt = document.getElementById(_.capitalize(elt.tag)) as HTMLInputElement;
      htmlElt.checked = false;
      this.elasticServices.searchFromServer(elt.type, elt.tag).subscribe(
        result => {
          this.elasticServices.searchResult = result;
        },
        error => {},
        () => {
          if (this.sskServices.getFilters().length === 0) {
            this.elasticServices.setResearchStarted(false);
            this.elasticServices.setScenarioResults([]);
            this.setScenarios(this.elasticServices.getScenarios());
            this.elasticServices.setStepResults([]);
            this.setSteps(this.elasticServices.getSteps());
            this.elasticServices.setResourceResults([]);
            this.setResources(this.elasticServices.getResources());
          } else {
            this.sskServices.updateStepsOrScenarios(removedTag).subscribe((value) => {
              temp = value;
              }, (error) => {
              console.log(error);
              }, () => {
                this.setSteps(this.elasticServices.getStepResults());
                this.setScenarios(this.elasticServices.getScenarioResults());
                const resRemoved = _.remove(_.clone(this.elasticServices.getResources()), item => {
                  return _.includes(_.map(this.elasticServices.getStepResults(), '_id'), item['parent']);
                });
               this.setResources(resRemoved);
            });
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
    this.elasticServices.setSteps(completed);
  });
}


setResourcesTab() {
   if (!this.elasticServices.getResearchStarted()) {
    this.setResources(this.elasticServices.getResources());
  } else {
    this.setResources(this.elasticServices.getResourceResults());
  }
}




/*
  Here we filters content exactly as tag filtering
*/
selectedItem(item) {
  this.elasticServices.setResearchStarted(true);
  let temp: any;
  const tag = item.item.term;
  const elt = document.getElementById(_.capitalize(tag)) as HTMLInputElement;
  elt.checked = true;
  const type = (item.item['type'] === undefined) ? 'scenario' : 'step';
  if (_.findIndex(this.sskServices.getFilters(), function(o) { return o.tag === tag; } ) === -1 ) {
    this.elasticServices.searchFromServer(type, tag).subscribe(
    result => {
      this.elasticServices.searchResult = result;
      this.sskServices.addToFilters({'tag': tag, 'type': type, 'results': this.elasticServices.searchResult['data']} );
    },
    error => {},
    () => {
      switch (type) {
        case 'step':
            this.searchInSteps().subscribe((value) => {
              temp = value;
              }, (error) => { console.log(error); },
              () => {
                this.elasticServices.setStepResults(_.uniq(temp));
                this.setSteps(this.elasticServices.getStepResults());
                this.sskServices.updateScenariosAndResouces(temp);
                this.setScenarios(this.elasticServices.getScenarioResults());
                this.setResources(this.elasticServices.getResourceResults());
            });
        break;
        case 'scenario':
        this.searchInScenarios().subscribe((value) => {
          temp = value;
          },
          (error) => { console.log(error) ; },
          () => {
            this.elasticServices.setScenarioResults(temp);
            this.setScenarios(temp);
            this.sskServices.updateStepsAndResouces(temp, false);
            this.setSteps(this.elasticServices.getStepResults());
            this.setResources(this.elasticServices.getResourceResults());
        });
        break;
      }
    });
  }
}
/*
  Here we make a full text research
*/
eventHandler(event) {
  event.preventDefault();
  this.elasticServices.setResearchStarted(true);
  this.fullTextSearch = true;
  this.elasticServices.searchFromServer(null, this.model).subscribe(
    result => {
      this.elasticServices.searchResult = result;
      this.scenarioResults = _.remove(_.clone(this.elasticServices.searchResult['data']), item => {
        return item.type === 'scenario';
      });
        this.stepsResults = _.remove(_.clone(this.elasticServices.searchResult['data']), item => {
          return item.type === 'step';
        });
        this.resourcesResults = _.remove(_.clone(this.elasticServices.searchResult['data']), item => {
          return item.type === 'resource';
        });
     this.elasticServices.setScenarioResults(_.intersectionWith(_.clone(this.elasticServices.getScenarios()),
                                        this.scenarioResults, (o1, o2) => {
                                                            return (o1.id === o2['_id']);
                                        }));
      this.elasticServices.setStepResults(_.intersectionBy(_.clone(this.elasticServices.getSteps()), this.stepsResults, '_id'));
      this.elasticServices.setResourceResults(_.intersectionBy(_.clone(this.elasticServices.getResources()), this.resourcesResults, '_id'));
    },
    error => {},
    () => {
      this.setScenarios(this.elasticServices.getScenarioResults());
      this.setSteps(this.elasticServices.getStepResults());
      this.setResources(this.elasticServices.getResourceResults());
    });
}


onKey(event: any) { // without type info
  if (event.keyCode >= 48 && event.keyCode <= 90) {
    this.inputSize = ((this.model.length * 5) / 6) + '%';
    if (this.model.length <= 6) {
      this.inputSize = '5%';
    }
  }
}

resize() {
 return this.inputSize;
}

cleanInput() {
  this.elasticServices.setResearchStarted(false);
  this.scenarioResults = [];
  this.elasticServices.setScenarioResults([]);
  this.setScenarios(this.elasticServices.getScenarios());
  this.stepsResults = [];
  this.elasticServices.setStepResults([]);
  this.setSteps(this.elasticServices.getSteps());
  this.resourcesResults = [];
  this.elasticServices.setResourceResults([]);
  this.setResources(this.elasticServices.getResources());
  this.fullTextSearch = false;
  $('#sskSearch').val('');
  this.inputSize = '5%';
}

searchInSteps(): Observable<any[]> {
  let temp = _.intersectionBy(_.clone(this.elasticServices.getSteps()), this.elasticServices.searchResult['data'], '_id');
  temp = _.uniqBy(_.filter(_.concat(this.elasticServices.getStepResults(), temp), undefined), '_id');
  this.stepsResults = temp;
  return Observable.of(temp);
}

searchInScenarios(): Observable<any[]> {
  const temp = _.intersectionWith(_.clone(this.elasticServices.getScenarios()), this.elasticServices.searchResult['data'],
                (o1, o2) => {
                      return (o1.id === o2['_id']);
  });
  this.scenarioResults = _.uniqBy(_.filter(_.concat(this.elasticServices.getScenarioResults(), temp), undefined), 'id');
  return Observable.of(this.scenarioResults);
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

  getStepsCount() {
    return this.steps.length;
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