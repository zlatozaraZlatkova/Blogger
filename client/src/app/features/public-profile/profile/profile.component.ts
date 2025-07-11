import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../user/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  get user() {
    return this.authService.user;
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const resolvedUser = this.route.snapshot.data['user'];
  }

}
