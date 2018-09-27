import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SskServicesService} from '../../ssk-services.service';
import {ElastichsearchServicesService} from '../../elastichsearch-services.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  item: any;
  data: any;
  spinner = true;
  constructor(private  sskServ: SskServicesService, private elastiServ: ElastichsearchServicesService) { }

  ngOnInit() {
    this.item = this.sskServ.getGlossarylink();

    setTimeout(() => {
      this.data = this.elastiServ.glossaryChange(this.item);
      this.spinner = false;
    }, 2000);
  }

  itemChangedHandler(item: string) {
    this.item = item;
    this.data = this.elastiServ.glossaryChange(item);
    this.sskServ.setTitle('SSK - ' + item);
  }

  trim(text: string) {
    return text.trim()
      .replace(' ', '')
      .replace('/', '')
      .replace('-', '')
      .replace(':', '');
  }
}
