import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { ScenarioCardComponent } from './scenario-card/scenario-card.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SafeHtmlPipe,
    ScenarioComponent,
    ScenarioCardComponent
  ],
  imports: [AppRoutingModule,
            BrowserModule,
            CommonModule
  ],
  providers: [SafeHtmlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
