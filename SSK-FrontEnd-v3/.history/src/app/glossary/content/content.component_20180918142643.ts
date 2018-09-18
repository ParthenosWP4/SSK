import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, Params, Router, NavigationEnd} from '@angular/router';
import {SskServicesService} from '../../ssk-services.service';
import {ElastichsearchServicesService} from '../../elastichsearch-services.service';
import {isDefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  item: any;
  data: any;
  constructor(private  sskServ: SskServicesService, private elastiServ: ElastichsearchServicesService, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };

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
    this.item = this.sskServ.getGlossarylink();
  }

  itemChangedHandler(item: string) {
    this.item = item;
    this.data = this.elastiServ.glossaryChange(item);
  }

  trim(text: string) {
    return text.trim()
      .replace(' ', '')
      .replace('/', '')
      .replace('-', '')
      .replace(':', '');
  }
}
