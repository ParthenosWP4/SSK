import { Component, OnInit } from '@angular/core';
import {SskService} from '../ssk.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.scss']
})
export class ErrorpageComponent implements OnInit {

   title: string;
   message: string;
  error = true;
  forImage = environment.forImage;
  constructor(private sskServ: SskService) { }

  ngOnInit() {
    if (this.sskServ.getStatusError() === 404) {
      this.error = false;
    }
    this.title = this.sskServ.getTitle();
    this.message = this.sskServ.getErrorMsg();
  }
}
