import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ElastichsearchService} from '../elastichsearch.service';
import {isObject, isUndefined} from 'util';
import {SskService} from '../ssk.service';



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

  constructor(public sanitizer: DomSanitizer, private elasticServ: ElastichsearchService) { }
  ngOnInit() {
    this.url =  String(this.res.url);
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
        this.icon = 'webpage.svg';
        /*this.elasticServ.testUrlForIframe(this.res.redirect).subscribe(
          result => {console.log(result)},
          err => {
            console.log(err)
            if (err.status === 0) {
              this.icon = 'webpage.svg';
            } else {
              this.icon = 'webpage.svg';
            }

          },
          () => {
                console.log('Iframe matchineg')
          });*/
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
