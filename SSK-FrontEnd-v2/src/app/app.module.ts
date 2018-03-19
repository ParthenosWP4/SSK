import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import * as $ from 'jquery';
import { TooltipModule } from 'ngx-bootstrap';
import { SearchTabComponent } from './search-tab/search-tab.component';
import {FormsModule} from '@angular/forms';






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
    SearchTabComponent
  ],
  imports:
    [
      TooltipModule.forRoot(),
      routing,
      BrowserModule,
      CommonModule,
      HttpModule,
      NgxPaginationModule,
      FormsModule
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [appRoutingProviders, SafeHtmlPipe, ElastichsearchServicesService, SskServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
