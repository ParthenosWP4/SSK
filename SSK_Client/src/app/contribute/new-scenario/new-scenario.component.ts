import { AfterViewInit, Component, OnInit, Input, ViewChild,
  ChangeDetectorRef, Renderer2, ElementRef ,ViewChildren,
  QueryList, ComponentFactoryResolver } from '@angular/core';

import { SskService } from '../../ssk.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserComponent } from '../user/user.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { Subscription } from 'rxjs/Subscription';
import { GithubService } from '../../github.service';
import { FileHandle } from './drag-drop.directive';
import * as _ from 'lodash';
import { ElastichsearchService } from '../../elastichsearch.service';
import { TagComponent } from '../tag/tag.component';
import { DataContributionService } from '../tag/data-contribution.service' ;
import { AddResourceComponent } from '../add-resource/add-resource.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceContributionService } from '../add-resource/resource-contribution.service';

export interface ITabTextEditor {
  id: number;
  title: string;
}


@Component({
  selector: 'app-new-scenario',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['./new-scenario.component.scss']
})
export class NewScenarioComponent implements OnInit, AfterViewInit {


  @ViewChild(TagComponent)
  @ViewChild(AddResourceComponent)

  public idCounter: Array <Number> ;
  public tabs: ITabTextEditor[] = [];
  public stepTitle;
  public stepDescription ;
  public addSteptTagsComponent;
  public tagStepList      = [] ;
  public tagStepTypeList  = [];
  public authorsList: QueryList < any>;

  public activityTagClickedTest = [];

  public activitySelected  = this.addTagService.actvity_name;
  public standardsArray    = this.addTagService.standardSelectedTagArray;

  public addResourseTitle       = this.resourceService.resource_title;
  public addResourseContributor = this.resourceService.resource_contributor;
  public addResourseKey         = this.resourceService.resource_key;
  public addResourseLink        = this.resourceService.resource_link;

  titleLangIndication        = 'you can edit the title in several languages';
  DescriptionLangIndication  = 'you can edit the description in several languages';

  objectsSelection     = 'Select between 1 and 4 research objects';
  disciplinesSelection = 'Select between 1 and 4 disciplines';
  techniquesSelection  = 'Select between 1 and 4 research techniques';

  // registerForm: FormGroup;
  submitted = false;

  garbageIcon      = '../../../assets/images/garbage.svg';
  universityIcon   = '../../../assets/images/university.svg';
  userIcon         = '../../../assets/images/user.svg';
  exclamationIcon  = '../../../assets/images/Exclamation_point2.svg';
  cameraPhotoIcon  = '../../../assets/images/photo-camera.svg';

  ccIcon     = '../../../assets/images/cc.svg';
  byIcon     = '../../../assets/images/by.svg';


  forImage = environment.forImage;
  scenarioUrl = this.forImage + 'assets/tei_meta/models/SSKODDforScForm.xml';
  stepUrl = this.forImage + 'assets/tei_meta/models/SSKODDforStepForm.xml';
  teiMeta: any;


  title = 'Create a new scenario';
  tabList: Array<any> = [
    {
      'text': 'Terms of Use',
      'tab': 'terms'
    },
    {
      'text': 'Scenario',
      'tab': 'scenario'
    },
    {
      'text': 'Steps',
      'tab': 'steps'
    }];

  active = 'terms';

  subscription: Subscription;

  termsOfUseData: Array<Object> = [
    {
      title: '1. Browsing & reading the SSK',
      textsList: [`All the content and materials proposed in the SSK
               are accessible and available for reading.
               No account is needed for navigation and consultation purposes.`]
    },
    {
      title: '2. Creating a user account',
      textsList: [`Registration is only required for the use of all editing features proposed by the SSK.
              The user agrees to provide truthful and accurate information and a valid e-mail address
              when registering.`]
    },
    {
      title: '3. Contributing to the SSK',
      textsList: [`The form, content and intended purpose of the User’s account must not violate
              any legal or ethical laws or any intellectual property,
              publicity, privacy, or rights of any third party.`,
        `The Provider offers no guarantee that the documents and their content on the Platform are accurate,
              complete, reliable and up-to-date.`,
        `The User accepts full responsibility for the content and data that he/she submits to the platform.`,
        `The SSK keeps a trace of all
              content and data that is submitted by the User through his or her account.`,
        `The User hereby declares that he or she is entitled to submit
              any content added to the platform via his or her account.`,
        `The Provider shall be fully entitled to use and/or edit any uploaded documents and their content
              in an automated or any other manner in order to improve the Services offered on the SSK.`,
        `This shall be done with all due respect and consideration of personality rights and copyright.`,
        `The User is fully responsible for ensuring that any links he or she adds to the SSK toward external
              websites should be legal, valid, ethically sound and scientifically relevant.`,
        `All content published on the platform by the User is freely accessible to any other user,
              whether registered or not.`]
    }
  ];



