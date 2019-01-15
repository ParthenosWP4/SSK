import {Component, ElementRef, HostListener, OnDestroy, OnInit, ApplicationRef, ViewChild, AfterViewInit, Renderer2} from '@angular/core';
import {ElastichsearchService} from '../elastichsearch.service';
import { Router} from '@angular/router';
import {isUndefined} from 'util';
import * as _ from 'lodash';
import {SskService} from '../ssk.service';
import {environment} from '../../environments/environment';
import {Location} from '@angular/common';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/delay';
import * as Bloodhound from 'bloodhound-js';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ComponentLoader } from 'ngx-bootstrap';
declare const $;

@Component({
  selector: 'app-scenario',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss'],
  providers: [NgbTypeaheadConfig]
})


export class ScenariosComponent implements OnInit, AfterViewInit, OnDestroy {
  listenerFn: () => void;
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
  empty = false;
  public model: any;
  list = [];
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  keydown$ = new Subject<HTMLInputElement>();
  public lodash: any;
  inputSize = '15%';
  fullTextSearch = false;
  eltRef: any;

  constructor(
    public elasticServices: ElastichsearchService,
    private sskServices: SskService,
    private location: Location,
    public elementRef: ElementRef,
    private appRef: ApplicationRef,
    config: NgbTypeaheadConfig,
    private router: Router,
    private renderer: Renderer2) {
      config.showHint = true;
      config.focusFirst = false;
     }

