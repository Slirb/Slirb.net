import { Component } from '@angular/core';
import { Orientation } from '@progress/kendo-angular-layout';
import { MobileHelper } from 'src/app/helpers/mobile.helper';

@Component({
  selector: 'app-projects-landing',
  templateUrl: './projects-landing.component.html',
  styleUrls: ['./projects-landing.component.scss']
})
export class ProjectsLandingComponent {

  public orientation:Orientation = MobileHelper.mobileCheck() ? "vertical" : "horizontal";

  goToLink(url: string){
    window.open(url, "_blank");
  }

}
