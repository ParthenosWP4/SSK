import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SskService} from '../../ssk.service';
import {ElastichsearchService} from '../../elastichsearch.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  item: any;
  data: any;
  spinner = true;
  objectKeys = Object.keys;

  constructor(private  sskServ: SskService, private elastiServ: ElastichsearchService) { }

  ngOnInit() {
    this.item = this.sskServ.getGlossarylink();
      this.elastiServ.glossaryChange(this.item).then(
        (value) => {
          this.data = value;
          this.spinner = false;
        }
      );
  }

  itemChangedHandler(item: string) {
    this.item = item;
    this.sskServ.setTitle('SSK - ' + _.capitalize(item));
    this.elastiServ.glossaryChange(this.item).then(
      (value) => {
        this.data = value;
        this.spinner = false;
      }
    );
  }

  trim(text: string) {
    return text.trim()
      .replace(' ', '')
      .replace('/', '')
      .replace('-', '')
      .replace(':', '');
  }

  open(url: string) {
    window.open((url.indexOf('://') === -1) ? 'http://' + url.replace(/\\n/g, '')
      : url.replace(/\\n/g, ''), '_blank');
}
}