  // ViewChildren
  @ViewChildren('langEditor') langList: QueryList<ElementRef>;
  @ViewChildren('stepLang') steplangList: QueryList<ElementRef>;
  @ViewChildren('editorTab') editorList: QueryList<ElementRef>;
  @ViewChildren('ngxeditor') ngxeditorList: QueryList<ElementRef>;
  @ViewChildren('editorStepTab') editorStepList: QueryList<ElementRef>;
  @ViewChildren('ngxStepEditor') ngxStepList: QueryList<ElementRef>;
  @ViewChildren('input') authorList: QueryList<any>;
  // @ViewChildren('UPCM-author') authorList: QueryList<any>;

  @ViewChildren('head') headList: QueryList<any>;
  @ViewChildren('UPI-head') titleScenarioList: QueryList<ElementRef>;

  teiDataList: any = {};
  showTermsCdtions: any = false;
  currentTab = 'terms';
  scenarioPushError = false;
  stepNunber = 1;
  scenarioElt: any;
  setpsDiv: any;
  alreadyPrevious = 0;
  fileNameAndSha: any = {};
  end = false;
  msg = 'You must add at least 2 steps.';
  id= 1;
  model = {};
  // test resources card
  resources_card_number: string []= ['1', '2', '3', '4', '5',
                                     '6', '7', '8', '9', '10'];


  contributeTerms = 'To contribute to the SSK, you need an account and to sign our';
  files: FileHandle[] = [];
  items: number[] = [0];
  reset = false;
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

