import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import {isUndefined} from 'util';
import {SskServicesService} from '../ssk-services.service';



@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent implements OnInit {

  @Input() res: any;
  @Input() border: any;
  url: string;
  imgSrc = '';

  constructor(public sanitizer: DomSanitizer) { }
  ngOnInit() {
  this.res.redirect = this.res.url;
    if (!isUndefined(this.res.creators) ) {
      this.res.creators = this.res.creators.replace('[', '').replace(']', '');
    }
  }

  open() {
      window.open((this.res.redirect.indexOf('://') === -1) ? 'http://' + this.res.redirect.replace(/\\n/g, '')
        : this.res.redirect.replace(/\\n/g, ''), '_blank');
  }

  loadPage() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.res.url);
  }
}
