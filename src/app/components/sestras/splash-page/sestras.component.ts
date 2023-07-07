import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sestras',
  templateUrl: './sestras.component.html',
  styleUrls: ['./sestras.component.scss']
})
export class SestrasComponent implements OnInit {

  public username:string = "";

  constructor(private apiService:ApiService,  private route: ActivatedRoute,  private router: Router, private notificationService: NotificationService){  
  } 
  
  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('name') ?? "";
  }

}
