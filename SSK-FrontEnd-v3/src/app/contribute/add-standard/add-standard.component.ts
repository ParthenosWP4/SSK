import { Component, OnInit } from '@angular/core';
import {SskServicesService} from '../../ssk-services.service';
@Component({
  selector: 'app-add-standard',
  templateUrl: './add-standard.component.html',
  styleUrls: ['./add-standard.component.css']
})
export class AddStandardComponent implements OnInit {


  title =  'Add Standard';
  constructor(private sskServ: SskServicesService) { }

  ngOnInit() {
    this.sskServ.setTitle('Add new Standard');
    this.title = this.sskServ.getTitle();
  }

}
