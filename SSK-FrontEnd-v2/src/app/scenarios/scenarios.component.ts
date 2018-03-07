import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  constructor(
    private appComponent: AppComponent,
    private elastichServices: ElastichsearchServicesService,
    public el: ElementRef,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate([{ outlets: { target: null }}]);
    this.tabList = this.appComponent.browseItems;
    this.selectTab = this.tabList[0];
    this.elastichServices.countItems('scenarios').subscribe(result => {
        this.elastichServices.setScenariosID(result['scenarios']);
        this.elastichServices.setScenarioNumber(result['total']);
        this.scenariosTemp = new Array<any>(this.elastichServices.getScenarioNumber());
        this.elastichServices.getScenariosID().forEach((obj)  => {
           this.asynchFunction(obj);
        });
    }, error => {
      this.error = '500 - Internal Server Error';
    });
    this.scenarios = this.elastichServices.getScenarios();
    this.loadStepsMetaData();
    this.loadResources();
  }

   asynchFunction(scenario: any) {
     setTimeout(() => {
       this.elastichServices.getScenarioDetails(scenario._id).subscribe(detailsResult => {
         detailsResult.id = scenario._id;
         this.elastichServices.addScenario(detailsResult);
         this.scenariosTemp.pop();
         this.resultCount += 1;
         if (this.scenarios.length === this.elastichServices.getScenarioNumber()) {
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
      this.resultCount = this.elastichServices.getScenarioNumber();
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
            this.resultCount = this.elastichServices.getResourceCount();
            break;
        }
  }

  loadSteps() {
    if ( this.steps.length <= 0) {
      this.elastichServices.getAllSteps().subscribe(result => {
        this.resultCount = this.elastichServices.getstepNumber();
        this.steps = this.elastichServices.getSteps();
      });
    }
  }

  loadResources() {
    this.elastichServices.getAllResources().subscribe(result => {
      this.resources = this.elastichServices.getResources();
    });
  }

  loadStepsMetaData() {
    this.elastichServices.getAllStepsMetaData().subscribe(result => {
    });
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if ( this.scenarios.length  < this.elastichServices.getScenarioNumber() && scrollPosition >= componentPosition) {
      const  elt: any = {};
      if (this.scenariosTemp.length === 1) {
        this.scenariosTemp.pop();
      }
    } else if ( this.scenarios.length >= this.elastichServices.getScenarioNumber()) {

    }
  }

}



