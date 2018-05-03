import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SskServicesService} from "../../ssk-services.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  //@Input() data: Observable<any>;
  item: any
  constructor(private  sskServ: SskServicesService) { }

  ngOnInit() {
    console.log(this.sskServ.getGlossarylink())
    this.item = this.sskServ.getGlossarylink();
  }

}
