import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { routing,appRoutingProviders } from './app-routing.module';
import { ScenarioComponent } from './scenario.component';
import { HomeComponent } from './home.component';
import { AppComponent } from './app.component';
import { ScenarioDetailsComponent } from './scenario-details.component';
import {httpFactory} from "./http.factory";
import * as spinner from 'ng2-spin-kit-new/app/spinners';
import {AppService} from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioComponent,
    HomeComponent,
    ScenarioDetailsComponent,
    spinner.RotatingPlaneComponent
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



