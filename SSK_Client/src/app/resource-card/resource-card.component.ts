import {AfterViewInit, Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ElastichsearchService} from '../elastichsearch.service';



@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent implements OnInit {

  @Input() res: any;
  @Input() border: any;
  url: string;
  icon: string;
  imgSrc = '';


  constructor(public sanitizer: DomSanitizer, private elasticServ: ElastichsearchService) { }
  ngOnInit() {
    this.url =  String(this.res.url);
    if (this.url === '') {
      this.icon = 'open-book.svg';
    } else {
      this.res.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.res.url);
      this.res.redirect = this.res.url.changingThisBreaksApplicationSecurity;
      if (this.res.creators !== undefined) {
        this.res.creators = this.res.creators.toString();
        const creators  = this.res.creators;
        creators.replace('[', '').replace(']', '').replace('"', '');
        this.res.creator = creators;
      }
      if ( this.url.indexOf('.pdf') !== -1) {
        this.icon = 'pdf.svg';
      } else {
        this.icon = 'webpage.svg';
      }
      if (this.res.abstract !== undefined) {
        this.res.abstract = this.res.abstract.replace(/\\n/g, '<br />');
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
  cleanURL(url: string) {
     const targetUrl: any = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return targetUrl.changingThisBreaksApplicationSecurity;
  }


}
