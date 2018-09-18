import {Component, OnInit, ViewChildren, AfterViewInit} from '@angular/core';
import {SskServicesService} from './ssk-services.service';
import { CookieLawModule } from 'angular2-cookie-law';
import {Router, ActivatedRoute} from '@angular/router';
import {isDefined} from '@angular/compiler/src/util';
import { ScenarioComponent } from './scenario/scenario.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import {Location} from '@angular/common';
import { ElastichsearchServicesService } from './elastichsearch-services.service';
import { ContentComponent } from './glossary/content/content.component';

@Component({
  providers:[ ContentComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, AfterViewInit {

  @ViewChildren(ScenariosComponent) child: ScenariosComponent;
  curentUrl: string;
  browseItems: Array<any> = [{'item': 'Find a scenario', 'link': 'scenarios'},
                             {'item': 'Find a step', 'link': 'steps'},
                             {'item': 'Find a resource', 'link': 'resources'}
  ];
  vocabulariesItems: Array<any> = [ {'item': 'Disciplines', 'link': 'disciplines'},
                                    {'item': 'Standards', 'link': 'standards'},
                                    {'item': 'Research activities', 'link': 'activities'},
                                    {'item': 'Research Techniques', 'link': 'techniques'},
                                    {'item': 'Research objects', 'link': 'objects'}
  ];
  contributeItems: Array<string> = ['Create a new scenario', 'Add a standard', 'Check our Github'];
  learnMoreItems: Array<string> = ['Documentation', 'Project team'];
  footerText = 'PARTHENOS is a Horizon 2020 project funded by the European Commission. The views and opinions '
                + 'expressed in this publication are the sole responsibility of the author and do not necessarily '
                + 'reflect the views of the European Commission.';
  endOfPageText = 'Except where otherwise noted, content on this site is licensed under a ' +
                  ' Creative Commons Attribution 4.0 International license CC BY-NC 4.0';

  constructor(private sskService: SskServicesService, private router: Router, private location: Location,
              private elastiServ: ElastichsearchServicesService, route: ActivatedRoute, private contentComp: ContentComponent ) {
                route.params.subscribe(val => {
                  // put the code from `ngOnInit` here
                });
              }

  ngOnInit() {
      this.sskService.checkBackEndAvailability();
      $('a.dropdown-item.dropdown-toggle').on('click', function(e) {
        const subMenu = $(this).next('div.dropdown-menu.in');
        subMenu.show();
      });
  }

  ngAfterViewInit() {
    $('div.dropdown-menu.in').hide();
 }

  redirect(link: string) {
    console.log(this.router.url)
    if (link === 'scenarios' ) {
      this.router.navigate(['/'])
           .then(() => this.router.navigate(['scenarios', { outlets: { target: null } }]));
    } else {
        if ( this.router.url.includes('scenarios')) {
          this.router.navigate([{ outlets: { target : link }}]);
        } else {
          console.log("here")
          this.router.navigate(['scenarios'])
            .then(() => this.router.navigate([{ outlets: { target: link } }]));
     }
  }
  }

  fireEvent(e) {
    $('div.dropdown-menu.vocab').hide();
  }

  toGlossary(item: string) {
    this.router.navigate([{ outlets: { target: null } }])
           .then(() => this.router.navigate(['glossary', item]));
  }
}
