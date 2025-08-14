import { Component, OnInit } from '@angular/core';
import { MatIconService } from './shared/mat-icon.service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
 constructor(private matIconService: MatIconService) { }

  ngOnInit(): void {
    console.log('Production mode:', environment.production);
    console.log('API URL:', environment.apiUrl);
    
    this.matIconService.loadMatIcons();
  }
}
