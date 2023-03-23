import { Component } from '@angular/core';
import { Orientation } from '@progress/kendo-angular-layout';
import { MobileHelper } from 'src/app/helpers/mobile.helper';

@Component({
  selector: 'app-experience-landing',
  templateUrl: './experience-landing.component.html',
  styleUrls: ['./experience-landing.component.scss']
})
export class ExperienceLandingComponent {

  public orientation:Orientation = "vertical";
}
