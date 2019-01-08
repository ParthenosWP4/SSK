import { Component, OnInit } from '@angular/core';
import {SskService} from '../../ssk.service';
@Component({
  selector: 'app-license-citation',
  templateUrl: './license-citation.component.html',
  styleUrls: ['./license-citation.component.css']
})
export class LicenseCitationComponent implements OnInit {

  title =  'License & Citations';
  constructor(private sskServ: SskService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }

}
