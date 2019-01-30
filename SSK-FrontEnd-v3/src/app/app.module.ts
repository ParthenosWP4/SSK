import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { ScenarioCardComponent } from './scenario-card/scenario-card.component';
import { ScenarioTemplateComponent } from './scenario-template/scenario-template.component';
import { ElastichsearchService} from './elastichsearch.service';
import { HttpModule} from '@angular/http';
import { StepCardComponent } from './step-card/step-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SskService } from './ssk.service';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { TooltipModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SearchTabComponent } from './search-tab/search-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlossaryComponent } from './glossary/glossary.component';
import { McBreadcrumbsConfig, McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { RightMenuComponent } from './glossary/right-menu/right-menu.component';
import { ContentComponent } from './glossary/content/content.component';
import { GlossaryResolver } from './glossary/glossary.resolver';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor} from './request.interceptor';
import { CookieLawModule } from 'angular2-cookie-law';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddStandardComponent } from './contribute/add-standard/add-standard.component';
import { TeamComponent } from './infos/team/team.component';
import { ContactComponent } from './infos/contact/contact.component';
import { PolicyComponent } from './infos/policy/policy.component';
import { LicenseCitationComponent } from './infos/license-citation/license-citation.component';
import { DocumentationComponent } from './infos/documentation/documentation.component';
import { PageInContructionComponent } from './page-in-contruction/page-in-contruction.component';
import { NewScenarioComponent } from './contribute/new-scenario/new-scenario.component';
import { UserComponent } from './contribute/user/user.component';
import { MomentModule } from 'ngx-moment';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { HighlightPipe } from './highlight.pipe';
import { ModalResourcesComponent } from './scenario/modal-resources/modal-resources.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TagDirectiveDirective } from './tag-directive.directive';
import { ClipboardModule } from 'ngx-clipboard';

/*export function dataProviderFactory(provider: ElastichsearchService) {
  return () => provider.loadData();
}*/



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SafeHtmlPipe,
    ScenariosComponent,
    ScenarioCardComponent,
    ScenarioTemplateComponent,
    StepCardComponent,
    ResourceCardComponent,
    ScenarioComponent,
    SearchTabComponent,
    GlossaryComponent,
    RightMenuComponent,
    ContentComponent,
    ErrorpageComponent,
    AddStandardComponent,
    TeamComponent,
    ContactComponent,
    PolicyComponent,
    LicenseCitationComponent,
    DocumentationComponent,
    PageInContructionComponent,
    NewScenarioComponent,
    UserComponent,
    HighlightPipe,
    ModalResourcesComponent,
    TagDirectiveDirective
  ],
  imports:
    [
      TooltipModule.forRoot(),
      PopoverModule.forRoot(),
      routing,
      BrowserModule,
      HttpClientModule,
      CommonModule,
      HttpModule,
      NgxPaginationModule,
      FormsModule,
      McBreadcrumbsModule.forRoot(),
      CookieLawModule, // import Angular's CookieLaw modules
      BrowserAnimationsModule,
      MomentModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
      ClipboardModule
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [NgbActiveModal, appRoutingProviders, SafeHtmlPipe, ElastichsearchService, SskService, GlossaryResolver, HighlightPipe,
    //{ provide: APP_INITIALIZER, useFactory: dataProviderFactory, deps: [ElastichsearchService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
    ],
    entryComponents: [
      ModalResourcesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(breadcrumbsConfig: McBreadcrumbsConfig, private sskServ: SskService,
              ) {
    breadcrumbsConfig.postProcess = (x) => {
      // Ensure the first breadcrumb points to home
      let y = x;

      if (x.length && x[0].text !== 'Home') {
        y = [
          {
            text: 'SSK',
            path: ''
          }].concat(x);
        if (x.length = 2) {
          this.sskServ.setGlossarylink(undefined);
        }
      }
      return y;
    };
  }


}
