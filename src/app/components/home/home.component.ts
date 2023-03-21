import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureResponseModel } from 'src/app/models/picture-response';
import { ApiService } from 'src/app/services/api.service';
import { Orientation } from "@progress/kendo-angular-layout";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{

  public imageSource:string = "";

  public orientation:Orientation = "vertical";
  
  constructor(private apiService:ApiService,  private route: ActivatedRoute,  private router: Router){  

    this.apiService.get<PictureResponseModel>
          (`Pictures`).subscribe(resp => {
              if (resp?.name !== "") {
                this.imageSource = resp.url;
                let targetElement = (<HTMLInputElement>document.getElementById("landingImage"))
                if (targetElement != null) targetElement.src = this.imageSource;
              }
              else {
                console.log(resp);                
                }
              },
                err => {
                console.log(err);
              });

  }
}