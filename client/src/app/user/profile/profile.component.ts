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

  constructor(private authService: AuthService) {
    this.authService.user = {
      _id: '6849a09455cb43caa5a259de',
      name: 'Julia',
      email: 'julia@gmail.com',
      nickname: 'jully',
      bio: 'Software developer with experience in Angular, TypeScript, and Node.js. I enjoy sharing knowledge through blog posts and contributing to open source projects. Passionate about creating clean, efficient code and learning new technologies.',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBA0izleF9YCsNsogegx3939s0bmJr-MLGFg&s'
    };
  }
}
