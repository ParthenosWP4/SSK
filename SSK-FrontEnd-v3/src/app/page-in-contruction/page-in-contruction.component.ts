import { Component, OnInit, Input } from '@angular/core';
import {SskServicesService} from '../ssk-services.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-page-in-contruction',
  templateUrl: './page-in-contruction.component.html',
  styleUrls: ['./page-in-contruction.component.scss']
})
export class PageInContructionComponent implements OnInit {

  @Input() title: any;
  message = 'The page is currently in progress';
  forImage = environment.forImage;
 constructor(private sskServ: SskServicesService) { }

 ngOnInit() {
   this.sskServ.setTitle(this.title);
   this.title = this.title;
 }

}
