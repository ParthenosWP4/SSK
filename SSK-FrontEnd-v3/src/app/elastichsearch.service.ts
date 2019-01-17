import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as Bloodhound from 'bloodhound-js';
import { t } from '@angular/core/src/render3';
import { CollapseModule } from 'ngx-bootstrap';
declare const $;

@Injectable()
export class ElastichsearchService {

  private sskBackendEndpoint = environment.sskBackendEndpoint;

  private scenarioNumber: number;
  private resultCount: number;
  private stepNumber: any;
  private resourceNumber: any;
  private scenariosId: any;
  private steps: any[];
  private scenarios: any[];
  private resources: any[];
  private stepsMetaData: any = [];
  private options: any;
  private params: any;
  private disciplines: any;
  private activities: any;
  private activitiesForCount: any;
  private activitiesKeys: any;
  private searchData = {};
  private techniques: any;
  private objects: any;
  private standards: any;
  private standardsForCount: any;
  private tags = ['disciplines', 'objects', 'object', 'techniques', 'activities'] ;
  private regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  itemsCount: any;
  private detailsResult = {};
  glossaryData: any;
  scenariosTemp: any[];
  scenarioDetails: any;
  group: string;
  public searchResult: any;
  private researchStarted = false;
  private resourceResults = [];
  private scenarioResults= [];
  private stepResults= [];
  private http: any;
  private httpUrlEncodingCodec: any;
  public autoCompleteList: any;
  objectKey = Object.keys;
  public spinner = true;
  public searchTags: any;
  public searchFor = [{'filter': 'search for xxxxx'}];
  public search: any;
  public senariosAvailable = false;

  constructor(inj: Injector) {
    this.http = inj.get(HttpClient);
    this.scenarios = new Array();
    this.params = {'fromSSK': 'true'};
    this.setResultCount(0);
  }



  countItems(type: string): Observable<any> {
    this.setParams(['count']);
    this.setOptions(this.params);
    return this.http.get(this.sskBackendEndpoint + type, this.options);
  }

  getScenarioDetails(scenarioId: string): Observable<any> {
    this.setParams(['title', 'desc', 'image', 'scenario_metadata', 'author' ]);
    this.setOptions(this.params);
    return this.http.get(this.sskBackendEndpoint + 'scenario/' + scenarioId, this.options);
  }



  getAllStepsFromServer() {
    this.setOptions( null);
    return this.http.get(this.sskBackendEndpoint + 'steps/', this.options);
  }

  getAllStepsMetaDataFromServer() {
    this.setOptions(null);
    return this.http.get(this.sskBackendEndpoint + 'steps/metadata', this.options);
  }

  setSearchData(data: any) {
    this.searchData = data;
  }
  getSearchData() {
    return this.searchData;
  }

  tagSanitize(tag: string) {
        tag = tag.substr(tag.lastIndexOf('/') + 1, tag.length);
        const otherKey = tag.split('=');
        if (otherKey.length > 0) {
          tag = otherKey[otherKey.length - 1];
        }
      return tag;
  }

  addStepMetadata(stepId: string): any {
    let metadata: Array<any> = [];
    if (this.getStepsMetadata().length > 0) {
      const item: any = _.find(this.getStepsMetadata(), (elt) => {
        return (elt._id === stepId);
      });
      let source: any;
      if (!isUndefined(item) && !isUndefined(item._source)) {
        source = item._source;
        if (source.objects instanceof Array) {
          metadata = metadata.concat(source.objects);
        }
        if (source.discipline instanceof Array) {
          metadata = metadata.concat(source.discipline);
        }
        if (source.activity instanceof Array) {
          metadata = metadata.concat(source.activity);
        }
        if (source.techniques instanceof Array) {
          metadata = metadata.concat(source.techniques);
        }
        if (source.standards instanceof Array) {
          metadata = metadata.concat(source.standards);
        }
      }
    }
    return metadata;
  }


  getAllResourcesFromServer() {
    this.setOptions(null);
    return this.http.get(this.sskBackendEndpoint + 'steps/resources', this.options);
  }


  testUrl(url: string) {
    this.setOptions(null);
    return this.http.get ('https://cors-anywhere.herokuapp.com/' + url, this.options);
  }

