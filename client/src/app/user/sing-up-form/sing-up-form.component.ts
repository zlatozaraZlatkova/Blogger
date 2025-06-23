import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { matchPasswordValidator } from 'src/app/shared/validators/match-password-validator';
import { strongPasswordValidator } from 'src/app/shared/validators/srong-password-validator';

@Component({
  selector: 'app-sing-up-form',
  templateUrl: './sing-up-form.component.html',
  styleUrls: ['./sing-up-form.component.css'],
})
export class SingUpFormComponent implements OnInit {
  registerForm!: FormGroup;

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  private initializeRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
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
  }
}
