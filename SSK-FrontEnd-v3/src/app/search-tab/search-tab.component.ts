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
  @Input() scenarios: any;
  @Input() resources: any;
  @Input() steps: any;
  public activityCaret = 'fa-caret-up';
  public disciplines = 'fa-caret-up';
  public techniques = 'fa-caret-up';
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
              private scenariosComponent: ScenariosComponent) { }

  searchData = {};
  objectKeys = Object.keys;

  ngOnInit() {
    this.filters = this.ssKServices.getFilters();
    _.map(this.data['disciplines'], item => {
      item = this.getMetaDataNumber(item, 'scenario', false);
      item.type = 'disciplines';
      item.filter = item.term;
    });
    _.map(this.data['objects'], item => {
      item = this.getMetaDataNumber(item, 'scenario', false);
      item.type = 'objects';
      item.filter = item.term;
    });
    _.map(this.data['techniques'], item => {
      item = this.getMetaDataNumber(item, 'scenario', false);
      item.type = 'techniques';
      item.filter = item.term;
    });
    _.map(this.data['standards'], item => {
      item = this.getMetaDataNumber(item, 'step', true);
      item.type = 'standards';
      item.filter = item.standard_abbr_name;
    });
    _.forEach(this.data['activities'], (elt, key) => {
      _.map(elt[this.objectKeys(elt)[0]], item => {
        item = this.getMetaDataNumber(item, 'step', false);
        item.type = 'activities';
        item.index = key;
        item.filter = item.term;
      });
    });
  }

  change(e, content: any) {
    this.elasticSearchServ.setResearchStarted(true);
    let tag, type: string;
    let temp, filterTerm: any;
    if (content.group === undefined ) {
      if (content.standard_abbr_name !== undefined) {
        tag = content.standard_abbr_name;
        type = 'step';
      } else {
        tag = content.term;
        type = 'scenario';
      }
    } else {
      tag = content.term;
      type = 'step';
    }
    if (content.type === 'activities') {
      filterTerm = _.filter((this.data[content.type][content.index])[content.group], {'filter': tag})[0];
    } else {
      filterTerm = _.filter(this.data[content.type], {'filter': tag})[0];
    }
    if (tag !== undefined && type !== undefined) {
    if (_.findIndex(this.ssKServices.getFilters(), function(o) { return o.tag === tag; } ) === -1 ) {
      this.elasticSearchServ.updateSearchResult(filterTerm).subscribe(
      result => {
        this.ssKServices.addToFilters({'tag': tag, 'type': type, 'results': this.elasticSearchServ.searchResult['data']} );
      },
      error => {},
      () => {
        switch (type) {
          case 'step':
              this.searchInSteps().subscribe((value) => {
                temp = value;
                }, (error) => { console.log(error); },
                () => {
                  this.elasticSearchServ.setStepResults(_.uniq(temp));
                  this.scenariosComponent.setSteps(this.elasticSearchServ.getStepResults());
                  this.ssKServices.updateScenariosAndResouces(temp);
                  this.scenariosComponent.setScenarios(this.elasticSearchServ.getScenarioResults());
                  this.scenariosComponent.setResources(this.elasticSearchServ.getResourceResults());
              });
          break;
          case 'scenario':
          this.searchInScenarios().subscribe((value) => {
            temp = value;
            },
            (error) => { console.log(error) ; },
            () => {
              this.elasticSearchServ.setScenarioResults(temp);
              this.scenariosComponent.setScenarios(temp);
              this.ssKServices.updateStepsAndResouces(temp, false);
              this.scenariosComponent.setSteps(this.elasticSearchServ.getStepResults());
              this.scenariosComponent.setResources(this.elasticSearchServ.getResourceResults());
          });
          break;
        }
      });
    } else {
      const removedTag = _.remove(this.ssKServices.getFilters(), function (v) {
        return v.tag === tag;
      });
      this.elasticSearchServ.updateSearchResult(filterTerm).subscribe(
        result => {
        },
        error => {},
        () => {
          if (this.ssKServices.getFilters().length === 0) {
            this.elasticSearchServ.setResearchStarted(false);
            this.elasticSearchServ.setScenarioResults([]);
            this.scenariosComponent.setScenarios(this.elasticSearchServ.getScenarios());
            this.elasticSearchServ.setStepResults([]);
            this.scenariosComponent.setSteps(this.elasticSearchServ.getSteps());
            this.elasticSearchServ.setResourceResults([]);
            this.scenariosComponent.setResources(this.elasticSearchServ.getResources());
          } else {
            this.ssKServices.updateStepsOrScenarios(removedTag).subscribe((value) => {
              temp = value;
              }, (error) => {
              console.log(error);
              }, () => {
                this.scenariosComponent.setSteps(this.elasticSearchServ.getStepResults());
                this.scenariosComponent.setScenarios(this.elasticSearchServ.getScenarioResults());
                const resRemoved = _.remove(_.clone(this.elasticSearchServ.getResources()), item => {
                  return _.includes(_.map(this.elasticSearchServ.getStepResults(), '_id'), item['parent']);
                });
               this.scenariosComponent.setResources(resRemoved);
            });
          }
        });
      }
    }
  }


  getMetaDataNumber(tag: any, type: string, ifStandard: boolean): Observable<any> {
    this.elasticSearchServ.searchFromServer(type, (!ifStandard ) ? tag.term : tag.standard_abbr_name).subscribe(
      result => {
        this.elasticSearchServ.searchResult = result;
      },
      error => {},
      () => {
        tag['count'] = this.elasticSearchServ.searchResult['total'];
        tag['data'] = this.elasticSearchServ.searchResult['data'];
      });
      return tag;
  }

  searchInSteps(): Observable<any[]> {
    let temp = _.intersectionBy(_.clone(this.elasticSearchServ.getSteps()), this.elasticSearchServ.searchResult['data'], '_id');
    temp = _.uniqBy(_.filter(_.concat(this.elasticSearchServ.getStepResults(), temp), undefined), '_id');
    this.stepsResults = temp;
    return Observable.of(temp);
  }

  searchInScenarios(): Observable<any[]> {
    const temp = _.intersectionWith(_.clone(this.elasticSearchServ.getScenarios()), this.elasticSearchServ.searchResult['data'],
                  (o1, o2) => {
                        return (o1.id === o2['_id']);
    });
    this.scenarioResults = _.uniqBy(_.filter(_.concat(this.elasticSearchServ.getScenarioResults(), temp), undefined), 'id');
    return Observable.of(this.scenarioResults);
  }
  normalize(text: string ) {
    if (!isUndefined(text)) {
      text = text.split('_').join(' ');
    }
    return _.capitalize(text);
  }

  getBlock(elt: any) {
    return elt.list.item;
  }

}
