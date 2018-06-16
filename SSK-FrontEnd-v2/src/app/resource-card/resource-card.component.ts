import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ElastichsearchServicesService} from '../elastichsearch-services.service';
import {isObject, isUndefined} from 'util';
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
  icon: string
  imgSrc = '';

  constructor(public sanitizer: DomSanitizer, private elasticServ: ElastichsearchServicesService) { }
  ngOnInit() {
    this.url =  String(this.res.url);
    console.log(this.res['url'])
    if (this.url === '') {
      this.icon = 'open-book.svg';
    } else {
      this.res.redirect = this.res.url;
      this.res.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.res.url);
      if (!isUndefined(this.res.creators) ) {
        this.res.creators = this.res.creators.replace('[', '').replace(']', '');
      }
      if ( this.url.indexOf('.pdf') !== -1) {
        this.icon = 'pdf.svg';
      } else {
        this.elasticServ.testUrlForIframe(this.res.redirect).subscribe(
          result => {},
          err => {
            this.icon = 'webpage.svg';
          },
          () => {

          });
      }
    }



  }

  open() {
      window.open((this.res.redirect.indexOf('://') === -1) ? 'http://' + this.res.redirect.replace(/\\n/g, '')
        : this.res.redirect.replace(/\\n/g, ''), '_blank');
  }

  setCursor() {
    if (this.icon === 'open-book.svg') {
      return 'not-allowed';
    }else {
      return 'pointer';
    }
  }


}
