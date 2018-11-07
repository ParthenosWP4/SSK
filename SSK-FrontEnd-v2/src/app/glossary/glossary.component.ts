import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {SskServicesService} from '../ssk-services.service';
import {isUndefined} from 'util';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {GlossaryResolver} from "./glossary.resolver";

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {

  public  glossaryItems = ['disciplines', 'objects', 'techniques', 'activities', 'standards']
  constructor(private router: Router,
              private ssKService: SskServicesService, private cdRef: ChangeDetectorRef) {
     // override the route reuse strategy
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      }

      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
        }
      });
  }

  ngOnInit() {
    this.ssKService.checkBackEndAvailability()
    this.ssKService.setTitle('SSK - Glossary');

    const urls: string[] = this.router.url.split('/');
    if (urls.length > 2) {
      this.ssKService.setGlossarylink(urls[urls.length - 1]);
    }

  }

  goTo(item: string) {
    this.ssKService.setGlossarylink(item);
    this.router.navigate(['glossary', item]);
  }

 getLink() {
    if (isUndefined(this.ssKService.getGlossarylink())) {
      return true;
    } else {
      return false;
    }
 }

  changedHandler(item: string) {
    this.router.navigate(['/', 'glossary', item]);
  }

}
