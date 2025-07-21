import { Component, OnInit } from '@angular/core';
import { MatIconService } from './shared/mat-icon.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
 constructor(private matIconService: MatIconService) { }

  ngOnInit(): void {
    this.matIconService.loadMatIcons();
  }
}
