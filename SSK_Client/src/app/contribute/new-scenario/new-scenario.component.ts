import { Component, OnInit ,  AfterViewInit} from '@angular/core';
import {SskService} from '../../ssk.service';

declare var teimeta: any;


@Component({
  selector: 'app-new-scenario',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['./new-scenario.component.css']
})
export class NewScenarioComponent implements OnInit,  AfterViewInit {

   url = '../../../assets/tei_meta/teiMeta.js';
   loadAPI: Promise<any>;


  title =  'Create a new scenario';
  constructor(private sskServ: SskService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
    }
  ngAfterViewInit() {
    /*this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      this.loadScript();
      this.teiMeta = window['teimeta'];
  });*/
  /*this.loadScript().then(
    val => {
      //window.teimeta.newXml();
    }
   
  )*/
  }




  public loadScript() {
    return new Promise ((resolve, reject) => {
        console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
          resolve(true);
        });
}
}
