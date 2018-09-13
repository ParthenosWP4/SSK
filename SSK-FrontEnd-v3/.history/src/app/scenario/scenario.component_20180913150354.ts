import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Params, Router, ActivatedRoute } from '@angular/router';
import {SskServicesService} from '../ssk-services.service';
import {Observable} from 'rxjs/Observable';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import * as _ from 'lodash';
import {isArray, isUndefined} from 'util';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {isDefined} from '@angular/compiler/src/util';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit  {

  timelineComponents = {};
  timelines: any;
  scenarioElt: any;
  selectedStep: any;
  left: number;
  idSelectedStep: number;
  timelineTotWidth: number;
  scenarioId: string;
  timelineTranslate: any;
  tagsLabel: any ;
  border: any = {};
  scenarioDetails = {};
  itemResult = {};
  move = '200px';
  target: any ;
  limit: number ;
  scenarioDesc = '';
  stepDesc = '';
  scenarioTags = {};
  stepTags = {};
  techniques = {};
  disciplines = {};
  activities = {};
  objects = {};
  spinner = true;

  constructor(
    private sskService: SskServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elasticServices: ElastichsearchServicesService,
    private sanitizer: DomSanitizer) {
    this.tagsLabel = this.elasticServices.getTags();
    this.left = 0;
    this.timelineTotWidth = 0;
    this.selectedStep = {};
    this.scenarioElt = {};
    this.border.class = 'col-2';
    this.border.border = '1px dashed #979797';

  }


  ngOnInit() {
    this.sskService.setTitle('SSK - Scenario');
    window.scrollTo(0, 0);
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.scenarioId = params['id'];
        this.selectedStep.id = params['stepId'] ;
        this.idSelectedStep = this.selectedStep.id - 1;
      });
    this.initializeScenarioElt();
  }

  initializeScenarioElt() {
    this.sskService.checkBackEndAvailability();
    if (this.elasticServices.getScenarios().length === 0) {
      this.elasticServices.countItems('scenarios').subscribe(
          result => {
            this.itemResult = result;
            this.elasticServices.setScenarioNumber(this.itemResult['total']);
            this.elasticServices.setScenariosID(this.itemResult['scenarios']);
          },
          err => {
            this.router.navigate(['errorpage']);
          },
          () =>  {
            this.elasticServices.getAllSteps();
            this.elasticServices.getScenariosID().forEach((obj)  => {
              this.elasticServices.getScenarioDetails(obj._id).subscribe(
                detailsResult => {
                   detailsResult.id = obj._id;
                   this.scenarioDetails = detailsResult;
                  },
                error => {},
                () =>  {
                    this.elasticServices.addScenario(this.scenarioDetails);
                    if (this.elasticServices.getScenarios().length === this.elasticServices.getScenarioNumber()) {
                      this.scenarioElt = _.find(this.elasticServices.getScenarios(), (item) => {
                        return item.id === this.scenarioId;
                      });
                      this.scenarioElt.title = (this.scenarioElt.title instanceof Array) ? this.scenarioElt.title[0]
                        : this.scenarioElt.title;
                      this.scenarioElt.descrip = (this.scenarioElt.desc instanceof Array) ? this.scenarioElt.desc[0]
                        : this.scenarioElt.desc;
                      this.updateText(this.scenarioElt.descrip, 'scenario');
                      this.setScenarioSteps(this.scenarioId);
                      this.setMetadata('scenario');
                      this.sskService.setTitle('SSK - ' + this.scenarioElt.title.content);
                    }
                  });
            });
          }
        );
    } else {
      this.scenarioElt = _.find(this.elasticServices.getScenarios(), (item) => {
        return item.id === this.scenarioId;
      });
      this.scenarioElt.title = (this.scenarioElt.title instanceof Array) ? this.scenarioElt.title[0] : this.scenarioElt.title;
      this.scenarioElt.descrip = (this.scenarioElt.desc instanceof Array) ? this.scenarioElt.desc[0] : this.scenarioElt.desc;
      this.updateText(this.scenarioElt.descrip, 'scenario');
      this.setMetadata('scenario');
      this.setScenarioSteps(this.scenarioId);
      this.sskService.setTitle('SSK - ' + this.scenarioElt.title.content);
    }
  }

  setScenarioSteps(scenarioId: string) {
    if ( isUndefined(this.elasticServices.getSteps())) {
      this.elasticServices.getAllSteps();
      this.scenarioElt.steps = _.sortBy(_.groupBy(this.elasticServices.getSteps(), (item) => {
        return item.parent === this.scenarioId;
      }).true, [ 'position']);
      _.forEach(this.elasticServices.getSteps(), (step) => {
        step['metadata'] = this.elasticServices.addStepMetadata(step._id);
      });
      this.initializeCurrentStep(this.scenarioElt);
    } else {
      this.scenarioElt.steps = _.sortBy(_.groupBy(this.elasticServices.getSteps(), (item) => {
        return item.parent === this.scenarioId;
      }).true, [ 'position']);
      this.initializeCurrentStep(this.scenarioElt);
    }


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

  initializeCurrentStep(scenario: any) {
    this.timelines = $('.cd-horizontal-timeline');
    this.timelineTotWidth = this.timelines.width();
    this.left = this.timelineTotWidth / 7;
    if (!isUndefined(this.scenarioElt.steps) && this.scenarioElt.steps.length > 5) {
      this.timelineTotWidth = this.timelineTotWidth + this.left * (this.scenarioElt.steps.length - 5);
    }

    if ( this.timelines.length > 0) {
      this.initTimeline(this.timelines);
    }
    this.timelineTranslate = 0;
    this.initTimeline(this.timelines);
    if (scenario['steps']) {
      this.selectedStep = scenario.steps[this.selectedStep.id - 1];
      this.selectedStep.ref = this.selectedStep._id;
      this.updateContent(this.selectedStep, this.selectedStep.position, null);
    }
    console.log(this.selectedStep)
  }


  setStepMetadata() {
    console.log(this.elasticServices.getStepsMetadata());
    setTimeout(() => {
    const temp  = _.groupBy(this.elasticServices.getStepsMetadata(),  (item) => {
      return item._id ===  this.selectedStep._id + 'Meta';
    }).true;
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
      console.log(this.selectedStep.metadata.standards);
    }
    }, 1000);
  }

  setResources() {
    setTimeout(() => {
      this.spinner = true;
      const resources = _.groupBy(this.elasticServices.getResources(), (item) => {
        return item.parent === this.selectedStep._id;
      }).true;

      this.selectedStep.projects = _.groupBy(resources, (item) => {
        return item.category === 'project';
      }).true;

      this.selectedStep.generals = _.groupBy(resources, (item) => {
        return item.category === 'general';
      }).true;
      console.log(this.selectedStep);
      if (this.selectedStep.generals || this.selectedStep.project) {
        this.spinner = false;
      }
      this.spinner = false;
    }, 2000);

  }


  tagShow(tag: any) {
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


  setStepTitleAndDescription() {
    if (this.selectedStep.head instanceof Array) {
      this.selectedStep.title = this.selectedStep.head[0];
    } else {
      this.selectedStep.title = this.selectedStep.head;
    }
    if ( this.selectedStep.desc instanceof Array) {
      // 'description' is a new field
      this.selectedStep.description = this.selectedStep.desc[0];
    } else {
      this.selectedStep.description = this.selectedStep.desc;
    }
    this.updateText(this.selectedStep['description'], 'step');
  }

  updateContent(step: any, index: number, event: any) {
    this.spinner = true;
    this.router.navigate(['scenarios', this.scenarioId,  step.position]);
    this.idSelectedStep = index - 1;
     this.selectedStep = step;
    this.selectedStep.id  =  index;
    this.selectedStep.ref = this.selectedStep._id;
    this.setStepTitleAndDescription();
    console.log(this.selectedStep);
    this.setStepMetadata();
    this.setResources();

  }

  /*nextStep() {
      this.idSelectedStep = this.selectedStep.position ;
      this.router.navigate(['scenarios', this.scenarioId,  this.idSelectedStep + 1]);
      this.passSlide();
      this.selectedStep = _.find(this.scenarioElt.steps, (item) => {
        return item.position === this.idSelectedStep + 1;
      });
      this.selectedStep.ref = this.selectedStep._id;
      this.setStepTitleAndDescription();
      this.setStepMetadata()
      this.setResources();
  }*/

  clean(text: string) {
    return text.replace(/\\n/g, '');
  }

  cleanAndOpen( text: string ) {
    window.open((text.indexOf('://') === -1) ? 'http://' + text.replace(/\\n/g, '') : text.replace(/\\n/g, ''), '_blank');
  }


  // Timeline Functions
  initTimeline(timelines: any) {
    const _self = this;
    timelines.each(function () {
      const timeline = $(this);
        /*cache timeline components*/
      _self.timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
      _self.timelineComponents['eventsWrapper'] = _self.timelineComponents['timelineWrapper'].children('.events');
      _self.timelineComponents['fillingLine'] = _self.timelineComponents['eventsWrapper'].children('.filling-line');
      _self.timelineComponents['timelineEvents'] = _self.timelineComponents['eventsWrapper'].find('a');
      _self.timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
      _self.timelineComponents['eventsContent'] = timeline.children('.events-content');
    });
  }


  updateSlide(string: string, event: any) {
    event.preventDefault();
    this.target  = $('ul.timeline.timeline-horizontal');
    this.limit = -((this.scenarioElt.steps.length -3) * $('li.timeline-item').width())
    this.move = (2.5 * $('li.timeline-item').width()) + 'px'

    const currentPosition = Number(this.target.css('left').replace('px', '' ));

    if (string === 'next' && currentPosition >= this.limit) {
      $('.timeline').stop(false, true).animate({left:'-=' + this.move},{ duration: 400});
    }

    if (string === 'prev' && currentPosition < 0) {
      $('.timeline').stop(false, true).animate({left:'+=' + this.move},{ duration: 400});
    }
  }

getStepTitle(step: any) {
  if (step.head instanceof Array) {
    return step.head[0].content;
  } else {
    return step.head.content;
  }
}

  updateText(desc: any, type: string) {
    let text = ''
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
        result = 'objects';
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
      console.log( this.scenarioElt.scenario_metadata);
      metadata = this.scenarioElt.scenario_metadata;
    }
    if (type === 'step') {
      metadata = this.selectedStep.metadata;
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
          //tags.standards = metadata.discipline;
          break;
        case 'objects':
        case 'object':
          tags['object'] = metadata.object;
          break;
      }
    });
    if (type === 'scenario') {
      this.scenarioTags = metadata;
    }
    if (type === 'step') {
     this.stepTags = metadata ;
    }
  }

}




