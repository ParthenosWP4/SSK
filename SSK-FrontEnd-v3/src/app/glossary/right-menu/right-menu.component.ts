import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlossaryComponent} from '../glossary.component';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {Location} from '@angular/common';
import { McBreadcrumbsComponent} from 'ngx-breadcrumbs';
@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {

  @Input() current: any;
  @Output() itemChanged: EventEmitter<string> = new EventEmitter();


  menuItem: Array<string> = [];

  constructor(private location: Location, private glossaryComponent: GlossaryComponent, private router: Router) { }

  ngOnInit() {
    this.menuItem = _.clone(this.glossaryComponent.glossaryItems);
    this.menuItem = _.remove(this.menuItem, (elt) =>  {
      return elt !== this.current;
    });
  }

  changeItem(item: string) {
    this.menuItem = _.clone(this.glossaryComponent.glossaryItems);
    this.menuItem = _.remove(this.menuItem, (elt) =>  {
      return elt !== item;
    });
    this.itemChanged.emit(item);
    //this.location.replaceState('glossary/' + item);
   

  }
}
