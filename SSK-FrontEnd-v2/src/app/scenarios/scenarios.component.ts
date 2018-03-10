import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isUndefined} from 'util';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss']
})


export class ScenariosComponent implements OnInit {

  searchPlaceholder = 'Scenarios, steps or resources';
  tabList: any = {};
  contentCol = 'col-lg-12';
  collapse = '';
  scenarios: any[];
  steps: any[];
  resources: any[];
  selectTab: string;
  error: string;
  resultCount = 0;
  scenariosTemp: any[];
  p  = 1;
  title: boolean;
  border: any = {} ;

  constructor(
    private appComponent: AppComponent,
    private elasticServices: ElastichsearchServicesService,
    public el: ElementRef,
    private router: Router,
    private route: ActivatedRoute) {
    this.border.class = 'col-1';
    this.border.border ='1px solid #979797';
  }

  ngOnInit() {
    this.router.navigate([{ outlets: { target: null }}]);
    this.tabList = this.appComponent.browseItems;
    this.selectTab = this.tabList[0];
    if (this.elasticServices.getScenarios().length === 0 ) {
      this.elasticServices.countItems('scenarios').subscribe(result => {
          this.elasticServices.setScenariosID(result['scenarios']);
          this.elasticServices.setScenarioNumber(result['total']);
          this.scenariosTemp = new Array<any>(this.elasticServices.getScenarioNumber());
          this.elasticServices.getScenariosID().forEach((obj)  => {
            this.asynchFunction(obj);
          });
        }, error => {
          this.error = '500 - Internal Server Error';
        },
        () => {
          this.scenarios = this.elasticServices.getScenarios();
          this.elasticServices.getAllSteps().subscribe(result => {});
          this.loadStepsMetaData();
          this.loadResources();
        });
    } else {
      this.resultCount = this.elasticServices.getScenarios().length;
      this.scenarios = this.elasticServices.getScenarios();
      console.log(this.scenarios);
    }
  }

   asynchFunction(scenario: any) {
     setTimeout(() => {
       this.elasticServices.getScenarioDetails(scenario._id).subscribe(detailsResult => {
         detailsResult.id = scenario._id;
         this.elasticServices.addScenario(detailsResult);
         this.scenariosTemp.pop();
         this.resultCount += 1;
         if (this.scenarios.length === this.elasticServices.getScenarioNumber()) {
         }
       }, error => {
         this.error = '500 - Internal Server Error';
       });
     }, 1000);
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
    if (item === 'scenarios') {
      this.router.navigate([{ outlets: { target: null }}]);
      this.resultCount = this.elasticServices.getScenarioNumber();
    }else {
      this.router.navigate([{ outlets: { target : item}}]);
      this.loadContents(item);
    }
  }

  loadContents(type: string) {
        switch (type) {
          case 'steps':
            this.steps = new Array();
              this.loadSteps();
            break;
          case 'resources':
              this.loadResources();
            break;
        }
  }

  loadSteps() {
    if (isUndefined(this.steps)) {
      this.elasticServices.getAllSteps().subscribe(result => {
        this.resultCount = this.elasticServices.getstepNumber();
        this.steps = this.elasticServices.getSteps();
      });
    }else {
      this.resultCount = this.elasticServices.getstepNumber();
      this.steps = this.elasticServices.getSteps();
    }
  }

  loadResources() {
    if (isUndefined(this.resources)) {
      this.elasticServices.getAllResources().subscribe(result => {
        this.resultCount = this.elasticServices.getResourceCount();
        this.resources = this.elasticServices.getResources();
      });
    } else {
      this.resultCount = this.elasticServices.getResourceCount();
      this.resources = this.elasticServices.getResources();
    }

  }

  loadStepsMetaData() {
    this.elasticServices.getAllStepsMetaData().subscribe(result => {
    });
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if ( this.scenarios.length  < this.elasticServices.getScenarioNumber() && scrollPosition >= componentPosition) {
      const  elt: any = {};
      if (this.scenariosTemp.length === 1) {
        this.scenariosTemp.pop();
      }
    } else if ( this.scenarios.length >= this.elasticServices.getScenarioNumber()) {

    }
  }

}



