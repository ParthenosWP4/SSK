import { Component, OnInit } from '@angular/core';
import * as ZoteroTranslationClient from '../../../../node_modules/zotero-translation-client/src/zotero-translation-client';
import {HttpHeaders, HttpClient, HttpRequest, HttpEvent, HttpEventType} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResourceContributionService } from '../add-resource/resource-contribution.service' ;


@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  public resourcesArray       = [];
  public resource_title       = '';
  public resource_contributor = '';
  public resource_link        = '';
  public resource_key         = '';

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

  newResourcesData = {zoteroId: '',
                      title: '',
                      teiContent: ''
                    };

  constructor(private httpClient: HttpClient,
              public resourceService: ResourceContributionService
              ) { }

  ngOnInit() {
    this.translationClient = new ZoteroTranslationClient({
      persist: false,
      translateURL: 'http://lit-hollows-93716.herokuapp.com',
    });
  }

  async getMeta(link: string) {
    const { items: [ myPaper ] } = await this.translationClient.translateUrl(link);
    this.jsonResource = myPaper;
    console.log(' myPaper        =', myPaper);
    console.log(' myPaper.title  =', typeof myPaper.title, ' = ', myPaper.title );
    console.log(' myPaper.key    =', typeof myPaper.key, ' = ', myPaper.key );
    console.log(' myPaper.url    =', typeof myPaper.url, ' = ', myPaper.url );
    this.itemKey = this.jsonResource.key;
    this.jsonPrettyHighlightToId(this.jsonResource, 'resDiv');

    // resource service
    this.resource_title       = this.resourceService.getResourceTitle(myPaper.title);
    console.log('this.resource_title  add resource =', this.resource_title );
    this.resourceService.resource_key         = myPaper.key;
    this.resourceService.resource_link        = myPaper.url;


    this.newResourcesData.title =  myPaper.title;
    this.newResourcesData.zoteroId    =  myPaper.key;
    this.newResourcesData.teiContent   =  this.jsonResource;
    console.log('this.newResourcesData =', this.newResourcesData);

  }

  sentToZotero() {
     this.httpClient
        .put(environment.zoteroAPIUrl + this.itemKey , this.jsonResource, this.httpOptions)
        .subscribe(
          () => {
            this.result = 'Resource  has been succefull add to SSK\'s  Zotero library with itemKey: ' + this.itemKey;
            // console.log('this.newResourcesData =', this.newResourcesData);

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