  editorConfigStep = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '200px',
    width: 'auto',
    minWidth: '1120px',
    placeholder: 'Enter text here...',
    translate: 'yes',
    'toolbar': [
        ['undo', 'redo'],
        ['orderedList', 'unorderedList'],
        ['link', 'unlink']
    ]
  };

  // recuperer les steps existants depuis la base de données
  existingSteps = [
    { id: 1, title: 'Define the geographic and the chronological boundaries',
             description: 'Tracking the dissemination of a specific work' ,
             tags : [ {type:  'activity', value: 'Conversion'},
                      {type:  'activity', value: 'Data recognition'},
                      {type:  'standard', value: '.3ds'},
                      {type:  'standard', value: 'AAA'},
                      {type:  'standard', value: 'Modeling'},
                    ]
                  },
    { id: 2, title: 'Ocerisation',
             description: 'Tracking the dissemination of a specific work' ,
             tags : [ {type:  'activity', value: 'Conversion'},
                      {type:  'activity', value: 'Writing'},
                      {type:  'standard', value: 'Archiving'},
                      {type:  'standard', value: 'Preservation'},
                      {type:  'standard', value: 'Modeling'},
                   ]
                },
    { id: 3, title: 'TAL',
             description: 'Tracking the dissemination of a specific work' ,
             tags : [ {type:  'activity', value: 'Conversion'},
                      {type:  'activity', value: 'Writing'},
                      {type:  'standard', value: 'Archiving'},
                      {type:  'standard', value: 'STL'},
                      {type:  'standard', value: 'Modeling'},
                   ]
                },
    { id: 4, title: 'Define the geographic and the chronological boundaries',
             description: 'Tracking the dissemination of a specific work' ,
             tags : [ {type:  'activity', value: 'Conversion'},
                      {type:  'activity', value: 'Writing'},
                      {type:  'standard', value: 'Archiving'},
                      {type:  'standard', value: 'Preservation'},
                      {type:  'standard', value: 'Modeling'},
                   ]
                },
    { id: 5, title: 'Define the geographic and the chronological boundaries',
             description: 'Tracking the dissemination of a specific work' ,
             tags : [ {type:  'activity', value: 'Conversion'},
                      {type:  'activity', value: 'Writing'},
                      {type:  'standard', value: 'Archiving'},
                      {type:  'standard', value: 'Preservation'},
                      {type:  'standard', value: 'ASCII'},
                   ]
                },
    { id: 6, title: 'Tokenization',
             description: 'Lemmatization' ,
             tags : [ {type:  'activity', value: 'Conversion'},
                      {type:  'activity', value: 'Writing'},
                      {type:  'standard', value: 'Archiving'},
                      {type:  'standard', value: 'STL'},
                      {type:  'standard', value: 'CSS'},
                   ]
                },
    { id: 7, title: 'Archeology',
              description: '3D Scan' ,
              tags : [ {type:  'activity', value: 'Spatial Analysis'},
                       {type:  'standard', value: 'CSV'},
                       {type:  'standard', value: 'STL'},
                       {type:  'standard', value: 'CSS'},
                    ]
                },
  ];

  //  try to modify the css style of tei elements

  idTabs = {};
  idStepTabs = [];
  item: any;
  data: any;
  spinner = true;
  activitiesList  = [];
  standardsList   = [];
  objectsList  = [];

  authorsInfos = {'forename': '', 'surname': '' , 'affiliation': '' };

  // json object send to backend
  newStepInScenarioData = { };
  newScenarioData = { };
  newStepData = { };


  constructor(private sskServ: SskService,
              private _httpClient: HttpClient,
              private modalService: NgbModal,
              private githubService: GithubService,
              private renderer: Renderer2,
              private cdr: ChangeDetectorRef,
              private elastiServ: ElastichsearchService,
              public addTagService: DataContributionService,
              public resourceService: ResourceContributionService) {
    this.subscription = this.sskServ.navItem$
      .subscribe(item => this.active = item);
      this.idTabs['head']   = [{'idP': 'id26', 'idE': 'id29', 'idAttr': 'id30' }];
      this.idTabs['author'] = [{'idP': 'id4', 'idF': 'id8', 'idS': 'id10', 'idA': 'id12'}];
      this.idTabs['desc']   = [{'idP': 'id31', 'idE': 'id34', 'idAttr': 'id35' }];
      this.idStepTabs   = [{'idP': 'id27', 'idE': 'id30', 'idAttr': 'id31', 'idDP': 'id32', 'idDE': 'id35', 'idDAttr': 'id36' }];

      this.idCounter = new Array();
      this.idCounter.push(0);
      console.log('this.idTabs  =', this.idTabs );
  }

  ngOnInit() {
    this.currentTab = 'scenario';
    this.sskServ.changeNav('scenario');
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();


  }

  ngAfterViewInit() {
    new Promise(resolve =>
      setTimeout(() => {
        this.teiMeta = window['teimeta'];
        console.log('this.teiMeta (Promise) =', this.teiMeta);
        this.addClassToTextArea(this.idTabs['desc'][this.idTabs['desc'].length - 1].idE, 'scenario');
        resolve();
      }, 500)).then(
        val2 => {
          this.getScenario().then(
            val => {
              // this.setpsDiv = document.getElementById('stepsDiv') as HTMLElement;
              this.teiMeta.oddLoadUrl(this.scenarioUrl, 'scenario', this.teiMeta.finishOpenXml);
            });
        });
  }



  public openModalStep(content) {
    this.modalService.open(content);
    // change the css style after the modal has loaded
    const modalHeader         = document.querySelector('.modal-header');
    const modalContentElement = document.querySelector('.modal-content');
    const modalDialogElement  = document.querySelector('.modal-dialog');
    const modalFooter         = document.querySelector('.modal-footer');

    const closeIcon           = document.querySelector('.close');
    const closeSaveButtonsContainer = document.querySelector('.modal-footer');

    this.renderer.setStyle(modalContentElement, 'margin-top', '90px');
    this.renderer.setStyle(modalContentElement, 'width', '900px');
    this.renderer.setStyle(modalContentElement, 'height', ' 800px');
    this.renderer.setStyle(modalContentElement, 'margin-left', '-160px');

    this.renderer.setStyle(closeIcon , 'margin-top', '-36px');
    this.renderer.setStyle(closeIcon , 'background-color', 'white');
    this.renderer.setStyle(closeIcon , 'opacity', '1');
    this.renderer.setStyle(closeIcon , 'border-radius', '50%');
    this.renderer.setStyle(closeIcon , 'width', '50px');
    this.renderer.setStyle(closeIcon , 'height', '50px');
    this.renderer.setStyle(closeIcon , 'font-size', '3rem');
    this.renderer.setStyle(closeIcon , 'font-weight', '100');
    this.renderer.setStyle(closeIcon , 'margin-right', '-35px');
    this.renderer.setStyle(closeIcon , 'box-shadow', '#00000038 1px 5px 5px');

    this.renderer.setStyle(closeSaveButtonsContainer, 'display', 'block');
    this.renderer.setStyle(closeSaveButtonsContainer, 'margin-left', 'auto');
    this.renderer.setStyle(closeSaveButtonsContainer, 'margin-right', 'auto');

    this.renderer.setStyle(modalHeader, 'border-bottom', '0');
    this.renderer.setStyle(modalFooter, 'border-top', '0');


  }


  public openModalStepAddTags(contentTag) {
    this.modalService.open(contentTag);

    const modalHeader         = document.querySelector('.modal-header');
    const modalContentElement = document.querySelector('.modal-content');
    const modalDialogElement  = document.querySelector('.modal-dialog');
    const modalFooter         = document.querySelector('.modal-footer');

    const closeIcon           = document.querySelector('.close-modal-step');
    const closeSaveButtonsContainer = document.querySelector('.modal-footer');

    this.renderer.setStyle(modalContentElement, 'margin-top', '90px');
    this.renderer.setStyle(modalContentElement, 'width', '900px');
    this.renderer.setStyle(modalContentElement, 'height', '900px');
    this.renderer.setStyle(modalContentElement, 'margin-left', '-160px');

    this.renderer.setStyle(closeIcon , 'margin-top', '-36px');
    this.renderer.setStyle(closeIcon , 'background-color', 'white');
    this.renderer.setStyle(closeIcon , 'opacity', '1');
    this.renderer.setStyle(closeIcon , 'border-radius', '50%');
    this.renderer.setStyle(closeIcon , 'width', '50px');
    this.renderer.setStyle(closeIcon , 'height', '50px');
    this.renderer.setStyle(closeIcon , 'font-size', '3rem');
    this.renderer.setStyle(closeIcon , 'font-weight', '100');
    this.renderer.setStyle(closeIcon , 'margin-right', '-35px');
    this.renderer.setStyle(closeIcon , 'box-shadow', '#00000038 1px 5px 5px');

    this.renderer.setStyle(closeSaveButtonsContainer, 'display', 'block');
    this.renderer.setStyle(closeSaveButtonsContainer, 'margin-left', 'auto');
    this.renderer.setStyle(closeSaveButtonsContainer, 'margin-right', 'auto');

    this.renderer.setStyle(modalHeader, 'border-bottom', '0');
    this.renderer.setStyle(modalFooter, 'border-top', '0');

  }

