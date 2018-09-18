import {Component, OnInit, ViewChildren, AfterViewInit} from '@angular/core';
import {SskServicesService} from './ssk-services.service';

import {Router} from '@angular/router';
import {isDefined} from '@angular/compiler/src/util';
import { ScenarioComponent } from './scenario/scenario.component';
import { ScenariosComponent } from './scenarios/scenarios.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, AfterViewInit {

  @ViewChildren(ScenariosComponent) child: ScenariosComponent;
  browseItems: Array<any> = [{'item': 'Find a scenario', 'link': 'scenarios'},
                             {'item': 'Find a step', 'link': 'steps'},
                             {'item': 'Find a resource', 'link': 'resources'}
                            ];
  contributeItems: Array<string> = ['Create a new scenario', 'Add a standard', 'Check our Github'];
  learnMoreItems: Array<string> = ['Vocabularies', 'Documentation', 'Project team'];
  footerText = 'PARTHENOS is a Horizon 2020 project funded by the European Commission. The views and opinions '
                + 'expressed in this publication are the sole responsibility of the author and do not necessarily '
                + 'reflect the views of the European Commission.';
  endOfPageText = 'Except where otherwise noted, content on this site is licensed under a ' +
                  ' Creative Commons Attribution 4.0 International license CC BY-NC 4.0';

  constructor(private sskService: SskServicesService, private router: Router) {}

  ngOnInit() {
      this.sskService.checkBackEndAvailability();
      $('a.dropdown-item.dropdown-toggle').on('click', function(e) {
        console.log($(this))
        const subMenu = $(this).next('ul.dropdown-menu');
        console.log($(this).next().hasClass('show'));
       
       
        subMenu.show();
        // toggleClass('show');
      
      
        $(this).parents('li.nav-item.dropdown.show').on('hover', function(e) {
          subMenu.hide();
        });
      
      
        return false;
      });
  }

  ngAfterViewInit() {
    $('ul.dropdown-menu').hide();
 }

  redirect(link: string) {
    if (link === 'scenarios') {
      this.router.navigate([{ outlets: { target : null }}]);
    } else {
      this.router.navigate([{ outlets: { target : link }}]);
    }
  }
}
