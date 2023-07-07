import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LoginResponseModel } from 'src/app/models/login-response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild("branson") private bransonView: any;

  public username:string = "";

  public password:string= "";

  constructor(private apiService:ApiService,  private route: ActivatedRoute,  private router: Router, private notificationService: NotificationService){  
  }

  loginClick(){
    this.performLogin();
  }

  private performLogin(){

    if(this.username === ""){
      this.showError("Empty Username");
      return;
    }

    if(this.password === ""){
      this.showError("Empty Password");
      return;
    }
    
    let body =  { username: this.username,
              password: this.password} ;
    this.apiService.post<LoginResponseModel>
      (`System/CheckLogin`, body).subscribe(resp => {
          if (resp != null) {
            if(resp.success)
            {
              this.router.navigate(['/sestras', {context: resp.contextid, name: resp.name}]);
            }
            else{
              this.showError("Invalid Cedentials");
            }            
          }
          else {
            console.log(resp);                
            }
          },
            err => {
            console.log(err);
          });

    
  }

  private showError(errorText:string): void {
    this.notificationService.show({
      content: errorText,
      hideAfter: 700,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 400 },
      type: { style: "error", icon: true },
    });
  }

}
