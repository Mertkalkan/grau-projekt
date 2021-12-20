import { Component } from '@angular/core';
import { ApiService } from './services/http/api.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private apiService: ApiService) { }

  s(){
    this.apiService.getLocations().subscribe((data)=> {
      console.log(data)
    });
  }

  }

  