  testUrlForIframe(url: string) {
    if (url.indexOf('http') === -1) {
      url = 'http://' + url;
    }
    return this.http.get (url, this.options);
  }

  loadTermsFromServer(type: string) {
    this.setOptions( null);
    return this.http.get(this.sskBackendEndpoint + 'glossary/terms/' + type, this.options);
  }


  loadStandardsFromServer() {
   // return this.http.get ('https://cors-anywhere.herokuapp.com/' + environment.standardEndpoint, this.options);
   this.setOptions( null);
    return this.http.get(this.sskBackendEndpoint + 'standard/all', this.options);
  }

  searchFromServer(type, tag: string) {
    if (type === null) {
      this.setOptions(null);
      return this.http.get(this.sskBackendEndpoint + '_search/' + tag , this.options);
    } else {
      this.setOptions( {'tag': tag, 'type': type });
      return this.http.get(this.sskBackendEndpoint + '_search' , this.options);
    }
  }


  glossaryChange(item: string) {
    switch (item) {
      case 'objects':
        this.setGlossaryData(this.getObjects());
        break;
      case 'standards':
        this.setGlossaryData(_.sortBy(this.getStandards(), [function(o) { return o.standard_abbr_name; }]));
        break;
      case 'techniques':
        this.setGlossaryData(this.getTechniques());
        break;
      case 'activities':
        const temp = _.groupBy(_.each(this.getActivitiesForCount(), elt => {
              elt['term'] = this.normalize(elt['term']);
        }), 'group');
        this.setGlossaryData(Object.entries(temp).map(([key, obj]) => Object.assign({ head: key , items: obj})));
        break;
      case 'disciplines':
        this.setGlossaryData(_.sortBy(this.getDisciplines(), [function(o) { return o.term; }]));
        break;
    }
    return this.getGlossaryData();
  }


  loadData() {
      return new Promise ((resolve, reject) => {
        this.countItems('scenarios').subscribe(
          response => {
            this.setScenarioNumber(response['total']);
            this.setScenariosID(response['scenarios']);
           /*const rem = _.remove(this.getScenariosID(), function(n) {
              return (n['_id'] === 'SSK_sc_RUBRICA' ||  n['_id'] === 'SSK_sc_RUBRICA_technical');
            });*/
          },
          err => {
            resolve(true);
          },
          () => {
            this.setScenariosTemp(new Array<any>(this.getScenariosID().length));
              this.asynchFunction();
            resolve(this.getScenarios());
          });
      });
    }


  asynchFunction() {
    Observable.of(this.getScenariosID().forEach((elt) => {
      this.getScenarioDetails(elt._id).subscribe(
        result => {
          result.id = elt._id;
          result.lastUpdate = elt._source.lastUpdate;
          this.detailsResult = result;
        },
        error => {  },
        () => {
          this.addScenario(this.detailsResult);
          this.scenariosTemp.pop();
        }
      );
    })).subscribe(
      value => {
      }
    );
  }

  getAllStepsMetaData() {
    return new Promise ((resolve, reject) => {
      this.getAllStepsMetaDataFromServer().subscribe(
        stepMetadataResult => {
          this.setStepsMetadata(stepMetadataResult['step_metadata']);
        },
        error => {},
        () => {
          this.getGlossaryTerms();
          resolve(this.getStepsMetadata());
        }
      );
    });
  }

