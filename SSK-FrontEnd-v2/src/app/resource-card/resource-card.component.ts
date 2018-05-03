import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import {isUndefined} from 'util';
import {SskServicesService} from "../ssk-services.service";

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent implements OnInit {

  @Input() res: any;
  @Input() border: any;
  url: string;
  private html: string ;
  constructor(public sanitizer: DomSanitizer, private elasticServices: ElastichsearchServicesService, private sskService: SskServicesService) {

  }
  ngOnInit() {
    this.res.redirect = this.res.url;
    //this.res.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.res.url);
    //this.html = '<iframe class="e2e-iframe-untrusted-src embed-responsive-item" src=\"' + this.res.url.redirect + '\"></iframe>';
    if (!isUndefined(this.res.creators) ) {
      this.res.creators = this.res.creators.replace('[', '').replace(']', '');
    }
  }

  open() {
    console.log(this.res.redirect.indexOf('://') === -1 ? 'http://' + this.res.redirect.replace(/\\n/g, '')
      : this.res.redirect.replace(/\\n/g, ''));
      window.open((this.res.redirect.indexOf('://') === -1) ? 'http://' + this.res.redirect.replace(/\\n/g, '')
        : this.res.redirect.replace(/\\n/g, ''), '_blank');
  }

  loadPage() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.res.url);
  }
}
