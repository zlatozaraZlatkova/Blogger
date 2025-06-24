import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';

@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.css'],
})
export class SingInFormComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;


  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }


  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.authService.user = {
      _id: '6849a09455cb43caa5a259de',
      name: 'Julia',
      email: 'julia@gmail.com',
      nickname: 'jully',
      bio: 'Software developer with experience in Angular, TypeScript, and Node.js. I enjoy sharing knowledge through blog posts and contributing to open source projects. Passionate about creating clean, efficient code and learning new technologies.',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBA0izleF9YCsNsogegx3939s0bmJr-MLGFg&s',
    };

  }
  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }



  loginFormHandler(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log("emial:", email, "password:", password)
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
