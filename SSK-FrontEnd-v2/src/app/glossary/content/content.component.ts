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

  item: any
  data: any
  constructor(private  sskServ: SskServicesService, private elastiServ: ElastichsearchServicesService) { }

  ngOnInit() {
    this.item = this.sskServ.getGlossarylink();
    this.elastiServ.getAllStepsMetaData().subscribe(
      result => {},
      error => console.log(error),
      () => {
        this.elastiServ.setSearchData();
        this.data = this.elastiServ.glossaryChange(this.item);
      }
    );
  }

  itemChangedHandler(item: string) {
    this.item = item;
    this.data = this.elastiServ.glossaryChange(item);
  }
}
