import { Component, OnInit , ElementRef, QueryList, AfterViewInit, ViewChildren} from '@angular/core';
import {SskService} from '../../ssk.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-new-scenario',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['./new-scenario.component.css']
})
export class NewScenarioComponent implements OnInit, AfterViewInit {
  forImage = environment.forImage;
   scenarioUrl = this.forImage + 'assets/tei_meta/models/SSKODDforScForm.xml';
   stepUrl = '../../../assets/tei_meta/models/SSKODDforStepForm.xml';
   teiMeta: any;
  title =  'Create a new scenario';
  
  constructor(private sskServ: SskService, private  _httpClient: HttpClient) {

   }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
    }
ngAfterViewInit() {
   new Promise(resolve =>
    setTimeout(() => {
      this.teiMeta = window['teimeta'];
      console.log(this.teiMeta)
      resolve();
    }, 500)).then(
      val2 => {
        this.getScenario().then(
          val => {
            //const funct = this.teiMeta.findOdd('nouveau_fichier.xml', val);
            this.teiMeta.oddLoadUrl(this.scenarioUrl, 'scenarioUrl', this.teiMeta.finishOpenXml)
              ;
          });
        });
      }
 
  







  /*public loadScript() {
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
}*/

public getScenario(): Promise<any> {
  return new Promise(resolve =>
     this._httpClient
     .get(this.scenarioUrl, {responseType: 'text'})
     .first()
     .subscribe((data: any) => {
        resolve();
     })
  );
}

}



