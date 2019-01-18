import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
@Component({
  selector: 'app-modal-resources',
  templateUrl: './modal-resources.component.html',
  styleUrls: ['./modal-resources.component.scss']
})
export class ModalResourcesComponent implements OnInit {

  @Input() resources;
  tabList: Array<any> = [ {'label': 'General Resources', 'identifier': 'general'},
                          {'label': 'Project-specific Resources', 'identifier': 'project'}];
  projetcRes: any;
  generalRes: any;
  active = 'general';
  border: any = {
    'class' : 'col-1',
    'border' : '1px solid #979797'
  } ;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    console.log(this.resources);
    this.generalRes = _.filter(this.resources, (res) => {
      return res.category === 'general';
    });
  }
  toggle(item: any) {
    this.active = item.identifier;
  }

}
