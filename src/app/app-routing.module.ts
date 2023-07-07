import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceLandingComponent } from './components/experience/experience-landing/experience-landing.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsLandingComponent } from './components/projects/projects-landing/projects-landing.component';
import { LoginComponent } from './components/sestras/login/login.component';
import { SestrasComponent } from './components/sestras/splash-page/sestras.component';
import { TravelLandingComponent } from './components/travel/travel-landing/travel-landing.component';


const routes: Routes = [
  { path: 'sestras', title: 'Sestras in Seattle', component: SestrasComponent },
  { path: '', title: 'Slirb', component: HomeComponent },
  { path: 'experience', title: 'Experience', component: ExperienceLandingComponent },
  { path: 'projects', title: 'Projects', component: ProjectsLandingComponent },
  { path: 'travel', title: 'Travel', component: TravelLandingComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
