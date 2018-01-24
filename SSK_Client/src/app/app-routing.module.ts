import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScenariosComponent } from './scenarios.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ScenarioDetailsComponent } from './scenario-details.component';
import { StepListComponent } from './step-list.component';

export const routes: Routes = [
  { path: '#', redirectTo: '/', pathMatch: 'full' },
  { path: 'scenarios', component: ScenariosComponent},
    { path: 'contentlist', component: StepListComponent},
  { path: 'scenario/:id', component: ScenarioDetailsComponent },
  {
    path: '',
    component: HomeComponent
  }
  /*{ path: '**', component: PageNotFoundComponent }*/
];
export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
