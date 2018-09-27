import { Component, OnInit } from '@angular/core';
import {SskServicesService} from '../../ssk-services.service';



@Component({
  selector: 'app-new-scenario',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['./new-scenario.component.css']
})
export class NewScenarioComponent implements OnInit {

  title =  'Create a new scenario';
  constructor(private sskServ: SskServicesService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }
}
