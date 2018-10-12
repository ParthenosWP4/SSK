import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {ElastichsearchService} from '../elastichsearch.service';
import {SskService} from '../ssk.service';
import * as _ from 'lodash';
import * as $ from 'jquery';
import {Observable} from 'rxjs/Observable';
import {ScenariosComponent} from '../scenarios/scenarios.component';
import {isUndefined} from 'util';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.scss'],
})
export class SearchTabComponent implements OnInit {

  @Input() data: any;
  public activityCaret = 'fa-caret-up';
  public disciplines = 'fa-caret-up';
  public techniques = 'fa-caret-up';
  private options = {};
  public tags = [{'name':'disciplines','tooltip': 'Disciplines cover all the domains from the Humanities, Social Sciences and Heritage science. Scenarios may apply to one or more disciplines.'}, 
                 {'name': 'objects', 'tooltip':'Research objects are the different types of data produced, studied or manipulated in a scenario. Scenarios may apply to one or more research objects.'},
                 {'name': 'techniques', 'tooltip':'Research techniques are the general processes and methods used in a scenario. Scenarios may use one or more research techniques.'},
                 {'name':'activities' , 'tooltip':'Research activities are general tasks carried out by the steps of a scenario. One step carries out a unique activity.'},
                 {'name':'standards', 'tooltip':'Standards are data formats or normative documents that are used during the steps of a scenario. Steps may use one or more standards.'}] ;
  forImage = environment.forImage;
  activitiesKeys: any;
  filters: any;
  private results = [];
  private scenarioResults = [];
  private stepsResults = [];
  private resourcesResults = [];
  spinner = false;
  constructor(private elasticSearchServ: ElastichsearchService,
              private ssKServices: SskService,
              private scenariosComponent: ScenariosComponent,
              private cd: ChangeDetectorRef) { }

  searchData = {};
  objectKeys = Object.keys;

  ngOnInit() {
    this.filters = this.ssKServices.getFilters();
    this.options = this.ssKServices.options;
  }

  change(e, content: any) {
    this.elasticSearchServ.setResearchStarted(true);
    let tag, type: string;
    let temp: any;
    if (content.group === undefined ) {
      if (content.standard_abbr_name !== undefined) {
        tag = content.standard_abbr_name;
        type = 'step';
      }else {
        tag = content.term;
        type = 'scenario';
      }
    } else {
      tag = content.term;
      type = 'step';
    }
    if (tag !== undefined && type !== undefined) {
    if ($('input[name = "' + tag + '"]').is(':checked')
      &&  _.findIndex(this.ssKServices.getFilters(), function(o) { return o === tag; } ) === -1 ) {
      this.ssKServices.addToFilters({'tag': tag, 'type': type} );
      this.elasticSearchServ.searchFromServer(type, tag).subscribe(
      result => {
        this.elasticSearchServ.searchResult = result;
      },
      error => {},
      () => {
        switch (type) {
          case 'step':
              this.searchInSteps().subscribe((value) => {
                temp = value;
                }, (error) => {
                console.log(error);
                }, () => {
                  this.elasticSearchServ.setStepResults(temp);
                  this.scenariosComponent.setSteps(temp);
                  this.ssKServices.updateScenariosAndResouces(temp);
                  this.scenariosComponent.setScenarios(this.elasticSearchServ.getScenarioResults());
                  this.scenariosComponent.setResources(this.elasticSearchServ.getResourceResults());
              });
          break;
          case 'scenario':
          this.searchInScenarios().subscribe((value) => {
            temp = value;
            }, (error) => {
            console.log(error);
            }, () => {
              this.elasticSearchServ.setScenarioResults(temp);
              this.scenariosComponent.setScenarios(temp);
              this.ssKServices.updateStepsAndResouces(temp);
              this.scenariosComponent.setSteps(this.elasticSearchServ.getStepResults());
              this.elasticSearchServ.setResourceResults(_.intersectionWith(this.elasticSearchServ.getStepResults(),
                this.elasticSearchServ.getResources(),  (o1, o2) => {
                return (o2.parent === o1['_id']);
              }));
              this.scenariosComponent.setResources(this.elasticSearchServ.getResourceResults());
          });
          break;
        }
      });
    }else {
      _.remove(this.ssKServices.getFilters(), function (v) {
        return v.tag === tag;
      });
      this.elasticSearchServ.searchFromServer(type, tag).subscribe(
        result => {
          console.log(result);
          this.elasticSearchServ.searchResult = result;
        },
        error => {},
        () => {
          switch (type) {
            case 'step':
              this.ssKServices.updateSteps().subscribe((value) => {
                temp = value;
                }, (error) => {
                console.log(error);
                }, () => {
                  this.elasticSearchServ.setStepResults(temp);
                  this.scenariosComponent.setSteps(temp);
                  this.ssKServices.updateScenariosAndResouces(temp);
                  this.scenariosComponent.setScenarios(this.elasticSearchServ.getScenarioResults());
                  this.scenariosComponent.setResources(this.elasticSearchServ.getResourceResults());
              });
            break;
            case 'scenario':
            this.ssKServices.updateScenarios().subscribe((value) => {
              temp = value;
              }, (error) => {
              console.log(error);
              }, () => {
                this.elasticSearchServ.setScenarioResults(temp);
                this.scenariosComponent.setScenarios(temp);
                this.ssKServices. updateStepsAndResouces(temp);
                this.scenariosComponent.setSteps(this.elasticSearchServ.getStepResults());
                this.elasticSearchServ.setResourceResults(_.intersectionWith(this.elasticSearchServ.getStepResults(),
                  this.elasticSearchServ.getResources(),  (o1, o2) => {
                  return (o2.parent === o1['_id']);
                }));
                this.scenariosComponent.setResources(this.elasticSearchServ.getResourceResults());
            });
            break;
          }
        });
      }
    }

    if ( this.ssKServices.getFilters().length === 0 ) {
      if (this.scenariosComponent.tabScenarios) {
        this.scenariosComponent.setScenarios(this.elasticSearchServ.getScenarios());
        this.scenariosComponent.resultCount = this.elasticSearchServ.getScenarios().length;
      }

      if (this.scenariosComponent.tabStep) {
        this.scenariosComponent.setSteps(this.elasticSearchServ.getSteps());
        this.scenariosComponent.resultCount = this.scenariosComponent.getSteps().length;
      }
      if (this.scenariosComponent.tabRes) {
        this.scenariosComponent.setResources (this.elasticSearchServ.getResources());
        this.scenariosComponent.resultCount = this.scenariosComponent.getResources().length;
      }
    }
  }

  searchInSteps(): Observable<any[]> {
    const temp = _.intersectionBy(this.elasticSearchServ.getSteps(), this.elasticSearchServ.searchResult['data'], '_id');
    this.stepsResults = _.concat(this.stepsResults, temp);
    return Observable.of(this.stepsResults);
  }

  searchInScenarios(): Observable<any[]> {
    const temp = _.intersectionWith(this.elasticSearchServ.getScenarios(), this.elasticSearchServ.searchResult['data'], (o1, o2) => {
      return (o1.id === o2['_id']);
    });
    this.scenarioResults = _.concat(this.scenarioResults, temp);
    return Observable.of(this.scenarioResults);
  }

  normalize(text: string ) {
    if (!isUndefined(text)) {
      text = text.replace('_', ' ');
    }
    return text;
  }

  getBlock(elt: any) {
    return elt.list.item;
  }

}
