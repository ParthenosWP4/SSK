import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, Params, Router, NavigationEnd} from '@angular/router';
import {SskServicesService} from '../../ssk-services.service';
import {ElastichsearchServicesService} from '../../elastichsearch-services.service';
import {isDefined} from "@angular/compiler/src/util";
import {Location} from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  item: any;
  data: any;
  constructor(private  sskServ: SskServicesService, private elastiServ: ElastichsearchServicesService, private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.item = this.sskServ.getGlossarylink();
  }

  itemChangedHandler(item: string) {
    this.item = item;
    this.data = this.elastiServ.glossaryChange(item);
    this.location.replaceState('/glossary/' + item);
  }

  trim(text: string) {
    return text.trim()
      .replace(' ', '')
      .replace('/', '')
      .replace('-', '')
      .replace(':', '');
  }
}
