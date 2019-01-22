import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, } from '@angular/core';
import {SskService} from '../ssk.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';
import {ElastichsearchService} from '../elastichsearch.service';
import { isDefined } from '@angular/compiler/src/util';


@Component({
  selector: 'app-scenario-card',
  templateUrl: './scenario-card.component.html',
  styleUrls: ['./scenario-card.component.scss']
})
export class ScenarioCardComponent implements OnInit,  AfterViewInit {

  @Input() scenario: any;
  public title: any;
  public desc: any;
  public metadata: Array<any> = new Array();
  public defaultImage: string;
  public shortTitle: any = {};
  public shortDesc: any = {};
  forImage = environment.forImage;
  diff: any;
  group: string;

  constructor(private sskServices: SskService,  private router: Router, private domSanitizer: DomSanitizer,
              private elasticServ: ElastichsearchService) { }


  ngAfterViewInit() {
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
  ngOnInit() {
    if (this.scenario.title instanceof Array) {
      this.title = this.scenario.title[0];
    } else {
      this.title = this.scenario.title;
    }
     this.title = this.sskServices.updateText( this.title, null);

    if (this.scenario.image === null || this.scenario.image === 'null' ||  this.scenario.image === undefined) {
      this.defaultImage = '../../assets/images/ssk_logo.svg';
    }

    if (this.scenario.desc instanceof Array) {
      this.desc = this.scenario.desc[0];
    } else {
      this.desc = this.scenario.desc;
    }
    this.desc = this.sskServices.updateText( this.desc, null);

    if (this.scenario.scenario_metadata.objects instanceof Array ) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.objects);
    }

    if (this.scenario.scenario_metadata.object instanceof Array ) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.object);
    }

    if (this.scenario.scenario_metadata.discipline instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.discipline);
    }

    if (this.scenario.scenario_metadata.activity instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.activity);
    }

    if (this.scenario.scenario_metadata.techniques instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.techniques);
    }

    if (this.scenario.scenario_metadata.standards instanceof Array) {
      this.metadata  =  this.metadata.concat(this.scenario.scenario_metadata.standards);
    }

    if ( ! (this.scenario.author instanceof Array)) {
      this.scenario.author = [this.scenario.author];
    }



    this.metadata = _.forEach(this.metadata, (value) => {
      switch (value.type) {
        case 'objects':
          value.type = 'object';
        break;
        case 'disciplines':
          value.type = 'discipline';
        break;
        case 'techniques':
        case 'technique':
          value.type = 'technique';
        break;
        case 'datatype':
          value.type = 'object';
        break;
        case 'activities':
          value.type = 'activity';
        break;
        case 'standards':
          value.type = 'standard';
        break;
      }
    });

    this.metadata = _.map(this.metadata,  (x)  => {
      if (this.sskServices.isUrl(x.source) && x.source.includes('tadirah')) {
        x.source = 'Tadirah';
      }
      return x;
    });
  }



  goToScenario(scenarioId: string) {
    //if (scenarioId === 'SSK_sc_corpusModellingInTEI') {
     // scenarioId = 'SSK_sc_corpusModellingInTEI-minusDigitization';
    //}
    this.router.navigate(['scenarios', scenarioId]);
  }

  getInnerHTMLValue(text: string ) {
    return this.domSanitizer.bypassSecurityTrustHtml(text);
  }
  content() {
    return '<div class="row>';
  }

  uniformText(text: string) {
    return this.sskServices.updateText(text, 'scenario');
  }

}
