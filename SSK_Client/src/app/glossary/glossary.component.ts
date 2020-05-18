import {ElementRef, Component,  QueryList, ViewChildren, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SskService} from '../ssk.service';
import {isUndefined} from 'util';



@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {

  private urls: any;
  public  glossaryItems = ['disciplines', 'objects', 'techniques', 'activities', 'standards'];
 

  constructor(private router: Router,
              private ssKService: SskService, private elRef: ElementRef) {
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
    this.ssKService.checkBackEndAvailability();
    this.ssKService.setTitle('SSK - Vocabularies');
    this.urls = this.router.url.split('/');
    if (this.urls.length === 4) {
      this.ssKService.setGlossarylink(this.urls[this.urls.length - 2]);
    } else {
      this.ssKService.setGlossarylink(this.urls[this.urls.length - 1]);
    }

  }

  goTo(item: string) {
    this.ssKService.setGlossarylink(item);
    this.router.navigate(['vocabularies', item]);
  }

 getLink() {
    if (isUndefined(this.ssKService.getGlossarylink())) {
      return true;
    } else {
      return false;
    }
 }

  changedHandler(item: string) {
    this.router.navigate(['/', 'vocabularies', item]);
  }


}
