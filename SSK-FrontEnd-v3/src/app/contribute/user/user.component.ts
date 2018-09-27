import { Component, OnInit } from '@angular/core';
import {SskServicesService} from '../../ssk-services.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  title =  'Reseacher page';
  constructor(private sskServ: SskServicesService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }

}
