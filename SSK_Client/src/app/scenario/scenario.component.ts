import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef,QueryList, ViewChildren, Renderer2, ElementRef } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { SskService } from '../ssk.service';
import { Observable } from 'rxjs/Observable';
import { ElastichsearchService } from '../elastichsearch.service';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalResourcesComponent } from './modal-resources/modal-resources.component';
import { ClipboardService } from 'ngx-clipboard';
import * as moment from 'moment';

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
  tagsLabel: any;
  border: any = {};
  scenarioDetails = {};
  itemResult = {};
  move = '200px';
  target: any;
  limit: number;
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
  quoteIcon = 'quote';
  githubIcon = 'github-logo';
  preliminaryScenarios: Array<any> = new Array();
  followUpScenarios: Array<any> = new Array();
  baseScenarios: Array<any> = new Array();
  preliminaryScenario = 'Preliminary scenario(s)';
  followUpScenario = 'Follow-up scenario(s)';
  preliminayScenarioIcon = 'Exclamation_point.svg';
  resourceBtn = 'RESOURCES (specifications, papers, tutorials, etc.)';
  copyRef = 'Copy the reference of the scenario';
  shift = null;

  @ViewChild('authors') public authors: ElementRef;
  @ViewChild('toolTip') public toAddtooltip: ElementRef;
  @ViewChildren('divs') stpesList: QueryList<ElementRef>;

  constructor(
    private _clipboardService: ClipboardService,
    private sskService: SskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elasticServices: ElastichsearchService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef) {
    this.tagsLabel = this.elasticServices.getTags();
    this.left = 0;
    this.timelineTotWidth = 0;
    this.selectedStep = {};
    this.border.class = 'col-2';
    this.border.border = '1px dashed #979797';
    this.scenarioElt = new Object();
  }




  ngOnInit() {
    this.sskService.setTitle('SSK - Scenario');
    window.scrollTo(0, 0);
    Observable.of(this.activatedRoute.params
      .subscribe((params: Params) => {
        this.scenarioId = params['id'];
        if ( this.activatedRoute.children.length > 0)  {
          this.activatedRoute.children[0].params.subscribe(
            (chilParams: Params) => {
              this.selectedStep.id = chilParams['stepId'];
              this.idSelectedStep = this.selectedStep.id;
            }
          );
        }
      }
      )).subscribe(
        (val) => { this.initializeScenarioElt(); },
        (error) => console.log(error),
        () => { });
  }

  ngAfterViewInit() {
    this.stpesList.changes.subscribe(
      result => {
        result.forEach((element) => {
          if (element.nativeElement.innerText === this.selectedStep.id ) {
            element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' , });
          }
        });
      },
      error => { console.log(error); },
      () => {
    });
  }

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
        () => {
          this.elasticServices.getScenariosID().forEach((obj) => {
            this.elasticServices.getScenarioDetails(obj._id).subscribe(
              detailsResult => {
                detailsResult.id = obj._id;
                detailsResult.lastUpdate = obj._source.lastUpdate;
                detailsResult.followUp = obj._source.followUp;
                detailsResult.preliminary = obj._source.preliminary;
                this.scenarioDetails = detailsResult;
              },
              error => { },
              () => {
                this.elasticServices.addScenario(this.scenarioDetails);
                if (this.scenarioDetails['id'] === this.scenarioId) {
                  this.scenarioElt = this.scenarioDetails;
                  if (typeof (this.scenarioElt.author.length) === 'undefined') {
                    const tem = new Array<any>(); tem.push(this.scenarioElt.author);
                    this.scenarioElt.author = tem;
                  }
                  Observable.of(this.scenarioElt.author).subscribe(
                    (value) => {
                      this.setAuthors();
                      this.setCurrentScenario();
                    }
                  );
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
      if (typeof (this.scenarioElt.author.length) === 'undefined') {
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


  setCurrentScenario() {
    this.scenarioTitle = this.sskService.updateText(((this.scenarioElt.title instanceof Array) ?
      this.scenarioElt.title[0] : this.scenarioElt.title), null);
    // this.scenarioElt.descrip = this.scenarioElt.scenarioDesc[0];
    // this.scenarioDesc = this.sskService.updateText(this.scenarioElt.descrip, null);
    this.scenarioDesc = this.scenarioElt.desc[0].content;
    this.setMetadata('scenario');
    this.setScenarioSteps();
    this.sskService.setTitle('SSK - ' + this.scenarioTitle);
    Observable.of(_.filter(_.clone(this.elasticServices.getScenarios()), (item) => {
      return (_.indexOf(_.map(this.scenarioElt.followUp, 'ref'), item.id) !== -1);
    })).subscribe(
      (value) => {
        this.followUpScenarios  = value;
        Observable.of(_.filter(_.clone(this.elasticServices.getScenarios()), (item) => {
          return (_.indexOf(_.map(this.scenarioElt.preliminary, 'ref'), item.id) !== -1);
        })).subscribe(
          (va) => {
            this.preliminaryScenarios = va; },
          (error) => { console.log(error); },
          () => {
          });
        },
      (error) => { console.log(error); },
      () => { });
  }

  setScenarioSteps() {
    if (this.elasticServices.getSteps() === undefined) {
      this.elasticServices.getAllSteps().then(
        (value) => {
          this.updateSteps(_.filter(value, (item) => {
            return (_.indexOf(_.map(item['parents'], 'id'), this.scenarioId) !== -1);
          })).then(
            (steps1) => {
              this.scenarioElt.steps = steps1;
            }
          );
          this.spinnerSteps = false;
          this.cdr.detectChanges();
        });
    } else {
      this.updateSteps(_.filter(this.elasticServices.getSteps(), (item) => {
        return (_.indexOf(_.map(item.parents, 'id'), this.scenarioId) !== -1);
      })).then(
        (steps2) => {
          this.scenarioElt.steps = steps2;
        }
      );
      this.spinnerSteps = false;
    }
  }

  updateSteps(stepsIn: any) {
    const steps = [];
    this.baseScenarios = _.remove(stepsIn, (item) => {
            return item.position === -1;
    });
    return new Promise((resolve, reject) => {
      Observable.of(_.forEach(stepsIn, (step) => {
        if (step.parents.length > 1) {
          _.forEach(step.parents, (item) => {
            if (item.id === this.scenarioId &&  item.position !== -1) {
              let newStep: any = step;
              newStep.position = item['position'];
              newStep = this.updateContent(newStep);
              steps.push(_.clone(newStep));
            }
          });
        } else {
          step.position = step.parents[0].position;
          step = this.updateContent(step);
          steps.push(step);
        }
      })).subscribe(
        (value) => { },
        (error) => { console.log(error); },
        () => {
          resolve(_.orderBy(steps, 'position', 'asc'));
        });
    });
  }

  createTitle(step: any) {
    if (step.title !== undefined) {
      return step.title;
    } else {
      step  = this.updateContent(step);
      return step.title;
    }
  }


  tagShow(tag: any) {
    if (tag.abbr !== undefined) {
      tag.key = tag.abbr;
    }
    if (this.sskService.isUrl(tag.key)) {
      tag.url = tag.key;
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
    if (step.head !== null && step.head instanceof Array) {
      step.title = this.sskService.updateText(step.head[0], null);
    } else  if (step.head !== null && step['head'] !== undefined) {
      step.title = this.sskService.updateText(step.head, null);
    }
    if (step.stepDesc instanceof Array) {
      step.description = step.stepDesc[0].content;
    }
    return step;
  }


  clean(text: string) {
    return text.replace(/\\n/g, '');
  }

  cleanAndOpen(text: string) {
    window.open((text.indexOf('://') === -1) ? 'http://' + text.replace(/\\n/g, '') : text.replace(/\\n/g, ''), '_blank');
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
    const tags: any = {};
    let metadata: any = {};
    if (type === 'scenario') {
      metadata = this.scenarioElt.scenario_metadata;
      this.scenarioTags = metadata;
    } else {
      metadata = this.selectedStep.metadata;
      this.stepTags = metadata;
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
    let i = 0;
    this.scenarioElt.author.forEach((elt) => {
      const authorSpan: HTMLElement = document.createElement('span');
      const comma = (++i < this.scenarioElt.author.length) ? ',  ' : ' ';
      this.renderer.addClass(authorSpan, 'pop');
      this.renderer.setProperty(authorSpan, 'innerHTML', elt.forename + ' ' + elt.surname +  ' ' + comma);
      this.renderer.setAttribute(authorSpan, 'data-container', 'body');
      this.renderer.setAttribute(authorSpan, 'data-toggle', 'popover');
      this.renderer.setAttribute(authorSpan, 'data-placement', 'right');
      this.renderer.setAttribute(authorSpan, 'data-content', `<div class="row"><div class="col-3">
       <img  src= ` + this.forImage + `'/assets/images/usertooltip.svg'"
         class="pull-right img-fluid main" ></div><div class="col author">` + elt.forename + ' ' + elt.surname +
        `<br> <span class="affiliation">` + elt.affiliation + `</span></div></div> </div>`);
      this.renderer.appendChild(this.authors.nativeElement, authorSpan);
    });
    (<any>$('.pop')).popover({ trigger: 'manual', html: true, animation: false })
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

  getMetaData(step) {
    return step.metadata;
  }

  getPreliminaryScenarios() {
    return this.preliminaryScenarios;
  }

  copyCitation(pop: any) {
    let i = 0;
    this.copyRef = '';
    let citation = '';
    this.scenarioElt.author.forEach((elt) => {
      if (i++ === 0) {
        citation +=  elt.surname + ' ' + elt.forename + ', ';
      } else {
        citation +=  elt.forename + ' ' + elt.surname + ', ';
      }
    });
     citation += '\'' + this.scenarioTitle + '\',  The Standardization Survival Kit (SSK), '
     + ((this.scenarioElt.lastUpdate !== null ) ? moment(this.scenarioElt.lastUpdate).format('YYYY') : '')
     + ' \n<' +  window.location.origin + this.router.url + '> [accessed ' + moment(new Date()).format('DD MMMM YYYY') + ']';
    this._clipboardService.copyFromContent(citation);


    const citationTooltip: HTMLElement  = document.createElement('bs-tooltip-container');
      this.renderer.setAttribute(citationTooltip, 'role', 'tooltip');
      this.renderer.setAttribute(citationTooltip, 'id', 'NotifTooltip');
      this.renderer.setAttribute(citationTooltip, 'class', 'tooltip in tooltip-right bs-tooltip-right right infoToolTip show');
      this.renderer.setAttribute(citationTooltip, 'style', 'top: -2px; left:155px');

      const div: HTMLElement  = document.createElement('div');
      this.renderer.setAttribute(div, 'class', 'tooltip-inner');
      const text = this.renderer.createText ('The citation has been copied to the clipboard');
      this.renderer.appendChild(div, text);
      this.renderer.appendChild(citationTooltip, div);
      this.renderer.appendChild(this.toAddtooltip.nativeElement, citationTooltip);

}

  removeNotifTooltip() {
    const elt: HTMLElement =  document.getElementById('NotifTooltip');
    if ( elt !== null ) {
      this.renderer.removeChild(this.toAddtooltip.nativeElement, elt);
  }
}

  mouseOver() {
    this.githubIcon = 'github_hover';
     this.shift = 'shift';
  }
}
