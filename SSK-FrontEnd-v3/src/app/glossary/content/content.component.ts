import {ElementRef, Renderer2, AfterViewInit, Component,  QueryList, ViewChildren, OnInit, Directive, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SskService} from '../../ssk.service';
import {ElastichsearchService} from '../../elastichsearch.service';
import * as _ from 'lodash';
declare var $: any;
import {DomSanitizer} from '@angular/platform-browser';
import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})



export class ContentComponent implements OnInit, AfterViewInit {

  @ViewChildren('linkRef') list: QueryList<ElementRef>;
  item: any;
  data: any;
  spinner = true;
  objectKeys = Object.keys;
  urls: any;
  current: string;
  type: string;
  questionElem: any;

  constructor(private  sskServ: SskService, private elastiServ: ElastichsearchService, private router: Router,
    private renderer: Renderer2, private _clipboardService: ClipboardService) {
    }

  ngOnInit() {
    this.urls = this.router.url.split('/');
    if (this.urls.length > 3) {
      this.current = this.urls[this.urls.length - 1];
      this.type = this.urls[this.urls.length - 2];
    } else {
      this.type = this.urls[this.urls.length - 1];
    }
    this.item = this.sskServ.getGlossarylink();
      this.elastiServ.glossaryChange(this.item).then(
        (value) => {
          this.data = value;
          this.spinner = false;
        }
      );
  }

  itemChangedHandler(item: string) {
    this.item = item;
    this.type = item;
    this.sskServ.setTitle('SSK - ' + _.capitalize(item));
    this.elastiServ.glossaryChange(this.item).then(
      (value) => {
        this.data = value;
        this.spinner = false;
      }
    );
  }

  trim(text: string) {
    return text.trim()
      .replace(' ', '')
      .replace('/', '')
      .replace('-', '')
      .replace(':', '').toLocaleLowerCase();
  }

  open(url: string) {
    window.open((url.indexOf('://') === -1) ? 'http://' + url.replace(/\\n/g, '')
      : url.replace(/\\n/g, ''), '_blank');
  }

    ngAfterViewInit() {
    let  elt: ElementRef ;
    let div: any;
    if (this.urls.length > 3) {
      this.list.changes.subscribe(val => {
          elt = _.find(this.list.toArray(), (item) => {
            return (encodeURI(item.nativeElement.innerText.trim().toLowerCase()) === decodeURIComponent(this.current.toLowerCase()));
          });
        switch (this.type) {
            case 'standards':
            case 'activities':
              div = document.getElementById(this.trim(elt.nativeElement.innerText));
              if (div) {
                this.renderer.addClass(div, 'show');
              }
              this.renderer.addClass(elt.nativeElement, (this.type === 'standards') ? 'block' : 'block-2');
              this.renderer.addClass(elt.nativeElement, 'current');
              elt.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' , });
            break;
            case 'objects':
            case 'techniques':
            case 'disciplines':
              this.renderer.addClass(elt.nativeElement.children[0], 'mt-5');
              this.renderer.addClass(elt.nativeElement.children[0], 'block-2');
              this.renderer.addClass(elt.nativeElement, 'current');
              this.renderer.addClass(elt.nativeElement, 'mt-5');
              elt.nativeElement.children[0].scrollIntoView({ behavior: 'smooth', block: 'start' , });
            break;
        }
        });
    }
  }

  copy(elt: any) {
    const eltType = (this.type === 'activities') ? 'activity' : this.type.substring(0, this.type.length - 1);
    let eltKey: string;
    let eltSource = 'Tadirah';
    if (elt.standard_abbr_name !== undefined) {
      eltKey = elt.standard_abbr_name;
      eltSource = 'ssk';
    } else {
      if (eltType === 'discipline') {
        eltSource = 'AureHAL';
      }
      eltKey = elt.term;
    }
     const term = '<term key="' + eltKey + '" source="' + eltSource + '" type="' + eltType + '"/>';
    this._clipboardService.copyFromContent(term);
  }
}
