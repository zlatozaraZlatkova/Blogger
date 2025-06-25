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
  ) { }

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


    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.authService.user = user;
        console.log('Logged in user', user);
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        this.authService.user = null;
        this.router.navigate(['/']);
      }
    });

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
