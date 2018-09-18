import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {ScenariosComponent} from './scenarios/scenarios.component';
import {ScenarioTemplateComponent} from './scenario-template/scenario-template.component';
import {ScenarioCardComponent} from './scenario-card/scenario-card.component';
import {StepCardComponent} from './step-card/step-card.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {GlossaryComponent} from './glossary/glossary.component';
import {ContentComponent} from '/glossary/content/content.component';
import {GlossaryResolver} from './glossary/glossary.resolver';
import {ErrorpageComponent} from ''./errorpage/errorpage.component';


const routes: Routes = [
  { path: '#', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent},
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
  { path: 'resources', component: ScenariosComponent, outlet: 'target'},
  { path: 'scenarios/:id', component: ScenarioComponent},
  { path: 'scenarios/:id/:stepId', component: ScenarioComponent},
  {
    path: 'glossary', component: GlossaryComponent,
    data: {
      // Uses static text (Glossary)
      breadcrumbs: true,
      text: 'Glossary'
    },
  children: [
    { path: ':item', component: ContentComponent,
      resolve: {
        item: GlossaryResolver
      },
      data: {
        breadcrumbs: '{{item}}',
      }
    }
  ]
  },
  { path: 'errorpage', component: ErrorpageComponent},
  { path: '**',  component: ErrorpageComponent },
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, { useHash: true });
