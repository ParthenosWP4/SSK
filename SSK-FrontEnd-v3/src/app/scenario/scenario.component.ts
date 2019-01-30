import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, Renderer2, ElementRef} from '@angular/core';
import {Params, Router, ActivatedRoute } from '@angular/router';
import {SskService} from '../ssk.service';
import {Observable} from 'rxjs/Observable';
import {ElastichsearchService} from '../elastichsearch.service';
import * as _ from 'lodash';
import {isArray, isUndefined, isObject} from 'util';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalResourcesComponent} from './modal-resources/modal-resources.component';
import { IfObservable } from 'rxjs/observable/IfObservable';
@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
})
export class ScenarioComponent implements OnInit, AfterViewInit {

  timelineComponents = {};
  timelines: any;
  scenarioElt: any;
  selectedStep: any;
  left: number;
  idSelectedStep: number;
  timelineTotWidth: number;
  scenarioId: string;
  title: string;
  timelineTranslate: any;
  tagsLabel: any ;
  border: any = {};
  scenarioDetails = {};
  itemResult = {};
  move = '200px';
  target: any ;
  limit: number ;
  scenarioDesc = '';
  scenarioTitle = '';
  stepDesc = '';
  scenarioTags = {};
  stepTags = {};
  techniques = {};
  disciplines = {};
  activities = {};
  objects = {};
  spinner = true;
  spinnerSteps = true;
  forImage = environment.forImage;
  quoteIcon = 'quote' ;
  githubIcon = 'github-logo';
  resourceBtn = 'RESOURCES (specifications, papers, tutorials, etc.)';

 @ViewChild('authors') public authors: ElementRef;

  constructor(
    private sskService: SskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elasticServices: ElastichsearchService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef) {
    this.tagsLabel = this.elasticServices.getTags();
    this.left = 0;
    this.timelineTotWidth = 0;
    this.selectedStep = {};
    this.border.class = 'col-2';
    this.border.border = '1px dashed #979797';
    this.scenarioElt =  new Object();
  }




  ngOnInit() {
    this.sskService.setTitle('SSK - Scenario');
    window.scrollTo(0, 0);
    Observable.of(this.activatedRoute.params
      .subscribe((params: Params) => {
        this.scenarioId = params['id'];
        this.selectedStep.id = params['stepId'] ;
        this.idSelectedStep = this.selectedStep.id;
      }
      )).subscribe(
        (val) => {this.initializeScenarioElt(); },
        (error) => console.log(error),
        () => { });
  }

  ngAfterViewInit() {}

  initializeScenarioElt() {
    this.sskService.checkBackEndAvailability();
    if (this.elasticServices.getScenarios().length === 0) {
      this.elasticServices.countItems('scenarios').subscribe(
          result => {
            this.itemResult = result;
            this.elasticServices.setScenarioNumber(result['total']);
            this.elasticServices.setScenariosID(result['scenarios']);
          },
          err => {
            this.router.navigate(['errorpage']);
          },
          () =>  {
            this.elasticServices.getScenariosID().forEach((obj)  => {
              this.elasticServices.getScenarioDetails(obj._id).subscribe(
                detailsResult => {
                   detailsResult.id = obj._id;
                   detailsResult.lastUpdate = obj._source.lastUpdate;
                   this.scenarioDetails = detailsResult;
                  },
                error => {},
                () =>  {
                  this.elasticServices.addScenario(this.scenarioDetails);
                  if (this.scenarioDetails['id'] === this.scenarioId) {
                    this.scenarioElt = this.scenarioDetails;
                    if (typeof(this.scenarioElt.author.length) === 'undefined') {
                      const tem = new Array<any>(); tem.push(this.scenarioElt.author);
                      this.scenarioElt.author = tem;
                    }
                    Observable.of(this.scenarioElt.author).subscribe(
                      (value) => {
                        this.setAuthors();
                      }
                    );
                    this.setCurrentScenario();
                  }
                }
                );
            });
          }
        );
    } else {
      this.scenarioElt = _.find(this.elasticServices.getScenarios(), item => {
        return item.id === this.scenarioId;
      });
      Observable.of(this.scenarioElt.author).subscribe(
        (value) => {
          this.setAuthors();
        }
      );
      this.setCurrentScenario();
    }
  }


  setCurrentScenario() {
    this.scenarioTitle = this.sskService.updateText(((this.scenarioElt.title instanceof Array) ?
    this.scenarioElt.title[0] : this.scenarioElt.title), null);
    this.scenarioElt.descrip = (this.scenarioElt.desc instanceof Array) ? this.scenarioElt.desc[0] : this.scenarioElt.desc;
    this.scenarioDesc = this.sskService.updateText(this.scenarioElt.descrip, null);
    this.setMetadata('scenario');
    this.setScenarioSteps();
    this.sskService.setTitle('SSK - ' + this.scenarioTitle);
  }

