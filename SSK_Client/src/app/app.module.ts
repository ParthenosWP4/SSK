import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, Injector } from '@angular/core';
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
import { ResourceTypePipe } from './resource-card/resource-type.pipe';
import { ProfileComponent } from './contribute/profile/profile.component';
import { CreateAccountComponent } from './contribute/create-account/create-account.component';
import { GithubService} from './github.service';
import { AddResourceComponent } from './contribute/add-resource/add-resource.component';
import { AddTagComponent } from './contribute/add-standard/add-tag/add-tag.component';
import { NgxEditorModule } from 'ngx-editor';
import { TagComponent } from './contribute/tag/tag.component';
import { NewScenarioTestComponent } from './contribute/new-scenario-test/new-scenario-test.component';
import { DragDropDirective } from './contribute/new-scenario-test/drag-drop.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddStepTagsComponent } from './contribute/new-scenario/add-step-tags/add-step-tags.component';
import { ChangeOnDivDirective } from './change-on-div.directive';
import { DataContributionService } from './contribute/tag/data-contribution.service' ;
import { ResourceContributionService} from './contribute/add-resource/resource-contribution.service' ;
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { CanAuthenticationGuard } from './can-authentication.guard';
import { initializer } from '../assets/js/app-init';
import { Router, ChildrenOutletContexts, PRIMARY_OUTLET } from '@angular/router';
import { of } from 'rxjs/observable/of';
/*export function dataProviderFactory(provider: ElastichsearchService) {
  return () => provider.loadData();
}*/


const keycloakService = new KeycloakService();

const FAKE_OUTLET = {
  attach() {},
  detatch() {},
  activateWith() {},
  deactivate() {}
};

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
    TagDirectiveDirective,
    ResourceTypePipe,
    ProfileComponent,
    CreateAccountComponent,
    AddResourceComponent,
    AddTagComponent,
    TagComponent,
    NewScenarioTestComponent,
    DragDropDirective,
    AddStepTagsComponent,
    ChangeOnDivDirective,
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
      ClipboardModule,
      NgxEditorModule,
      Ng2SearchPipeModule,
      KeycloakAngularModule,
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ NgbActiveModal, appRoutingProviders, SafeHtmlPipe, ElastichsearchService, SskService, GlossaryResolver, HighlightPipe,
    GithubService, DataContributionService, ResourceContributionService, CanAuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: APP_INITIALIZER,
      deps: [ Injector ],
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          const router = injector.get(Router) as any;

          router.hooks.beforePreactivation = () => {
            let contexts: ChildrenOutletContexts = router.rootContexts;

            while (contexts != null) {
              const context = contexts.getContext(PRIMARY_OUTLET);

              if (context != null) {
                if (context.outlet == null) {
                  context.outlet = FAKE_OUTLET as any;
                }

                contexts = context.children;
              } else {
                contexts = null;
              }
            }

            return of(null);
          };
        };
      }
    }
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



