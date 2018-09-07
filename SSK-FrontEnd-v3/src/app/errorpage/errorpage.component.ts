import { Component, OnInit } from '@angular/core';
import {SskServicesService} from '../ssk-services.service';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.scss']
})
export class ErrorpageComponent implements OnInit {

   title: string
   message: string
  error = true;
  constructor(private sskServ: SskServicesService) { }

  ngOnInit() {
    if (this.sskServ.getStatusError() === 404) {
      this.error = false;
    }
    this.title = this.sskServ.getTitle();
    this.message = this.sskServ.getErrorMsg();
  }
}