  setScenarioSteps() {
       if (this.elasticServices.getSteps() === undefined) {
        this.elasticServices.getAllSteps().then(
          (value) => {
            this.scenarioElt.steps = _.sortBy(_.filter(this.elasticServices.getSteps(), (item) => {
              return (_.indexOf(_.map(item.parents, 'id'), this.scenarioId) !== -1);
            }), [ 'position']);
            this.updateSteps();
            this.spinnerSteps = false;
             this.cdr.detectChanges();
          });
       } else {
         this.scenarioElt.steps = _.sortBy(_.filter(this.elasticServices.getSteps(), (item) => {
          return (_.indexOf(_.map(item.parents, 'id'), this.scenarioId) !== -1);
        }), [ 'position']);
        this.updateSteps();
        this.spinnerSteps = false;
       }
 }

 updateSteps() {
  const steps = [];
  _.forEach(this.scenarioElt.steps, (step)  => {
    if (step.parents.length > 1) {
        _.forEach(step.parents, (item)  => {
          if (item.id === this.scenarioId) {
            let newStep: any = _.clone(step);
            newStep.position = item['position'];
            newStep = this.updateContent(newStep);
            steps.push(newStep);
          }
        });
    } else {
      step.position = step.parents[0].position;
      step = this.updateContent(step);
      steps.push(step);
    }
  });
  this.scenarioElt.steps = _.orderBy(steps, 'position', 'asc');
 }

  tagExist(tag: string, type: string  ) {
    if ( type === 'scenario' && !isUndefined(this.scenarioElt.scenario_metadata)) {
      this.scenarioElt.scenario_metadata = _.groupBy(_.flatMap(_.map(this.scenarioElt.scenario_metadata)), 'type');
    }
    if ( tag === 'standards') { return false ; }
     if (type === 'scenario' && !isUndefined(this.scenarioElt.scenario_metadata) &&
       !isUndefined(this.scenarioElt.scenario_metadata[this.changeTag(tag)])) {
      return this.scenarioElt.scenario_metadata[this.changeTag(tag)] ; }
     if (type === 'step' && this.selectedStep.metadata &&
       !isUndefined(this.selectedStep.metadata[this.changeTag(tag)])) { return this.selectedStep.metadata[this.changeTag(tag)] ; }
      return false;
  }


  setStepMetadata() {
    let temp: any;
    Observable.of(_.groupBy(this.elasticServices.getStepsMetadata(),  (item) => {
      return item._id ===  this.selectedStep._id + this.selectedStep.position + 'Meta';
    }).true).subscribe(
      (value) => { temp = value;  },
      (error) => { console.log(error); },
      () => {
        if ( temp != null && temp[0] != null && !isUndefined(temp[0]._source)) {
          this.selectedStep.metadata = _.groupBy(_.flatMap(_.map(temp[0]._source)), 'type');
            this.setMetadata('step');
            if (!isUndefined(temp[0]._source.standard)) {
              this.selectedStep.metadata.standards = temp[0]._source.standard;
            }
            if (!isUndefined(temp[0]._source.standards)) {
              this.selectedStep.metadata.standards = temp[0]._source.standards;
            }
            this.selectedStep.metadata.standards =  _.uniqWith(this.selectedStep.metadata.standards, _.isEqual);
          }
      });
  }

  setResources() {
    let resources: any;
    this.spinner = true;
    Observable.of(_.groupBy(this.elasticServices.getResources(), (item) => {
      return item.parent === this.selectedStep._id;
     }).true).subscribe(
      (value) => { resources = value;  },
      (error) => { console.log(error); },
      () => {
        this.selectedStep.projects = _.groupBy(resources, (item) => {
          return item.category === 'project';
        }).true;
        this.selectedStep.generals = _.groupBy(resources, (item) => {
          return item.category === 'general';
        }).true;
        if (this.selectedStep.generals || this.selectedStep.project) {
          this.spinner = false;
        }
        this.spinner = false;
      });
  }


  tagShow(tag: any) {
    if (tag.abbr !== undefined ) {
      tag.key = tag.abbr;
    }
    if ( this.sskService.isUrl(tag.key)) {
      tag.url  = tag.key;
      tag.key = tag.url.substr(tag.url.lastIndexOf('/') + 1, tag.url.length);
      const otherKey = tag.key.split('=');
      if (otherKey.length > 0) {
        tag.key = otherKey[otherKey.length - 1];
      }
    }
      return tag;
    }


