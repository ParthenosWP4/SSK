import { Component, OnInit } from '@angular/core';
import {SskService} from '../../ssk.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  title =  'Contact us';
  constructor(private sskServ: SskService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }
}