  ngOnInit() {
    this.lodash = _;
    $('#multiple-datasets').hide();
    if (this.elasticServices.spinner === false) {
      this.elasticServices.searchTags = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('filter'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: this.elasticServices.autoCompleteList
      });
       this.elasticServices.search = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('filter'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: this.elasticServices.searchFor
      });
      $('#multiple-datasets').show();
      $('#multiple-datasets .typeahead').typeahead({
        minLength: 2,
        highlight: true,
        hint: false
      },
      {
        name: 'search-in-tag',
        display: 'filter',
        source: this.elasticServices.searchTags,
        templates: {
          header: '<div class="group">Terms</div>',
          suggestion: function(data) {
            return '<div><i class="fa fa-tag" aria-hidden="true"></i>' + data.filter + '<span  style = "border:none" class="' +
            data.type.substring(0, data.type.length - 1) + '"> (' + data.type + ') </span></div>';
        }
        }
      });
    }
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
      this.loadContents(this.active);
      this.searchData = this.elasticServices.getSearchData();
   }

   ngAfterViewInit() {
     $('.typeahead').bind('typeahead:render', (event, suggestions, async, dataset) => {
      $( '.added').remove();
      $('.tt-dataset').prepend( '<div class="tt-suggestion tt-selectable added" > <span class="strong"> Search for "' +
      $('.typeahead').val() + '"</span></div>');
      //this.eltRef = this.elementRef.nativeElement.querySelector('.added');
      /*if (this.eltRef) {
        this.listenerFn = this.renderer.listen(this.eltRef, 'click', (even) => {
          console.log(this.renderer);
             this.eventHandler(even);
             console.log(this.listenerFn);
           });
      }*/
   });

      $('.typeahead').bind('typeahead:select', (ev, suggestion) => {
        this.selectedItem(suggestion);
        this.model = null;
      });
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
              this.elasticServices.loadData().then(
                value => {
                 this.setScenarios(value);
                 this.elasticServices.getAllSteps().then(
                  (steps) => {
                    this.setSteps(steps);
                    this.elasticServices.getAllResources().then(
                      (resources) => {
                        this.setResources(resources);
                      });
                  });
                });
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
              this.elasticServices.loadData().then(
                value => {
                 this.setScenarios(value);
                 this.elasticServices.getAllSteps().then(
                  (steps) => {
                    this.setSteps(steps);
                    this.elasticServices.getAllResources().then(
                      (resources) => {
                        this.setResources(resources);
                      });
                  });
                });
            } else {
              this.setResourcesTab();
            }
          break;
          case'scenarios':
          this.sskServices.setTitle('SSK - Scenarios');
          if (this.elasticServices.getScenarios().length === 0) {
            this.elasticServices.loadData().then(
              value => {
               this.setScenarios(value);
               this.elasticServices.getAllSteps().then(
                (steps) => {
                  this.setSteps(steps);
                  this.elasticServices.getAllResources().then(
                    (resources) => {
                      this.setResources(resources);
                    });
                });
              });
          } else {
            if  (!this.elasticServices.getResearchStarted()) {
              this.setScenarios(_.uniqBy(this.elasticServices.getScenarios(), 'id'));
           } else {
            this.setScenarios(_.uniqBy(this.elasticServices.getScenarioResults(), 'id'));
           }
          }
          break;
        }
  }

  @HostListener('document:click', ['$event']) fullTextSerch(event: Event) {
    try {
      if (_.includes(event['path'][1].getAttribute('class'), 'added')) {
        this.eventHandler(event);
     }
    }catch (ex) {
      console.log(ex);
    }
  }


    @HostListener('window:scroll', ['$event']) checkScroll() {
      const componentPosition = this.elementRef.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset;
      if ( !isUndefined(this.getScenarios()) &&  this.getScenarios().length  < this.elasticServices.getScenarioNumber()
      && scrollPosition >= componentPosition) {
        const  elt: any = {};
        if (!isUndefined(this.elasticServices.getscenariosTemp().length)  && this.elasticServices.getscenariosTemp().length === 1) {
          this.elasticServices.getscenariosTemp().pop();
        }
      } }

  remove(elt: any) {
    $('#sskSearch').val('');
      let filterTerm: any;
      let temp, type: string;
      if (elt.group === undefined ) {
        if (elt.standard_abbr_name !== undefined) {
          type = 'step';
          temp = elt.standard_abbr_name;
        } else {
          temp = elt.term;
          type = 'scenario';
        }
      } else {
        temp = elt.term;
        type = 'step';
      }
      const removedTag = _.remove(this.sskServices.getFilters(), function (v) {
        return v.filter === elt.filter;
      });
      const htmlElt = document.getElementById(temp) as HTMLInputElement;
      htmlElt.checked = false;
      if (elt.type === 'activities') {
        filterTerm = _.filter((this.searchData[elt.type][elt.index])[elt.group], {'filter': elt.filter})[0];
      } else {
        filterTerm = _.filter(this.searchData[elt.type], {'filter': elt.filter})[0];
      }
      this.elasticServices.updateSearchResult(filterTerm).subscribe(
        result => {
        },
        error => {},
        () => {
          if (this.sskServices.getFilters().length === 0) {
            Observable.of().subscribe(
              (value) => {
                this.elasticServices.setResearchStarted(false);
                this.elasticServices.setScenarioResults([]);
                this.elasticServices.setStepResults([]);
                this.elasticServices.setResourceResults([]);
              },
              (error) => { console.log(error); },
              () => {
                this.setScenarios(this.elasticServices.getScenarios());
                this.setSteps(this.elasticServices.getSteps());
                this.setResources(this.elasticServices.getResources());
              });
          } else {
            this.sskServices.updateStepsOrScenarios(type, removedTag).subscribe((value) => {
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

   directAccessToSteporResources() {
    let scenarioDetails: any ;
    this.elasticServices.countItems('scenarios').subscribe(
      result => {
        this.elasticServices.setScenarioNumber(result['total']);
        this.elasticServices.setScenariosID(result['scenarios']);
      },
      err => {
        this.router.navigate(['errorpage']);
      },
      () =>  {
        Observable.of(this.elasticServices.getScenariosID().forEach((obj)  => {
          this.elasticServices.getScenarioDetails(obj._id).subscribe(
            detailsResult => {
              scenarioDetails = obj._id;
              },
            error => {},
            () =>  {
              this.elasticServices.addScenario(scenarioDetails);
              console.log(this.elasticServices.getScenarios().length);
            }
            );
        })).subscribe(
          (value) => {
            this.elasticServices.getAllSteps().then(
              () => {
                this.elasticServices.setScenariosTemp(new Array<any>(this.elasticServices.getScenariosID().length));
                this.elasticServices.asynchFunction();
                  Observable.of(this.setStepTab()).subscribe(
                      () => {
                        this.elasticServices.getAllResources().then(
                          () => {
                            this.setResourcesTab();
                          });
                      }
                    );
              });
          },
          (error) => { console.log(error); },
          () => {
            console.log('finish');
          });
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
selectedItem(item: any) {
  $('div.tt-dataset').empty();
  this.elasticServices.setResearchStarted(true);
  let temp, filterTerm: any;
  let tag, type: string;
  tag = item.filter;
  if (item.group === undefined ) {
    if (item.standard_abbr_name !== undefined) {
      type = 'step';
    } else {
      type = 'scenario';
    }
  } else {
    type = 'step';
  }
  const elt = document.getElementById(tag) as HTMLInputElement;
  elt.checked = true;
  if (item.type === 'activities') {
    filterTerm = _.filter((this.elasticServices.getSearchData()[item.type][item.index])[item.group], {'filter': tag})[0];
  } else {
    filterTerm = _.filter(this.elasticServices.getSearchData()[item.type], {'filter': tag})[0];
  }
  if (_.findIndex(this.sskServices.getFilters(), function(o) { return o.tag === tag; } ) === -1 ) {
    this.elasticServices.updateSearchResult(filterTerm).subscribe(
    result => {
      this.sskServices.addToFilters(filterTerm);
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
  $('div.tt-dataset').empty();
  this.elasticServices.setResearchStarted(true);
  this.fullTextSearch = true;
  this.elasticServices.searchFromServer(null, _.toLower(this.model)).subscribe(
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
    this.renderer.destroy();
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
  $('div.tt-menu.tt-open').hide();
}

getSpinner() {
  return this.elasticServices.spinner;
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
     console.log(elts);
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

  setResultCount(elt: number ) {
    this.resultCount = elt;
  }

  getSearchData() {
    return this.searchData;
  }

  getStepsCount() {
    return this.steps.length;
  }

  ngOnDestroy() {
    if (this.listenerFn) {
      this.listenerFn();
    }
  }
}
