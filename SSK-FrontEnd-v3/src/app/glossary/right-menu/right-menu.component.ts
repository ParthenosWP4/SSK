import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlossaryComponent} from '../glossary.component';
import * as _ from 'lodash';
import {ElastichsearchService} from '../../elastichsearch.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {

  @Input() current: any;
  @Output() itemChanged: EventEmitter<string> = new EventEmitter();


  menuItem: Array<string> = [];

  constructor(private glossaryComponent: GlossaryComponent, private elasticServ: ElastichsearchService) { }

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
  }

}
