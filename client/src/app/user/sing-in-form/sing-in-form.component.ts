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
 
  isSubmitted = false;
  timer: number | null = null;


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
        this.isSubmitted = true;
        console.log('Logged in user', user);
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.isSubmitted = true;

      }
    });

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
