import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { routing, appRoutingProviders } from './app-routing.module';
import { HomeComponent } from './home.component';
import { ScenarioComponent } from './scenario.component';
import { StepResourcesComponent } from './step-resources.component';
import { ExploreComponent } from './explore.component'
import { ScenariosComponent } from './scenarios.component';
import { ResourceComponent } from './resource.component';
import { AppComponent } from './app.component';
import { StepListComponent } from './step-list.component';
import { ScenarioDetailsComponent } from './scenario-details.component';
import {httpFactory} from './http.factory' ;
import * as spinner from 'ng2-spin-kit/app/spinners';
import {AppService} from './app.service';
import * as _ from 'lodash'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScenariosComponent,
    ScenarioComponent,
    ScenarioDetailsComponent,
    StepResourcesComponent,
    ResourceComponent,
    ExploreComponent,
      StepListComponent,
    spinner.RotatingPlaneComponent,
    spinner.CubeGridComponent,
    spinner.ThreeBounceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



