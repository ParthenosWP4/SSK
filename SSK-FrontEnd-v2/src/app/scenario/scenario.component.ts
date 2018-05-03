import { Component, OnInit } from '@angular/core';
import {Params, Router, ActivatedRoute } from '@angular/router';
import {SskServicesService} from '../ssk-services.service';
import {Observable} from 'rxjs/Observable';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import * as _ from 'lodash';
import {isUndefined} from 'util';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  timelineComponents = {};
  timelines: any;
  scenarioElt: any;
  selectedStep: any;
  left: number;
  idSelectedStep: number;
  timelineTotWidth: number;
  scenarioId: string;
  timelineTranslate: any;
  tags: any ;
  private data: Observable<any>;
  border: any = {};
  scenarioDetails = {};
  itemResult = {};

  constructor(
    private sskService: SskServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elasticServices: ElastichsearchServicesService,
    private sanitizer: DomSanitizer) {
    this.tags = this.elasticServices.getTags();
    this.left = 0;
    this.timelineTotWidth = 0;
    this.selectedStep = {};
    this.scenarioElt = {};
    this.border.class = 'col-2';
    this.border.border = '1px dashed #979797';


  }

  ngOnInit() {
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
    if (this.elasticServices.getScenarios().length === 0) {
      this.elasticServices.countItems('scenarios')
        .subscribe(
          result => {
            this.itemResult = result;
          },
          err => console.error('Initialize Scenarios Id Error : ' + err ),
          () =>  {
            this.elasticServices.setScenarioNumber(this.itemResult['total']);
            this.elasticServices.setScenariosID(this.itemResult['scenarios']);
            this.elasticServices.getAllResources().subscribe(
              result => {},
              error2 => {},
              () => {
                this.elasticServices.getScenariosID().forEach((obj)  => {
                  this.elasticServices.getScenarioDetails(obj._id)
                    .subscribe(
                      detailsResult => {
                        detailsResult.id = obj._id;
                        this.scenarioDetails = detailsResult;
                      },
                      error => console.error('500 - Internal Server Error :' + error),
                      () =>  {
                        this.elasticServices.addScenario(this.scenarioDetails);
                        if (obj._id === this.scenarioId) {
                          this.scenarioElt = _.find(this.elasticServices.getScenarios(), (item) => {
                            return item.id === this.scenarioId;
                          });
                          // setTimeout(() => {
                          this.scenarioElt.title = (this.scenarioElt.title instanceof Array) ? this.scenarioElt.title[0]
                            : this.scenarioElt.title;
                          this.scenarioElt.descrip = (this.scenarioElt.desc instanceof Array) ? this.scenarioElt.desc[0]
                            : this.scenarioElt.desc;
                          // }, 100);
                          this.setScenarioSteps(this.scenarioId);
                        }
                      });
                });
              }
            );
          }
        );
    } else {
      this.scenarioElt = _.find(this.elasticServices.getScenarios(), (item) => {
        return item.id === this.scenarioId;
      });
      this.scenarioElt.title = (this.scenarioElt.title instanceof Array) ? this.scenarioElt.title[0] : this.scenarioElt.title;
      this.scenarioElt.descrip = (this.scenarioElt.desc instanceof Array) ? this.scenarioElt.desc[0] : this.scenarioElt.desc;
      this.setScenarioSteps(this.scenarioId);
    }
  }

  setScenarioSteps(scenarioId: string) {
    if ( isUndefined(this.elasticServices.getSteps())) {
      this.elasticServices.getAllSteps().subscribe(
        result => {},
        err => console.error('Get All Steps: 500 - Internal Server Error : ' + err ),
        () => {
          this.scenarioElt.steps = _.sortBy(_.groupBy(this.elasticServices.getSteps(), (item) => {
            return item._parent === this.scenarioId;
          }).true, [ 'position']);
          this.initializeCurrentStep(this.scenarioElt);
        }
      );
    } else {
      this.scenarioElt.steps = _.sortBy(_.groupBy(this.elasticServices.getSteps(), (item) => {
        return item._parent === this.scenarioId;
      }).true, [ 'position']);
    }
   // setTimeout(() => {
      this.initializeCurrentStep(this.scenarioElt);
   // },1000);

  }

  tagExist(tag: string, type: string  ) {
    if ( tag === 'standards') { return false ; }
     if (type === 'scenario' && !isUndefined(this.scenarioElt.scenario_metadata) &&
       !isUndefined(this.scenarioElt.scenario_metadata[tag])) { return this.scenarioElt.scenario_metadata[tag] ; }
     if (type === 'step' && !isUndefined(this.selectedStep.metadata) &&
       !isUndefined(this.selectedStep.metadata[tag])) { return this.selectedStep.metadata[tag] ; }
      return false;
  }

  initializeCurrentStep(scenario: any) {
    this.timelines = $('.cd-horizontal-timeline');
    this.timelineTotWidth = this.timelines.width();
    this.left = this.timelineTotWidth / 7;

    if (!isUndefined(this.scenarioElt.steps) && this.scenarioElt.steps.length > 5) {
      this.timelineTotWidth = this.timelineTotWidth + this.left * (this.scenarioElt.steps.length - 5);
    }

    (this.timelines.length > 0) && this.initTimeline(this.timelines);
    this.timelineTranslate = 0;
    this.initTimeline(this.timelines);
    if (!isUndefined(scenario.steps)) {
      this.selectedStep = scenario.steps[this.selectedStep.id - 1 ];
     this.selectedStep.ref = this.selectedStep._id;
     this.setStepTitleAndDescription();
     if (this.elasticServices.getStepsMetadata().length  === 0) {
       this.elasticServices.getAllStepsMetaData().subscribe(result => {},
         err => console.error('get All Steps MetaData: 500 - Internal Server Error : ' + err ),
         () => {
           this.setStepMetadata();
           this.setResources();
         });
     } else {
       this.setStepMetadata();
       this.setResources();
      }
    }
  }

  setStepMetadata() {
    const temp  = _.groupBy(this.elasticServices.getStepsMetadata(),  (item) => {
      return item._parent ===  this.selectedStep._id;
    }).true;
    if (temp[0] != null && !isUndefined(temp[0]._source)) {
      this.selectedStep.metadata = temp[0]._source;
    }



    if ( !isUndefined(this.selectedStep.metadata.standards)) {
      this.selectedStep.metadata.standards = _.uniqBy(this.selectedStep.metadata.standards, 'abbr');
    }

  }

  setResources() {
    const resources = _.groupBy(this.elasticServices.getResources(),  (item) => {
      return item._parent ===  this.selectedStep._id;
    }).true ;

    this.selectedStep.projects =  _.groupBy(resources,  (item) => {
      return item.category ===  'project';
    }).true;

    this.selectedStep.generals =  _.groupBy(resources,  (item) => {
      return item.category ===  'general';
    }).true;

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
    console.log(this.selectedStep);
  }

  updateContent(step: any, index: number, event: any) {
    this.router.navigate(['scenarios', this.scenarioId,  step.position]);
    this.idSelectedStep = index;
     this.selectedStep = step;
    this.selectedStep.id  =  index + 1;
    this.selectedStep.ref = this.selectedStep._id;
    this.setStepTitleAndDescription();
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
   // console.log((text.indexOf('://') === -1) ? 'http://' + text.replace(/\\n/g, '') : text.replace(/\\n/g, ''));
    window.open((text.indexOf('://') === -1) ? 'http://' + text.replace(/\\n/g, '') : text.replace(/\\n/g, ''), '_blank');
  }


  // Timeline Functions
  initTimeline(timelines: any) {
    const _self = this;
    timelines.each(function () {
      const timeline = $(this);
      //cache timeline components
      _self.timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
      _self.timelineComponents['eventsWrapper'] = _self.timelineComponents['timelineWrapper'].children('.events');
      _self.timelineComponents['fillingLine'] = _self.timelineComponents['eventsWrapper'].children('.filling-line');
      _self.timelineComponents['timelineEvents'] = _self.timelineComponents['eventsWrapper'].find('a');
      _self.timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
      _self.timelineComponents['eventsContent'] = timeline.children('.events-content');

      //keyboard navigation
      $(document).keyup(function (event: any) {
        if (event.which === '37' && _self.elementInViewport(timeline.get(0))) {
          _self.showNewContent(_self.timelineComponents, _self.timelineTotWidth, 'prev');
        } else if (event.which == '39' && _self.elementInViewport(timeline.get(0))) {
          _self.showNewContent(_self.timelineComponents, _self.timelineTotWidth, 'next');
        }
      });
    });
  }

  /*passSlide() {
    var eventsWrapper = this.timelineComponents['eventsWrapper'].get(0);
    const  halfStep = this.scenarioElt.steps.length / 2;
    const translateValue = this.getTranslateValue(this.timelineComponents['eventsWrapper']),
      wrapperWidth = Number(this.timelineComponents['timelineWrapper'].css('width').replace('px', ''));
    console.log(halfStep)
    console.log(this.idSelectedStep);

   /* (this.idSelectedStep - 1 >=  halfStep)
      ? this.translateTimeline(this.timelineComponents, translateValue - wrapperWidth + this.left, wrapperWidth - this.timelineTotWidth)
      : this.translateTimeline(this.timelineComponents, translateValue + wrapperWidth - this.left);

    (this.idSelectedStep + 1   >  halfStep)
      ? this.setTransformValue(eventsWrapper, 'translateX', -200 + 'px')
      : this.setTransformValue(eventsWrapper, 'translateX', 200 + 'px');
  }*/

  updateSlide(string: string) {
    const translateValue = this.getTranslateValue(this.timelineComponents['eventsWrapper']),
      wrapperWidth = Number(this.timelineComponents['timelineWrapper'].css('width').replace('px', ''));
    (string === 'next')
      ? this.translateTimeline(this.timelineComponents, translateValue - wrapperWidth + this.left, wrapperWidth - this.timelineTotWidth)
      : this.translateTimeline(this.timelineComponents, translateValue + wrapperWidth - this.left);
  }


  showNewContent(timelineComponents, timelineTotWidth, string) {
    //go from one event to the next/previous one
    const visibleContent = timelineComponents['eventsContent'].find('.selected'),
      newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

    if (newContent.length > 0) { //if there's a next/prev event - show it
      const selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
        newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

      this.updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
      this.updateVisibleContent(newEvent, timelineComponents['eventsContent']);
      newEvent.addClass('selected');
      selectedDate.removeClass('selected');
      this.updateOlderEvents(newEvent);
      this.updateTimelinePosition(string, newEvent, timelineComponents);
    }
  }

  updateTimelinePosition(string, event, timelineComponents) {
    //translate timeline to the left/right according to the position of the selected event
    const eventStyle = window.getComputedStyle(event.get(0), null),
      eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
      timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
      timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
    this.timelineTranslate = this.getTranslateValue(timelineComponents['eventsWrapper']);

    if ((string === 'next' && eventLeft > timelineWidth - this.timelineTranslate) || (string == 'prev' && eventLeft < - this.timelineTranslate)) {
      this.translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
    }
  }

  translateTimeline(timelineComponents: any, value: number, totWidth?: number) {
    const eventsWrapper = timelineComponents['eventsWrapper'].get(0);
    value = (value > 0) ? 0 : value;
    //only negative translate value
    value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value;
    this.setTransformValue(eventsWrapper, 'translateX', value + 'px');
    //update navigation arrows visibility
    (value === 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
    (value === totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
  }

  updateFilling(selectedEvent, filling, totWidth) {
    //change .filling-line length according to the selected event
    const eventStyle = window.getComputedStyle(selectedEvent, null);

    const eventLeft = eventStyle.getPropertyValue('left');
    const eventWidth = eventStyle.getPropertyValue('width');
    const eventLef = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
    const scaleValue = eventLef / totWidth;
    this.setTransformValue(filling.get(0), 'scaleX', scaleValue);
  }

  setTimelineWidth(timelineComponents, width) {
    let timeSpan = this.daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]);
      let timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'];
      timeSpanNorm = Math.round(timeSpanNorm) + 4;
      let totalWidth = timeSpanNorm * width;
    timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
    this.updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
    this.updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

    return totalWidth;
  }

  updateVisibleContent(event, eventsContent) {
    const eventDate = event.data('date'),
      visibleContent = eventsContent.find('.selected'),
      selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
      selectedContentHeight = selectedContent.height();
    let  classEnetering, classLeaving : any;
    if (selectedContent.index() > visibleContent.index()) {
       classEnetering = 'selected enter-right',
        classLeaving = 'leave-left';
    } else {
       classEnetering = 'selected enter-left',
        classLeaving = 'leave-right';
    }

    selectedContent.attr('class', classEnetering);
    visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
      visibleContent.removeClass('leave-right leave-left');
      selectedContent.removeClass('enter-left enter-right');
    });
    eventsContent.css('height', selectedContentHeight + 'px');
  }

  updateOlderEvents(event) {
    event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
  }


  getTranslateValue(timeline) {
    let translateValue = 0;
    const timelineStyle = window.getComputedStyle(timeline.get(0), null);
    this.timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
      timelineStyle.getPropertyValue('-moz-transform') ||
      timelineStyle.getPropertyValue('-ms-transform') ||
      timelineStyle.getPropertyValue('-o-transform') ||
      timelineStyle.getPropertyValue('transform');

    if (this.timelineTranslate.indexOf('(') >= 0) {
      let timelineTranslate = this.timelineTranslate.split('(')[1];
      timelineTranslate = timelineTranslate.split(')')[0];
      timelineTranslate = timelineTranslate.split(',');
      translateValue = timelineTranslate[4];
    }

    return Number(translateValue);
  }

  setTransformValue(element, property, value) {
    element.style['-webkit-transform'] = property + '(' + value + ')';
    element.style['-moz-transform'] = property + '(' + value + ')';
    element.style['-ms-transform'] = property + '(' + value + ')';
    element.style['-o-transform'] = property + '(' + value + ')';
    element.style['transform'] = property + '(' + value + ')';
  }

  daydiff(first, second) {
    return Math.round((second - first));
  }



  /*
        How to tell if a DOM element is visible in the current viewport?
        http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    */
  elementInViewport(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

  checkMQ() {
    //check if mobile or desktop device
    return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'),
      '::before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '');
  }
}




