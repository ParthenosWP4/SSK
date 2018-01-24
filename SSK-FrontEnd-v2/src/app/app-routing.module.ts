import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {ScenarioComponent} from './scenario/scenario.component';


const routes: Routes = [
  { path: '#', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'scenarios', component: ScenarioComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
