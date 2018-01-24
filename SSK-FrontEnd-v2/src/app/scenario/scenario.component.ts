import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})


export class ScenarioComponent implements OnInit {

  searchPlaceholder = 'Scenarios, steps or resources'
  tabList: any = {}
  values = ''
  contentCol = 'col-lg-12'
  collapse = ''
  scenarios: Object[] = [1, 2, 3, 4, 5];
  selectTab: string
  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    this.tabList = this.appComponent.browseItems;
    this.selectTab = this.tabList[0];
  }

  onKey(event: any) { // without type info
    this.collapse = '';
    if (event.target.value.length >= 3 ) {
      this.collapse = 'show';
      this.contentCol = 'col-lg-9';
    }else {
      this.collapse = '';
      this.contentCol = 'col-lg-12';
    }

  }

  search() {
    this.resize();
  }

  private resize() {
    if (this.contentCol === 'col-lg-9') {
      this.contentCol = 'col-lg-12';
    }  else {
      this.contentCol = 'col-lg-9';
    }
  }

  toggle(item: string) {
    this.selectTab = item;
  }


}



