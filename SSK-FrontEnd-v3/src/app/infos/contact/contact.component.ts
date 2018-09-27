import { Component, OnInit } from '@angular/core';
import {SskServicesService} from '../../ssk-services.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  title =  'Contact us';
  constructor(private sskServ: SskServicesService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }
}