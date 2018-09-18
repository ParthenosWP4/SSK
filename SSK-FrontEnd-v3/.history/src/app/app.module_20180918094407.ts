import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { ScenarioCardComponent } from './scenario-card/scenario-card.component';
import { ScenarioTemplateComponent } from './scenario-template/scenario-template.component';
import {ElastichsearchServicesService} from './elastichsearch-services.service';
import {HttpModule} from '@angular/http';
import { StepCardComponent } from './step-card/step-card.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {SskServicesService} from './ssk-services.service';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { TooltipModule } from 'ngx-bootstrap';
import { SearchTabComponent } from './search-tab/search-tab.component';
import {FormsModule} from '@angular/forms';
import { GlossaryComponent } from './glossary/glossary.component';
import {McBreadcrumbsConfig, McBreadcrumbsModule} from 'ngx-breadcrumbs';
import { RightMenuComponent } from './glossary/right-menu/right-menu.component';
import { ContentComponent } from './glossary/content/content.component';
import {GlossaryResolver} from './glossary/glossary.resolver';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './request.interceptor';
import { CookieLawModule } from 'angular2-cookie-law';

export function dataProviderFactory(provider: ElastichsearchServicesService) {
  return () => provider.loadData();
}



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
    ErrorpageComponent
  ],
  imports:
    [
      TooltipModule.forRoot(),
      routing,
      BrowserModule,
      HttpClientModule,
      CommonModule,
      HttpModule,
      NgxPaginationModule,
      FormsModule,
      McBreadcrumbsModule.forRoot(),
      PdfViewerModule

    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [appRoutingProviders, SafeHtmlPipe, ElastichsearchServicesService, SskServicesService, GlossaryResolver,
    { provide: APP_INITIALIZER, useFactory: dataProviderFactory, deps: [ElastichsearchServicesService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(breadcrumbsConfig: McBreadcrumbsConfig, private sskServ: SskServicesService,
              ) {
    breadcrumbsConfig.postProcess = (x) => {
      // Ensure the first breadcrumb points to home
      let y = x;

      if (x.length && x[0].text !== 'Home') {
        y = [
          {
            text: 'Home',
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
