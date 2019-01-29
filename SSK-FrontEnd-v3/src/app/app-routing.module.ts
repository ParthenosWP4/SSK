import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {ScenariosComponent} from './scenarios/scenarios.component';
import {ScenarioTemplateComponent} from './scenario-template/scenario-template.component';
import {ScenarioCardComponent} from './scenario-card/scenario-card.component';
import {NewScenarioComponent} from './contribute/new-scenario/new-scenario.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {GlossaryComponent} from './glossary/glossary.component';
import {ContentComponent} from './glossary/content/content.component';
import {GlossaryResolver} from './glossary/glossary.resolver';
import {ErrorpageComponent} from './errorpage/errorpage.component';
import { PageInContructionComponent } from './page-in-contruction/page-in-contruction.component';
import { AddStandardComponent } from './contribute/add-standard/add-standard.component';
import { ContactComponent } from './infos/contact/contact.component';
import { TeamComponent } from './infos/team/team.component';
import { PolicyComponent } from './infos/policy/policy.component';
import { LicenseCitationComponent } from './infos/license-citation/license-citation.component';
import { UserComponent } from './contribute/user/user.component';
import { DocumentationComponent } from './infos/documentation/documentation.component';


const routes: Routes = [
  { path: '#', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent,
  data: {
    breadcrumbs: true,
  }},
  { path: 'scenarios', component: ScenariosComponent,
  data: {
    breadcrumbs: true,
    text: 'Scenarios'
  }},
  { path: 'steps', component: ScenariosComponent,
  data: {
    breadcrumbs: true,
    text: 'Steps'
  }
 },
  { path: 'resources', component: ScenariosComponent,
  data: {
    breadcrumbs: true,
    text: 'Resources'
  }
  },
  { path: 'scenarios/:id', component: ScenarioComponent,
  data: {
    breadcrumbs: 'Scenarios',
  }
},
  { path: 'construction',  component: PageInContructionComponent },
  { path: 'contact',  component: ContactComponent },
  { path: 'new-scenario',  component: NewScenarioComponent },
  { path: 'add-standard',  component: AddStandardComponent },
  { path: 'team',  component: TeamComponent,
    data: {
      breadcrumbs: true,
      text: 'Project Team'
    }
  },

  { path: 'documentation',  component: DocumentationComponent },
  { path: 'policy',  component: PolicyComponent },
  { path: 'license',  component: LicenseCitationComponent },
  { path: 'user',  component: UserComponent },
  { path: 'scenarios/:id/:stepId', component: ScenarioComponent},
  {
    path: 'glossary', component: GlossaryComponent,
    data: {
      // Uses static text (Glossary)
      breadcrumbs: true,
      text: 'Glossary'
    },
  children: [
    { path: ':type', component: ContentComponent,
      resolve: {
        type: GlossaryResolver
      },
      data: {
        breadcrumbs: '{{type}}',
      },
      children: [
        { path: ':item', component: ContentComponent,
        }
      ]
    }
  ]
  },
  { path: 'errorpage', component: ErrorpageComponent},
  { path: '**',  component: ErrorpageComponent },
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, { useHash: true });
