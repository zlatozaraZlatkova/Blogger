import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  get user() {
    return this.authService.user;
  }

  constructor(private authService: AuthService) { }
}
