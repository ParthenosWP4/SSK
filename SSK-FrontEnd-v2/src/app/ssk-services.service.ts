import { Injectable } from '@angular/core';
import {ElastichsearchServicesService} from './elastichsearch-services.service';
import * as _ from 'lodash';
import {isUndefined} from 'util';


@Injectable()
export class SskServicesService {

  constructor(private elasticService: ElastichsearchServicesService) {
  }


  shorten(content: any, length: number) {

    const contentArray = new Array(content.content);
    if (contentArray[0] instanceof  Array) {
      let newContent = '' ;
      _.forEach(contentArray[0], (value) => {
        if (value.constructor ===   {}.constructor) {
          if (!isUndefined(value.abbr) ) { newContent = newContent.concat(value.abbr.toString()); console.log(newContent); }
          if (!isUndefined(value.expan) ) {newContent = newContent + ' ' + value.expan.toString(); }
          if (!isUndefined(value.list) ) {
            _.forEach(value.list.item, (val) => {
              newContent = newContent + ' ' + val.toString() + '<br/>';
            });
          }
        }
        if (value.constructor ===  'test'.constructor) {
          newContent = newContent + ' ' + value.toString() ;
        }
      });
      console.log(newContent);
      content.content = newContent;
    }
    if (content.content.length > length) {
      content.content = content.content.substring(0, length) + '...';
    }
    return content;
  }

  addStepMetadata(stepId: string): any {
    let metadata: Array<any> = []
    if ( this.elasticService.getStepsMetadata().length > 0) {
      const item: any = _.find(this.elasticService.getStepsMetadata(), (elt) => {
        return elt._parent === stepId;
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
}
