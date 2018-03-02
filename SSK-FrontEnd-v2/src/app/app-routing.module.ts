import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {ScenariosComponent} from './scenarios/scenarios.component';
import {ScenarioTemplateComponent} from './scenario-template/scenario-template.component';
import {ScenarioCardComponent} from './scenario-card/scenario-card.component';
import {StepCardComponent} from './step-card/step-card.component';


const routes: Routes = [
  { path: '#', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'scenarios', component: ScenariosComponent , children:
    [
      { path: '', component: ScenarioTemplateComponent, outlet: 'scenario-template' },
      { path: '', component: ScenarioCardComponent, outlet: 'scenario'
        , children :
        [
            {path: '', component: ScenarioTemplateComponent, outlet: 'scenario-template'}
        ]
      }
    ]
  },
  { path: 'steps', component: ScenariosComponent, outlet: 'target'},
  { path: 'resources', component: ScenariosComponent, outlet: 'target'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