public openModalStepResources( contentResources ) {
  const modalRef = this.modalService.open( AddResourceComponent, { size: 'lg' } );
  console.log( 'this.addResourseTitle new scenario = ', this.addResourseTitle );

  /*this.modalService.open(contentResources);

    const modalHeader         = document.querySelector('.modal-header');
    const modalContentElement = document.querySelector('.modal-content');
    const modalDialogElement  = document.querySelector('.modal-dialog');
    const modalFooter         = document.querySelector('.modal-footer');

    const closeIcon           = document.querySelector('.close-modal-step');
    const closeSaveButtonsContainer = document.querySelector('.modal-footer');

    this.renderer.setStyle(modalContentElement, 'margin-top', '90px');
    this.renderer.setStyle(modalContentElement, 'width', '900px');
    this.renderer.setStyle(modalContentElement, 'height', '900px');
    this.renderer.setStyle(modalContentElement, 'margin-left', '-160px');

    this.renderer.setStyle(closeIcon , 'margin-top', '-36px');
    this.renderer.setStyle(closeIcon , 'background-color', 'white');
    this.renderer.setStyle(closeIcon , 'opacity', '1');
    this.renderer.setStyle(closeIcon , 'border-radius', '50%');
    this.renderer.setStyle(closeIcon , 'width', '50px');
    this.renderer.setStyle(closeIcon , 'height', '50px');
    this.renderer.setStyle(closeIcon , 'font-size', '3rem');
    this.renderer.setStyle(closeIcon , 'font-weight', '100');
    this.renderer.setStyle(closeIcon , 'margin-right', '-35px');
    this.renderer.setStyle(closeIcon , 'box-shadow', '#00000038 1px 5px 5px');

    this.renderer.setStyle(closeSaveButtonsContainer, 'display', 'block');
    this.renderer.setStyle(closeSaveButtonsContainer, 'margin-left', 'auto');
    this.renderer.setStyle(closeSaveButtonsContainer, 'margin-right', 'auto');

    this.renderer.setStyle(modalHeader, 'border-bottom', '0');
    this.renderer.setStyle(modalFooter, 'border-top', '0');*/

  }




  public getScenario(): Promise<any> {
    return new Promise(resolve =>
      this._httpClient
        .get(this.scenarioUrl, { responseType: 'text' })
        .first()
        .subscribe((data: any) => {
          resolve();
        })
    );
  }

  open(type: string) {
    if (type === 'signIn') {
        this.currentTab = 'scenario';
        const modalRef = this.modalService.open(UserComponent);
        modalRef.componentInstance.goToProfile = true;
    }

    if (type === 'create') {
        const modalRef = this.modalService.open(CreateAccountComponent);
        modalRef.componentInstance.alreadyAgreeTerms = true;
    }
  }

  createAccount() {
    const modalRef = this.modalService.open(CreateAccountComponent);
    console.log('modalRef = ', modalRef);
    modalRef.componentInstance.alreadyAgreeTerms = false;
  }


  saveTEIScenatio(finish: boolean) {
    
    /*
    console.log('save scenario');
    console.log('finish =', finish );

    // javascript targeting :
    console.log('title scenario                    =', document.getElementsByClassName('UPI-head-head')[0]['value']);
    console.log('forname                           =', document.getElementsByClassName('UPI-forname')[0]['value']);
    console.log('surname                           =', document.getElementsByClassName('UPI-surname')[0]['value']);
    console.log('input                             =', document.getElementsByName('input'));

    // querySelectorAll :
    console.log('querySelectorAll all inputs               =', document.querySelectorAll('input'));
    console.log('querySelectorAll all ngx-editor-textarea  =', document.querySelectorAll('.ngx-editor-textarea'));

    // @ViewChildren :
    console.log('this.authorsList                          =', this.authorsList);
    
    console.log('this.editorList                           =', this.editorList);

    console.log('this.editorList                           =', this.editorList[0]);


    console.log('this.titleScenarioList =', this.titleScenarioList);
    console.log('this.authorList        =', this.authorList);
    console.log('this.ngxStepList       =', this.ngxStepList);
    console.log('this.langList          =', this.langList);
    console.log('this.editorList        =', this.editorList);
    

    // this.newStepData['id'] = this.stepNunber;

  
    this.newStepData['teiContent'] = this.teiMeta.generateTEI();
    this.newStepData['author'] = '';
    this.newStepData['editor'] = '';
    this.newStepData['scenarios'] = [''];
    this.newStepData['resources'] = [''];

    // this.newScenarioData['id'] = '';
    this.newScenarioData['title'] = '';
    this.newScenarioData['status'] = '';
    this.newScenarioData['teiContent'] = this.teiMeta.generateTEI();
    this.newScenarioData['author'] = '';
    this.newScenarioData['StepsInScenario'] = [];
    this.newScenarioData['steps'] = '';

    // this.newStepInScenarioData['id'] = '';
    // this.newStepInScenarioData['scenario_id'] = '';
    this.newStepInScenarioData['step'] = '';
    this.newStepInScenarioData['stepPosition'] = '';
    this.newStepInScenarioData['step_id'] = '';
    */

    this.scenarioPushError = false;
    if (this.active === 'steps') {
      console.log('steps');
      if (this.fileNameAndSha.hasOwnProperty(this.stepNunber)) {
        this.githubService.updateFile(this.fileNameAndSha[this.stepNunber]['sha'], this.teiMeta.generateTEI(), 'step',
          this.fileNameAndSha[this.stepNunber]['name'], false).then(
            val => {
            });
      } else {
        this.githubService.createFile(this.teiMeta.generateTEI(), 'step').then(
          val => {
            if (val['sha'] !== undefined) {
              this.fileNameAndSha[this.stepNunber] = {
                'sha': val['sha'],
                'name': val['name']
              };
              const stepElt = document.querySelector('#teidata') as HTMLElement;
              console.log('stepElt =', stepElt);
              if ((this.stepNunber + this.alreadyPrevious) > 1) {
                this.goNextStep(stepElt, finish);
              } else {
                    stepElt.classList.add('step-' + this.stepNunber++);
                    stepElt.removeAttribute('id');
                    stepElt.classList.add('d-none');
                if (!finish) {
                    const newStep = document.createElement('div');
                    newStep.setAttribute('id', 'teidata');
                    this.setpsDiv.appendChild(newStep);
                    this.teiMeta.oddLoadUrl(this.stepUrl, 'steps', this.teiMeta.finishOpenXml);
                } else {
                    this.end = true;
                    this.stepNunber--;
                    this.updateScenario();
                }
              }
            } else {
              this.scenarioPushError = !val;  // Casting Object ot String to boolean
            }
          });

      }

    } else {
      console.log(this.fileNameAndSha);
      if (this.fileNameAndSha.hasOwnProperty(this.stepNunber)) {
        this.githubService.updateFile(this.fileNameAndSha[this.stepNunber].sha, this.teiMeta.generateTEI(), 'scenario',
          this.fileNameAndSha[this.stepNunber].name, false).then(
            val => {
              if (val) {
                this.goToStep();
              } else {
                this.scenarioPushError = !val;  //  Casting Object ot String to boolean
              }
            });
      } else {
        this.githubService.createFile(this.teiMeta.generateTEI(), 'scenario').then(
          val => {
            console.log('new file tei created =', val);
            if (val['sha'] !== undefined) {
              this.fileNameAndSha[this.stepNunber - 1 ] = {
                'sha': val['sha'],
                'name': val['name']
              };
              console.log(this.fileNameAndSha);
              this.goToStep();
            } else {
              this.scenarioPushError = !val;  // Casting Object ot String to boolean
            }
          });
      }
    }
    console.log('this.fileNameAndSha =', this.fileNameAndSha);
    console.log('this.githubService', this.githubService);
  }

  goNextStep(stepElt: any, finish: boolean) {
      if (this.alreadyPrevious === 0) {
            stepElt.classList.add('step-' + this.stepNunber++);
            stepElt.removeAttribute('id');
            stepElt.classList.add('d-none');
      if (!finish) {
            const newStep = document.createElement('div');
            newStep.setAttribute('id', 'teidata');
            this.setpsDiv.appendChild(newStep);
            this.teiMeta.oddLoadUrl(this.stepUrl, 'steps', this.teiMeta.finishOpenXml);
      } else {
            this.stepNunber--;
            this.end = true;
            this.updateScenario();
        }
      } else {
            this.alreadyPrevious--;
            stepElt.removeAttribute('id');
            stepElt.classList.add('d-none');
            stepElt = document.querySelector('div.d-none.step-' + ++this.stepNunber) as HTMLElement;
            stepElt.classList.remove('d-none');
            stepElt.setAttribute('id', 'teidata');
    }
  }

  goToStep() {


    this.active = 'steps';
    this.currentTab = 'steps';
    this.sskServ.changeNav('steps');
    this.getScenario().then(
      value => {
        this.scenarioElt = document.querySelector('.scenarioTEI') as HTMLElement;
        this.scenarioElt.removeAttribute('id');
        if (this.alreadyPrevious !== 0) {
            this.alreadyPrevious--;
            let stepElt: any;
            stepElt = document.querySelector('.step-' + this.stepNunber) as HTMLElement;
            stepElt.setAttribute('id', 'teidata');
        } else {
            this.teiMeta.oddLoadUrl(this.stepUrl, 'steps', this.teiMeta.finishOpenXml);
        }
      });
  }


  toogleTab(type: string) {
    if (type === 'scenario') {

      console.log('------ scenario ------');
      this.active = 'scenario';
      this.currentTab = 'scenario';
      const currentStep = document.querySelector('#teidata') as HTMLElement;
      currentStep.removeAttribute('id');
      this.scenarioElt = document.querySelector('.scenarioTEI') as HTMLElement;
      this.scenarioElt.setAttribute('id', 'teidata');
    }

    if (type === 'steps') {

      console.log('------ steps ------');
      this.active = 'steps';
      this.currentTab = 'steps';
      this.scenarioElt = document.querySelector('.scenarioTEI') as HTMLElement;
      this.scenarioElt.removeAttribute('id');
      this.teiMeta.oddLoadUrl(this.stepUrl, 'steps', this.teiMeta.finishOpenXml);
    }
  }

  previous() {
    this.alreadyPrevious++;
    let stepElt: any;
    if (this.currentTab === 'steps') {
      if (this.stepNunber > 1) {
        stepElt = document.getElementById('teidata') as HTMLElement;
        stepElt.classList.add('step-' + this.stepNunber);
        stepElt.removeAttribute('id');
        stepElt.classList.add('d-none');
        stepElt = document.querySelector('div.d-none.step-' + (--this.stepNunber)) as HTMLElement;
        stepElt.classList.remove('d-none');
        stepElt.setAttribute('id', 'teidata');
      } else {
        this.currentTab = 'scenario';
        this.active = 'scenario';
        stepElt = document.getElementById('teidata') as HTMLElement;
        stepElt.classList.add('step-' + this.stepNunber);
        stepElt.removeAttribute('id');
        stepElt = document.querySelector('.scenarioTEI') as HTMLElement;
        stepElt.setAttribute('id', 'teidata');
      }
    }

    }

    insertStepsInScenario(scenarioContent: string) {
          const listEvent = document.createElement('listEvent');
          for (let i = 1 ; i <= this.stepNunber; i++) {
              const event = document.createElement('event');
              event.setAttribute('ref', (this.fileNameAndSha[i]).name.slice(0, -4));
              event.setAttribute('xml:id', 's' + i);
              event.setAttribute('type', 'researchStep');
              listEvent.appendChild(event);
        }

          console.log(listEvent);
          const parser = new DOMParser();
          let xmlDoc = parser.parseFromString(scenarioContent, 'text/xml');
          xmlDoc.getElementsByTagName('div')[0].appendChild(listEvent);
          xmlDoc = parser.parseFromString(xmlDoc.documentElement.outerHTML, 'text/xml');
          console.log('', xmlDoc.documentElement.outerHTML);
          return xmlDoc.documentElement.outerHTML;
    }

    updateScenario() {
        this.githubService.getDraftFile('scenario', this.fileNameAndSha[0].name).then(
        val => {
            const scenarioWithSteps = this.insertStepsInScenario(atob(val.toString()));
            this.githubService.updateFile(this.fileNameAndSha[0].sha, scenarioWithSteps, 'scenario', this.fileNameAndSha[0].name, true)
            .then(
              (value) =>  {
                if (value) {
                  this.msg = 'New Scenario ' + this.fileNameAndSha[0].name + ' and its steps have been successful added on github !!!';
                } else {
                  this.msg = 'Something went wrong, please try again or contact SSK team via  ssk@inria.fr';
                }
            });
        });
    }

    // Dropzone
    filesDropped(files: FileHandle[]): void {
      console.log('files =', files);
      this.reset = true;
      this.files = files;
    }

    test() {
      const content = this.teiMeta.generateTEI();
      console.log(content);
      this.active = 'steps';
      this.teiMeta.oddLoadUrl(this.stepUrl, 'steps', this.teiMeta.finishOpenXml);
      setTimeout(() => {
        this.addClassToTextArea(this.idStepTabs[this.idStepTabs.length - 1].idDE, 'step');
      }, 500);
    }


    test1() {
      const content = this.teiMeta.generateTEI();
      console.log(content);
    }

    setText(eltId: string, $event: any) {
      console.log(event);
      this.teiMeta.setText(event, eltId, false);
      if (this.active === 'steps' && event.srcElement.localName === 'select' && event.type === 'change') {
        this.teiMeta.setText(event, event.srcElement.nextElementSibling.id, false);
       }
    }

    addNewElt(type: any, idSet: any, event: any) {
      console.log(idSet);
      let lastId = this.teiMeta.getLastExport();
        switch (type) {
          case 'author':
            this.teiMeta.createEC(event, idSet.idP);
            this.idTabs['author'].push({'idP': 'id4', 'idF': 'id' + (lastId + 2), 'idS': 'id' + (lastId + 4), 'idA': 'id' + (lastId + 6) });
          break;
          case 'head':
              this.teiMeta.createEC(event, idSet.idP);
              this.idTabs['head'].push({'idP': 'id26', 'idE': 'id' + (lastId + 1), 'idAttr': 'id' + (lastId + 2) });
          break;
          case 'desc':
            console.log('this.langList.length =', this.langList.length );
            this.renderer.removeClass( (this.langList.toArray()[this.langList.length - 2]).nativeElement, 'active');
            this.renderer.removeClass( (this.editorList.toArray()[this.editorList.length - 1]).nativeElement, 'active');
            this.idTabs['desc'].push({'idP': 'id31', 'idE': 'id' + (lastId + 1), 'idAttr': 'id' + (lastId + 2) });
            this.cdr.detectChanges();
            this.addClassToTextArea(this.idTabs['desc'][this.idTabs['desc'].length - 1].idE, 'scenario');
            this.renderer.addClass( (this.langList.toArray()[this.langList.length - 2]).nativeElement, 'active');
            this.renderer.addClass( (this.editorList.toArray()[this.editorList.length - 1]).nativeElement, 'active');
           /* if (this.langList.length > 4) {
                this.renderer.setAttribute(document.querySelector('#add-desc-scenario'), 'disabled', 'true');
            }*/
          break;
          case 'descHead':
                 console.log('lastId          =', lastId);
                _.forEach(this.steplangList.toArray(), item => {
                  this.renderer.removeClass( item.nativeElement, 'active');
                });
                 _.forEach(this.editorStepList.toArray(), item => {
                  this.renderer.removeClass( item.nativeElement, 'active');
                });
                this.teiMeta.createEC(event, idSet.idP);
                this.idStepTabs.push({'idP': 'id27', 'idE': 'id' + (lastId + 1), 'idAttr': 'id' + (lastId + 2)});
                this.cdr.detectChanges();
                lastId = this.teiMeta.getLastExport();
                const lastElt = this.idStepTabs.pop();
                lastElt['idDP'] = 'id32'; lastElt['idDE'] = 'id' + (lastId + 1); lastElt['idDAttr'] = 'id' + (lastId + 2);
                this.idStepTabs.push(lastElt);
                this.cdr.detectChanges();
                this.addClassToTextArea(this.idStepTabs[this.idStepTabs.length - 1].idDE, 'step');
                this.renderer.addClass( (this.steplangList.toArray()[this.steplangList.length - 2]).nativeElement, 'active');
                this.renderer.addClass( (this.editorStepList.toArray()[this.editorStepList.length - 1]).nativeElement, 'active');
          break;
        }

        // debugger;
    }