  updateContent(step: any) {
    this.spinner = true;
    if (step.head instanceof Array) {
      step.title = this.sskService.updateText(step.head[0], null);
    } else {
      step.title = this.sskService.updateText(step.head, null);
    }
    if ( step.desc instanceof Array) {
      step.description = this.sskService.updateText(step.desc[0], 'step');
    } else {
      step.description = this.sskService.updateText(step.desc, 'step');
    }
   return step;
  }


  clean(text: string) {
    return text.replace(/\\n/g, '');
  }

  cleanAndOpen( text: string ) {
    window.open((text.indexOf('://') === -1) ? 'http://' + text.replace(/\\n/g, '') : text.replace(/\\n/g, ''), '_blank');
  }

  updateText(desc: any, type: string) {
    let text = '';
    if ( desc['content'] && isArray(desc['content'])) {
      _.forEach(desc['content'], (part) => {
        if (typeof part === 'object') {
          if (part['ref']) {
            text += this.setLink(part['ref']);
          }
          if (part['list']) {
            const list = part['list'];
            text += this.setList(list['item']);
          }
        } else {
          text += part + ' ';
        }
      });
    } else {
      text = desc['content'];
    }
    if ( type === 'scenario') {
      this.scenarioDesc = text;
    } else {
      this.stepDesc = text;
    }
  }

  setLink(part: object) {
    return '<a href=\"' + part['target'] + '\" target = \"_blank\" >' + part['content'] + '</a>';
  }

  setList(part: object) {
    let list = '<ul>';
    _.forEach(part, (item) => {
        list += '<li>' + item + '</li>';
    });
    list += '</ul>';
    return list;
  }

  changeTag(tag: string) {
    let result = '';
    switch (tag) {
      case 'activities':
        result = 'activity';
      break;
      case 'techniques':
      case 'technique':
        result = 'technique';
      break;
      case 'disciplines':
      case 'discipline':
        result = 'discipline';
      break;
      case 'standards':
        result = 'standards';
      break;
      case 'objects':
      case 'object':
        result = 'object';
      break;
    }
    return result;
  }

  getResources() {
    return this.elasticServices.getResources;
  }

  setMetadata(type: string) {
    const tags: any  = {};
    let metadata: any = {};
    if (type === 'scenario') {
      metadata = this.scenarioElt.scenario_metadata;
      this.scenarioTags = metadata;
    } else {
      metadata = this.selectedStep.metadata;
      this.stepTags = metadata ;
    }
    this.elasticServices.getTags().forEach(tag => {
      switch (tag) {
        case 'activities':
          tags['activity'] = metadata.activity;
          break;
        case 'techniques':
        case 'technique':
          tags['technique'] = metadata.technique;
          break;
        case 'disciplines':
        case 'discipline':
          tags.discipline = metadata.discipline;
        break;
        case 'standards':
        case 'standard':
          break;
        case 'objects':
        case 'object':
          tags['object'] = metadata.object;
          break;
      }
    });
  }


  open(position: number, step: any) {
    const modalRef = this.modalService.open(ModalResourcesComponent, { size: 'lg' });
    modalRef.componentInstance.step = step;
    modalRef.componentInstance.position = position;
  }

  setAuthors() {
    console.log(this.scenarioElt)
     let i = 0;
    this.scenarioElt.author.forEach( (elt) => {
      const authorSpan: HTMLElement = document.createElement('span');
      const comma = ( ++i < this.scenarioElt.author.length ) ? ',  ' : ' ';
      this.renderer.addClass(authorSpan, 'pop');
      this.renderer.setProperty(authorSpan, 'innerHTML', elt.persName + comma );
       this.renderer.setAttribute(authorSpan, 'data-container', 'body');
       this.renderer.setAttribute(authorSpan, 'data-toggle', 'popover');
       this.renderer.setAttribute(authorSpan, 'data-placement', 'right');
       this.renderer.setAttribute(authorSpan, 'data-content', `<div class="row"><div class="col-3">
       <img  src= ` + this.forImage + `'/assets/images/usertooltip.svg'"
         class="pull-right img-fluid main" ></div><div class="col author">` + elt.persName +
       `<br> <span class="affiliation">` + elt.affiliation + `</span></div></div> </div>`);
       this.renderer.appendChild(this.authors.nativeElement, authorSpan);
    });
    (<any>$('.pop')).popover({ trigger: 'manual' , html: true, animation: false})
       .on('mouseenter', function () {
           const _this = this;
           (<any>$(this)).popover('show');
           $('.popover').on('mouseleave', function () {
             (<any>$(_this)).popover('hide');
           });
       }).on('mouseleave', function () {
           const _this = this;
           setTimeout(function () {
               if (!$('.popover:hover').length) {
                 (<any>$(_this)).popover('hide');
               }
           }, 40);
     });
  }
  toGithub() {
    window.open('https://github.com/ParthenosWP4/SSK/blob/master/scenarios/' + this.scenarioId + '.xml', '_blank');
  }
}

