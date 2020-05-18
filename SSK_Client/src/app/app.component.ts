import {Component, OnInit, ViewChildren, AfterViewInit} from '@angular/core';
import {SskService} from './ssk.service';
import { CookieLawModule } from 'angular2-cookie-law';
import {Router, ActivatedRoute} from '@angular/router';
import {isDefined} from '@angular/compiler/src/util';
import { ScenarioComponent } from './scenario/scenario.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import {Location} from '@angular/common';
import { ElastichsearchService } from './elastichsearch.service';
import { ContentComponent } from './glossary/content/content.component';
import {environment} from '../environments/environment';
import { KeycloakService } from 'keycloak-angular';
declare const $;

@Component({
  providers: [ ContentComponent ],
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
  contributeItems: Array<any> = [ { 'item' : 'Create a new scenario', 'link': 'new-scenario'},
                                  { 'item' : 'Add a standard', 'link': 'add-standard'},
                                  { 'item' : 'Check our Github', 'link': 'https://github.com/ParthenosWP4/SSK'} ];
  learnMoreItems: Array<any> = [{ 'item' : 'Documentation', 'link': 'https://ssk.readthedocs.io/en/latest/'},
                                {'item' : 'Project team', 'link': '#team'} ];

  footerText = 'PARTHENOS is a Horizon 2020 project funded by the European Commission. The views and opinions '
                + 'expressed in this publication are the sole responsibility of the author and do not necessarily '
                + 'reflect the views of the European Commission.';
  endOfPageText = 'Except where otherwise noted, content on this site is licensed under a Creative ' +
                  'Commons Attribution 4.0 International license CC BY';

  currentFlag = 'united-kingdom.svg';

  flagItems: Array<any> = [ {'item' : 'italy.svg',
                             'lang': 'Italian' ,
                             'alt': 'italian-flag',
                             'idx': '1'},
                            {'item' : 'france.svg',
                            'lang': 'French',
                            'alt': 'french-flag',
                            'idx': '2'},
                            {'item' : 'germany.svg',
                            'lang': 'German',
                            'alt': 'german-flag',
                            'idx': '3'},
                            {'item' : 'united-kingdom.svg',
                            'lang': 'English',
                            'alt': 'uk-flag',
                            'idx': '4'}];

  forImage = environment.forImage;
  userIsLogin =  false;

  constructor(private sskService: SskService, private router: Router, private location: Location,
              private elastiServ: ElastichsearchService, route: ActivatedRoute, private contentComp: ContentComponent,
              protected keycloak: KeycloakService ) { }

  ngOnInit() {
      this.sskService.checkBackEndAvailability();
      $('a.dropdown-item.dropdown-toggle').on('click', function(e) {
        const subMenu = $(this).next('div.dropdown-menu.in');
        subMenu.show();
      });
      this.keycloak.isLoggedIn().then(
        (res) => {
          this.userIsLogin = res;
        });
  }

  ngAfterViewInit() {
    $('div.dropdown-menu.in').hide();
 }

  redirect(link: string) {
    if (link.includes('github')) {
      window.open(link, '_blank');
    } else if (link.includes('new_scenario')) {
      this.router.navigate(['scenarios', 'new']);
    } else {
      this.router.navigate([link]);
    }
  }

  fireEvent(e) {
    $('div.dropdown-menu.vocab').hide();
  }

  fireEvent2(e) {
    $('div.dropdown-menu.in').hide();
  }

  toGlossary(item: string) {
    this.router.navigateByUrl('vocabularies/' + item);
    /*this.router.navigate([{ outlets: { target: null } }])
           .then(() => this.router.navigateByUrl(['vocabulary', item]));*/
  }

  clickFlag(flag: string) {
    this.currentFlag = flag;
  }

  logout(){
      this.keycloak.logout('http://localhost:4200/#/scenarios');
  }
}