  getAllSteps() {
    return new Promise ((resolve, reject) => {
      this.getAllStepsFromServer().subscribe(
      stepResult => {
        this.setStepNumber(stepResult['total']);
        this.setSteps(stepResult['steps']);
      },
      error => {},
      () => {
        this.getAllStepsMetaData().then(
          (value) => {
            _.forEach(this.getSteps(), (step) => {
              step['metadata'] = this.addStepMetadata(step._id + step.position + 'Meta');
            });
            this.getAllResources().then(
              (val) => {
                _.forEach(this.getSteps(), (step) => {
                  step['resources'] = _.find(this.getResources(), (res) => {
                    return (res.parent === step._id);
                  });
                  if(step['resources'] !== undefined) {
                    console.log(step['resources'].length);
                  }
                });
                console.log(this.getSteps());
            });
          }
        );
        console.log(this.getSteps());
        resolve(this.getSteps());
      });
    });
  }

getGlossaryTerms() {
  this.tags.forEach((obj)  => {
    this.loadTermsFromServer(obj).subscribe(
      result => {
        switch (obj.toLowerCase()) {
          case 'activities':
            this.setActivities(result);
            this.setActivitiesKeys(_.map(this.getActivities(), 'head'));
            let items = _.map(_.flattenDeep(_.zip(_.flattenDeep(_.map(this.getActivities(), 'head')),
                    _.map(_.map(this.getActivities(), 'list'), 'item' )) ),  (elt) => {
                      if (typeof elt === 'string') {
                        this.group = elt;
                        }else {
                        elt['group'] = this.group;
                      return elt;
                    }
            });
            items = _.filter(items, (o)  =>  typeof o !== 'undefined' );
            this.setActivitiesForCount(items);
            this.setActivities(_.groupBy(items, 'group'));
            this.setActivities(_.map(_.toPairs(this.getActivities()), d => _.fromPairs([d])));
            this.searchData['activities'] = this.getActivities();
          break;
          case 'object':
            this.setObjects(result);
            this.searchData['objects'] = this.getObjects();
          break;
          case 'techniques':
          this.setTechniques(result);
            this.searchData['techniques'] = this.getTechniques();
          break;
          case 'disciplines':
            this.setDisciplines(result);
            this.searchData['disciplines'] = this.getDisciplines();
          break;
        }
      },
      error => {},
      () => {
        switch (obj.toLowerCase()) {
          case 'activities':
          Observable.of(_.forEach(this.searchData['activities'], (elt, key) => {
            _.map(elt[this.objectKey(elt)[0]], item => {
              item = this.getMetaDataNumber(item, 'step', false);
              item.type = 'activities';
              item.index = key;
              item.filter = item.term;
            });
          })).subscribe(
            (value) => { },
            (error) => { console.log(error); },
            () => {
              this.getAllStandards();
            });
          break;
          case 'object':
          _.map(this.searchData['objects'], item => {
            item = this.getMetaDataNumber(item, 'scenario', false);
            item.type = 'objects';
            item.filter = item.term;
          });
          break;
          case 'techniques':
          _.map(this.searchData['techniques'], item => {
            item = this.getMetaDataNumber(item, 'scenario', false);
            item.type = 'techniques';
            item.filter = item.term;
          });
          break;
          case 'disciplines':
          _.map(this.searchData['disciplines'], item => {
            item = this.getMetaDataNumber(item, 'scenario', false);
            item.type = 'disciplines';
            item.filter = item.term;
          });
          break;
        }
      });
  });
}

getAllStandards() {
   this.loadStandardsFromServer().subscribe(
    result => {
      this.setStandards(result['standards']);
      this.setStandardForCount(this.getStandards());
      this.searchData['standards'] = this.getStandards();
      _.map(this.searchData['standards'], item => {
        item = this.getMetaDataNumber(item, 'step', true);
        item.type = 'standards';
        item.filter = item.standard_abbr_name;
      });
    },
    error => {},
    () => {
      this.autoCompleteList =  _.concat(this.getActivitiesForCount(), this.getDisciplines(), this.getTechniques(), this.getObjects(), this.getStandards());
       this.searchTags = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('filter'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: this.autoCompleteList
          });
           this.search = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('filter'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: this.searchFor
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
            source: this.searchTags,
            templates: {
              header: '<div class="group">Terms</div>',
              suggestion: function(data) {
                return '<div><i class="fa fa-tag" aria-hidden="true"></i>' + data.filter + '<span  style = "border:none" class="' +
                        data.type.substring(0, data.type.length - 1) + '"> (' + data.type + ') </span></div>';
            }
            }
          });
      this.spinner = false;
    });
}

  getAllResources() {
    return new Promise ((resolve, reject) => {
      this.getAllResourcesFromServer().subscribe(
        resResult => {
          this.setResourceCount(resResult['total']);
          this.setResources(resResult['resources']);
        },
         error => {},
         () => {
          this.getAllStepsMetaData();
             resolve(this.getResources());
         });
       });
  }

  normalize(text: string ) {
    return _.capitalize(text);
  }

  updateSearchResult(elt: any): Observable<any[]> {
    this.searchResult['total'] = elt['count'];
    this.searchResult['data'] = elt['data'];
    return Observable.of(this.searchResult);
  }

  getMetaDataNumber(tag: any, type: string, ifStandard: boolean): Observable<any> {
    this.searchFromServer(type, (!ifStandard ) ? tag.term : tag.standard_abbr_name).subscribe(
      result => {
        this.searchResult = result;
      },
      error => {},
      () => {
        tag['count'] = this.searchResult['total'];
        tag['data'] = this.searchResult['data'];
      });
      return tag;
  }


  getScenarioNumber(): number {
    return this.scenarioNumber;
  }

  setScenarioNumber(value: number) {
    this.scenarioNumber = value;
  }

  getstepNumber(): number {
    return this.stepNumber;
  }

  setStepNumber(value: number) {
    this.stepNumber = value;
  }

  getResourceCount(): number {
    return this.resourceNumber;
  }

  setResourceCount(value: number) {
    this.resourceNumber = value;
  }

  getScenariosID(): any {
    return this.scenariosId;
  }
  setScenariosID(param: any): any {
    this.scenariosId = param;
  }


  getScenarios() {
    const rems = _.remove(this.scenarios, function(n) {
      return (n.id === 'SSK_sc_corpusModellingInTEI' ||  n.id === 'SSK_sc_RUBRICA');
    });
    return this.scenarios;
  }

  setScenarios(elts: any) {
    this.scenarios = elts;
  }

  addScenario(scenario: any) {
    this.scenarios.push(scenario);
  }

  getSteps() {
    return this.steps;
  }

  setSteps(steps: any): any  {
    this.steps = steps;
  }

  setOptions(params: any) {
    this.options = {params: params};
  }

  setParams(fields: Array<string>) {
    this.params = {'fields': fields.toString(), 'fromSSK': true};
  }

  getStepsMetadata() {
    return this.stepsMetaData;
  }

  setStepsMetadata(metadata: any): any  {
    this.stepsMetaData = metadata;
  }

  getResources() {
    return this.resources;
  }

  setResources(resources: any): any  {
    this.resources = resources;
  }

  getActivities() {
    return this.activities;
  }

  setActivities(activities: any): any  {
    this.activities = activities;
  }

  getDisciplines() {
    return this.disciplines;
  }

  setDisciplines(disciplines: any): any  {
    this.disciplines = disciplines;
  }

  getObjects() {
    return this.objects;
  }

  setObjects(objects: any): any  {
    this.objects = objects;
  }

  getTechniques() {
    return this.techniques;
  }

  setTechniques(techniques: any): any  {
    this.techniques = techniques;
  }

  getStandards() {
    return this.standards;
  }

  setStandards(standards: any): any  {
    this.standards = standards;
  }

  getTags() {
    return this.tags;
  }

  isUrl(s) {

    return this.regexp.test(s);
  }

  getGlossaryData() {
    return this.glossaryData;
  }

  setGlossaryData(elt: any ) {
    this.glossaryData = elt;
  }

  getscenariosTemp() {
    return this.scenariosTemp;
  }

  setScenariosTemp(elt: any ) {
    this.scenariosTemp = elt;
  }

  getResultCount() {
    return this.resultCount;
  }

  setResultCount(elt: number ) {
    this.resultCount = elt;
  }

  getActivitiesForCount() {
    return this.activitiesForCount;
  }

  setActivitiesForCount(activites: any ) {
    this.activitiesForCount = activites;
  }

  getActivitiesKeys() {
    return this.activitiesKeys;
  }

  setActivitiesKeys(keys: any ) {
    this.activitiesKeys = keys;
  }

  getStandardForCount() {
    return this.standardsForCount;
  }

  setStandardForCount(standards: any ) {
    this.standardsForCount = standards;
  }

  getResearchStarted() {
    return this.researchStarted;
  }

  setResearchStarted(item: boolean ) {
    this.researchStarted = item;
  }

  getResourceResults() {
    return this.resourceResults;
  }

  setResourceResults(elts: any) {
   this.resourceResults = elts;
  }

   getScenarioResults() {
     return this.scenarioResults;
   }

   setScenarioResults(elts: any) {
    this.scenarioResults = elts;
  }
  getStepResults () {
    return this.stepResults;
  }

  setStepResults (elts: any) {
     this.stepResults = elts;
  }


}
