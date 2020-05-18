import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {environment} from '../../../../environments/environment';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-modal-steps',
  templateUrl: './modal-steps.component.html',
  styleUrls: ['./modal-steps.component.css']
})
export class ModalStepsComponent implements OnInit {
  
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

  constructor(public activeModal: NgbActiveModal,
              private location: PlatformLocation) {
    this.location.onPopState(() => this.activeModal.close());
  }

  ngOnInit() {
 
  }

  toggle(item: string) {
    this.active = item;
  }

  closeModal() {
    this.activeModal.dismiss();
  }

}