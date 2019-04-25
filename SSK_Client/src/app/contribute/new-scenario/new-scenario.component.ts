import { Component, OnInit, ElementRef, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
import { SskService } from '../../ssk.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent} from '../user/user.component';
import { CreateAccountComponent} from '../create-account/create-account.component';
import {Subscription} from 'rxjs/Subscription';
import { GithubService } from '../../github.service';



@Component({
  selector: 'app-new-scenario',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['./new-scenario.component.scss']
})
export class NewScenarioComponent implements OnInit, AfterViewInit {
  forImage = environment.forImage;
  scenarioUrl = this.forImage + 'assets/tei_meta/models/SSKODDforScForm.xml';
  stepUrl = '../../../assets/tei_meta/models/SSKODDforStepForm.xml';
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
  showTermsCdtions = false;
  currentTab = 'terms';


  contributeTerms = 'To contribute to the SSK, you need an account and to sign our';

  constructor(private sskServ: SskService, private _httpClient: HttpClient, private modalService: NgbModal,
    private githubService: GithubService) {
      this.subscription = this.sskServ.navItem$
       .subscribe(item => this.active = item);

  }

  ngOnInit() {
    
       this.sskServ.changeNav('scenario');
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }
  ngAfterViewInit() {
    new Promise(resolve =>
      setTimeout(() => {
        this.teiMeta = window['teimeta'];
        resolve();
      }, 500)).then(
        val2 => {
          this.getScenario().then(
            val => {
              this.teiMeta.oddLoadUrl(this.scenarioUrl, 'scenarioUrl', this.teiMeta.finishOpenXml)
                ;
            });
        });
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
      this.githubService.createFile('my content');
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
    modalRef.componentInstance.alreadyAgreeTerms = false;
  }

}



