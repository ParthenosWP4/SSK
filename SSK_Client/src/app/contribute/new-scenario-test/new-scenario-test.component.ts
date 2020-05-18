import { AfterViewInit, Component, OnInit, Renderer2, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FileHandle } from './drag-drop.directive';


@Component({
  selector: 'app-new-scenario-test',
  templateUrl: './new-scenario-test.component.html',
  styleUrls: ['./new-scenario-test.component.scss']
})
export class NewScenarioTestComponent implements OnInit, AfterViewInit  {

  forImage = environment.forImage;
  scenarioUrl = this.forImage + 'assets/tei_meta/models/SSKODDforScForm.xml';
  stepUrl = this.forImage + 'assets/tei_meta/models/SSKODDforStepForm.xml';
  teiMeta: any;
  title = 'Create a new scenario';
  setpsDiv: any;

  files: FileHandle[] = [];
  items: number[] = [0];
  reset = false;

  constructor(private _httpClient: HttpClient,
              private renderer: Renderer2) {}


  // -------- ngx Text editor : ---------
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    width: 'auto',
    minWidth: '500px',
    placeholder: 'Enter text here...',
    translate: 'yes',
    'toolbar': [
        ['undo', 'redo'],
        ['orderedList', 'unorderedList'],
        ['link', 'unlink']
    ]
};



  ngOnInit() {
  }

  ngAfterViewInit() {
    new Promise(resolve =>
      setTimeout(() => {
        this.teiMeta = window['teimeta'];
        resolve();
      }, 500)).then(
        val2 => {
          console.log(this.teiMeta);
          this.getScenario().then(
            val => {
             // this.setpsDiv = document.getElementById('stepsDiv') as HTMLElement;
             this.teiMeta.openOddLoad('scenario', 'scenario' , val, this.teiMeta.finishOpenXml);
            });
        });


        // ---- texteditor ----

        const textEditor = document.querySelector('.ngx-editor-textarea');
        console.log('textEditor =' + textEditor);

        this.renderer.addClass(textEditor , 'UPI-desc-definition-desc');
        this.renderer.setAttribute(textEditor , 'name', 'id34');
        this.renderer.setAttribute(textEditor , 'id', 'id34');

      
  
        this.renderer.setAttribute(textEditor, 'onchange', 'window.teimeta.setText(event, \'id34\');');


  }

  test() {
    const content = this.teiMeta.generateTEI();
    console.log(content);
  }


  public getScenario(): Promise<any> {
    return new Promise(resolve =>
      this._httpClient
        .get(this.scenarioUrl, { responseType: 'text' })
        .first()
        .subscribe((data: any) => {
          resolve(data);
        })
    );
  }


      // Dropzone

      filesDropped(files: FileHandle[]): void {
        console.log('files =', files);
        this.reset = true;
        this.files = files;
      }

      // Validate form


}