// Text Editor methods :
public onClosiClick(tab: ITabTextEditor): void {
    // console.log('tabs =' + this.tabs );
    this.tabs = this.tabs
    .filter((currentTab: ITabTextEditor): boolean => currentTab !== tab);
  }


public addClassToTextArea(id: string, type: string)  {
  console.log(id);
  let elt: any;
  if ( type === 'scenario') {
        elt = this.ngxeditorList.last['textArea'].nativeElement;
        this.renderer.addClass(elt, 'UPI-desc-definition-desc');
        this.renderer.setAttribute(elt, 'id', id);
        this.renderer.setAttribute(elt, 'name', id);
        this.renderer.setAttribute(elt, 'onmouseout', "window.teimeta.setText(event, '"+id+ "',false)");
    if ( this.teiMeta.createEC ) {this.teiMeta.createEC(event, 'id31'); }
        this.cdr.detectChanges();
  } else {
        console.log(this.ngxStepList);
        elt = this.ngxStepList.last['textArea'].nativeElement;
        this.renderer.addClass(elt, 'UPI-desc-definition-desc');
        this.renderer.setAttribute(elt, 'id', id);
        this.renderer.setAttribute(elt, 'name', id);
        this.renderer.setAttribute(elt, 'onmouseout', "window.teimeta.setText(event, '"+id+ "',false)");
  if ( this.teiMeta.createEC ) {this.teiMeta.createEC(event, 'id32'); }
        this.cdr.detectChanges();
  }

}

