import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-modal-resources',
  templateUrl: './modal-resources.component.html',
  styleUrls: ['./modal-resources.component.scss']
})
export class ModalResourcesComponent implements OnInit {

  @Input() step;
  @Input() position;
  tabList: Array<any> = [ {'label': 'General Resources', 'identifier': 'general'},
                          {'label': 'Project-specific Resources', 'identifier': 'project'}];
  projectRes: any;
  generalRes: any;
  active = 'general';
  border: any = {
    'class' : 'col-1',
    'border' : '1px dashed  #979797'
  } ;
  forImage = environment.forImage;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.generalRes = _.filter(this.step.resources, (res) => {
      return res.category === 'general';
    });
    this.projectRes = _.filter(this.step.resources, (res) => {
      return res.category === 'project';
    });
  }

  toggle(item: string) {
    this.active = item;
  }

  closeModal() {
    this.activeModal.dismiss();
  }

}
