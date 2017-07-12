import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AppComponent } from './app.component';
import { ScenarioDetailsComponent } from './scenario-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'ssk', pathMatch: 'full' },
  { path: 'scenario/:id', component: ScenarioDetailsComponent },
  {
    path: 'ssk',
    component: HomeComponent
  }
  /*{ path: '**', component: PageNotFoundComponent }*/
];
export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
