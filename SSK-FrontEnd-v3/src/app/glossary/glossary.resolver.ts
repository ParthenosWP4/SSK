import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { ElastichsearchService } from '../elastichsearch.service';
import { SskService } from '../ssk.service';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { CodegenComponentFactoryResolver, ComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Injectable()
export class GlossaryResolver implements Resolve<any>  {
  breadcrumbList: Array<any> = [];
  constructor(private elasticServices: ElastichsearchService, private sskService: SskService, private titleService: Title) { }
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  public resolve(route: ActivatedRouteSnapshot): Promise<any> {
    this.sskService.checkBackEndAvailability();
    const type = route.params.type;
    console.log(route)
    if (type !== undefined) {
      return type;
    } else if (route.params.id !== undefined && route.params.stepId === undefined) {
      return this.getScenarioTitle(route.params.id).then(
        val => {
          this.breadcrumbList.push({
            text: val,
            path: route.url
          });
          return this.breadcrumbList;
        });
    } else if (route.params.stepId !== undefined && route.parent.params.id !== undefined) {
      return this.getScenarioTitle(route.parent.params.id).then(
        val => {
          this.breadcrumbList.push({
            text: val,
            stepId: route.params.stepId,
            path: route.url
          });
          return this.breadcrumbList;
        });
    } else  if (route.params.new !== undefined) {
          return route.params.new ;
    } else {
      this.changeDetectionEmitter.emit();
    }
  }

  private getScenarioTitle(scenarioId: String) {
    let scenarioDetails, scenarioTitle: any;
    return new Promise((resolve, reject) => {
      Observable.of(this.elasticServices.getScenarios()).subscribe(
        (val) => {
          this.elasticServices.countItems('scenarios').subscribe(
            result => {
              this.elasticServices.setScenarioNumber(result['total']);
              this.elasticServices.setScenariosID(result['scenarios']);
            },
            err => { },
            () => {
              this.elasticServices.getScenariosID().forEach((obj) => {
                this.elasticServices.getScenarioDetails(obj._id).subscribe(
                  detailsResult => {
                    detailsResult.id = obj._id;
                    detailsResult.lastUpdate = obj._source.lastUpdate;
                    detailsResult.followUp = obj._source.followUp;
                    detailsResult.preliminary = obj._source.preliminary;
                    scenarioDetails = detailsResult;
                  },
                  error => { },
                  () => {
                    this.elasticServices.addScenario(scenarioDetails);
                    if (scenarioDetails.id === scenarioId) {
                      scenarioTitle = this.sskService.updateText(((scenarioDetails.title instanceof Array) ?
                        scenarioDetails.title[0] : scenarioDetails.title), null);
                      resolve(scenarioTitle);
                    }
                  }
                );
              });
            });
        });
    });
  }

}

