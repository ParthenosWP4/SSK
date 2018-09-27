import { Component, OnInit } from '@angular/core';
import {SskServicesService} from '../../ssk-services.service';
@Component({
  selector: 'app-license-citation',
  templateUrl: './license-citation.component.html',
  styleUrls: ['./license-citation.component.css']
})
export class LicenseCitationComponent implements OnInit {

  title =  'License & Citations';
  constructor(private sskServ: SskServicesService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }

}
