import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { matchPasswordValidator } from 'src/app/shared/validators/match-password-validator';
import { strongPasswordValidator } from 'src/app/shared/validators/srong-password-validator';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IServerResponse } from 'src/app/interfaces/serverResponse';

@Component({
  selector: 'app-sing-up-form',
  templateUrl: './sing-up-form.component.html',
  styleUrls: ['./sing-up-form.component.css'],
})
export class SingUpFormComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  errResponseMsg: IServerResponse | null = null;
  isSubmitted = false;
  timer: number | null = null;


  get getPasswordDetails() {
    const control = this.registerForm.get('passGroup')?.get('password');
    const password = control?.value;

    if (!password) {
      return null;
    }

    if (control?.errors?.['passwordDetails']) {
      return control.errors['passwordDetails'];
    }

    if (password && !control?.errors?.['weakPassword']) {
      return {
        hasUpper: true,
        hasLower: true,
        hasNumber: true,
        hasSymbol: true,
        hasMinLength: true,
      };
    }

    return null;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  private initializeRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, emailValidator()]],
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required, strongPasswordValidator()]],
          rePassword: ['', Validators.required],
        },
        { validators: [matchPasswordValidator('password', 'rePassword')] }
      ),
    });
  }

  registerFormHandler(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('passGroup')?.get('password')?.value;

    console.log('Form data:', { name, email, password });


    this.authService.register(name, email, password).subscribe({
      next: (user) => {
        this.authService.user = user;
        this.isSubmitted = true;
        console.log('Registered user', user);
        this.router.navigate(['/auth/profile']);
      },
      error: (err) => {
        this.errResponseMsg = err.error as IServerResponse;
        this.authService.user = null;
        this.isSubmitted = true;

        this.timer = setTimeout(() => {
          this.errResponseMsg = null;
        }, 5000) as unknown as number
      }

    });

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }


}
