import { Component } from '@angular/core';
import { faBars, faHeart} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slirb.net';

  public today:Date = new Date();

  public faBars = faBars;

  public faHeart = faHeart;

  constructor(private apiService:ApiService){

  }
}
