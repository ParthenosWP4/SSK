import {Component, Input, OnInit} from '@angular/core';
import {GlossaryComponent} from '../glossary.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {

  @Input() current: any

  menuItem: Array<string> = [];

  constructor(private glossaryComponent: GlossaryComponent) { }

  ngOnInit() {
    console.log(this.current);
    this.menuItem = this.glossaryComponent.glossaryItems;
    this.menuItem = _.remove(this.glossaryComponent.glossaryItems, (elt) =>  {
      return elt !== this.current;
    });
  }

}
