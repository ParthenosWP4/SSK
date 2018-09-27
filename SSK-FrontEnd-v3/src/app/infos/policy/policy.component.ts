import { Component, OnInit } from '@angular/core';
import {SskServicesService} from '../../ssk-services.service';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  title =  'Privacy policy';
  constructor(private sskServ: SskServicesService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }

}