stepSelect($event) {
     const tagStepListTemp     = [] ;
     const tagStepTypeListTemp = [];

     const childNodesStepDiv = $event.currentTarget.childNodes;
     this.stepTitle          = childNodesStepDiv[1].innerHTML;
     this.stepDescription    = childNodesStepDiv[3].innerHTML;

     childNodesStepDiv[5].childNodes.forEach(element => {
          if (element.nodeName === 'SPAN') {
               console.log( 'value  =', element.innerText);
               console.log( 'type   =', element.classList[4]);
               tagStepListTemp.push(element.innerText);
               tagStepTypeListTemp.push(element.classList[4]);
          }
     });

     this.tagStepTypeList = tagStepTypeListTemp;
     this.tagStepList     = tagStepListTemp;

     const arr =  Array.from(document.querySelectorAll('.tr-existing-step'));
     arr.forEach(elementStep => {
          const test = elementStep.classList;
          test.add( 'tr-existing-step-unselected' );
     });

     const arr2 =  Array.from(document.querySelectorAll('.tr-existing-step-selected'));
     arr2.forEach(elementStep => {
          const test = elementStep.classList;
          test['value'] =  'tr-existing-step-unselected' ;
     });

     const testselected = $event.currentTarget;
     testselected.classList.value = 'tr-existing-step-selected';
  }

  public deleteExistingStep ($event) {
      this.tagStepList = [];
      const arr =  Array.from(document.querySelectorAll('.tr-existing-step-selected'));
      arr.forEach(elementStep => {
           const test = elementStep.classList['value'] =  'tr-existing-step-unselected' ;
      });
  }

  public newstep ($event){
    $('#steps-tab').clone().appendTo('#mydiv2');
    console.log($('#steps-tab'));

  }



}

