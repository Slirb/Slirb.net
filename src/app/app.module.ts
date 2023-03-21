import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SestrasComponent } from './components/sestras/splash-page/sestras.component';
import { HomeComponent } from './components/home/home.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { ExperienceLandingComponent } from './components/experience/experience-landing/experience-landing.component';
import { ProjectsLandingComponent } from './components/projects/projects-landing/projects-landing.component';
import { TravelLandingComponent } from './components/travel/travel-landing/travel-landing.component';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';







@NgModule({
  declarations: [
    AppComponent,
    SestrasComponent,
    HomeComponent,
    ExperienceLandingComponent,
    ProjectsLandingComponent,
    TravelLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    LayoutModule,
    ButtonsModule,
    FontAwesomeModule,
    NavigationModule,
    HttpClientModule,
    ScrollViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
