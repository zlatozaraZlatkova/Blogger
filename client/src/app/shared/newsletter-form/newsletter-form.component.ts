import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from './newsletter.service';
import { emailValidator } from '../validators/email-validator';
import { HttpErrorResponse } from '@angular/common/http';

interface IServerResponse {
  message: string;
}

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css'],
})
export class NewsletterFormComponent implements OnInit, OnDestroy {
  newsletterForm!: FormGroup;
  error: string | null = null;
  successMessage: string | null = null;
  messageTimeout: number | undefined;

  constructor(
    private fb: FormBuilder,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }

  showMessage(isSuccess: boolean, message: string): void {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    if (isSuccess) {
      this.successMessage = message;
      this.error = null;
    } else {
      this.error = message;
      this.successMessage = null;
    }

    setTimeout(() => {
      this.successMessage = null;
      this.error = null;
      this.messageTimeout = undefined;
    }, 2000) as unknown as number;
  }

  subscribeHandler(): void {
    if (this.newsletterForm.invalid) {
      return;
    }

    const email = this.newsletterForm.get('email')?.value;

    this.newsletterService.subscribeToNewsletter(email!).subscribe({
      next: (response: IServerResponse) => {
        this.showMessage(true, response.message || 'Successfully subscribed!');

        this.newsletterForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        const errorResponse = err.error as IServerResponse;
        this.showMessage(false, errorResponse.message);
      },
    });
  }

  unsubscribeHandler(): void {
    if (this.newsletterForm.invalid) {
      return;
    }

    const email = this.newsletterForm.get('email')?.value;

    this.newsletterService.unsubscribeToNewsletter(email!).subscribe({
      next: (response) => {
        this.showMessage(
          true,
          response.message || 'Successfully unsubscribed!'
        );
        this.newsletterForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        const errorResponse = err.error as IServerResponse;
        this.showMessage(false, errorResponse.message);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }
}
