import {AfterViewInit, Component, OnInit} from '@angular/core';
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
  tags: any ;
  private data: Observable<any>;
  border: any = {};
  scenarioDetails = {};
  itemResult = {};
  move = '200px'
  target: any ;
  limit: number ;

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
    this.sskService.setTitle('SSK - Scenario')
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
                          this.sskService.setTitle('SSK - ' + this.scenarioElt.title.content);
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
    //this.limit = - Number($('#ontimeline').width());
    this.limit = -((this.scenarioElt.steps.length -3) * $('li.timeline-item').width())
    this.move = (2.5 * $('li.timeline-item').width()) + 'px'

    const currentPosition = Number(this.target.css('left').replace('px', '' ));

    console.log(currentPosition)
    console.log(this.limit)
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
}




