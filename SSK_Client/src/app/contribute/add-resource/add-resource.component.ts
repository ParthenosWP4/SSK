import { Component, OnInit } from '@angular/core';
import * as ZoteroTranslationClient from '../../../../node_modules/zotero-translation-client/src/zotero-translation-client';
import {HttpHeaders, HttpClient, HttpRequest, HttpEvent, HttpEventType} from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  result: string;
  translationClient: any;
  link: string;
  itemKey: string = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Zotero-API-Key': 'Ppyn6s61tt5EXsRAyJ2C6ZL4'
    })
  };
  jsonResource: any;



  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.translationClient = new ZoteroTranslationClient({
      persist: false,
      translateURL: 'http://lit-hollows-93716.herokuapp.com',
    });
  }

  async  getMeta(link: string) {
    const { items: [ myPaper ] } = await this.translationClient.translateUrl(link);
    this.jsonResource = myPaper;
    this.itemKey = this.jsonResource.key;
   this.jsonPrettyHighlightToId(this.jsonResource, 'resDiv');
  }

  sentToZotero() {
     this.httpClient
        .put(environment.zoteroAPIUrl + this.itemKey , this.jsonResource, this.httpOptions)
        .subscribe(
          () => {
            this.result = 'Resource  has been succefull add to SSK\'s  Zotero library with itemKey: ' + this.itemKey;
          },
          (error) => {
            this.itemKey = null;
            this.result = 'Something went wrong, please  try again or contact SSK team via  ssk@inria.fr';
          }
        );
  }



 jsonPrettyHighlightToId(jsonobj, id_to_send_to) {
  let json = JSON.stringify(jsonobj, undefined, 2);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'color: darkorange;';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'color: red;';
          } else {
              cls = 'color: green;';
          }
      } else if (/true|false/.test(match)) {
          cls = 'color: blue;';
      } else if (/null/.test(match)) {
          cls = 'color: magenta;';
      }
      return '<span style="' + cls + '">' + match + '</span>';
  });
  document.getElementById(id_to_send_to).innerHTML = json;
}

}


