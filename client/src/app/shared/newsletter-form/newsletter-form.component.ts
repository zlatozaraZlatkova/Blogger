import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewsletterService } from './newsletter.service';
import { emailValidator } from '../validators/email-validator';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css']
})
export class NewsletterFormComponent {
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private newsletterService: NewsletterService
  ) { }

  newsletterForm = this.fb.group({
    email: ['', [Validators.required, emailValidator()]]
  })

  subscribeHandler(): void {
    if (this.newsletterForm.invalid) {
      return;
    }

    const email = this.newsletterForm.get('email')?.value;

    this.newsletterService.subscribeToNewsletter(email!).subscribe({
      next: (response) => {
        this.error = null;
        this.successMessage = response.message || 'Successfully subscribed!';

        this.newsletterForm.reset();
      },
      error: (err) => {
        this.error = 'Error loading posts: ' + (err.message);
      }
    })

  }

  unsubscribeHandler(): void {
    if (this.newsletterForm.invalid) {
      return;
    }

    const email = this.newsletterForm.get('email')?.value;

    this.newsletterService.unsubscribeToNewsletter(email!).subscribe({
      next: (response) => {
        this.error = null;
        this.successMessage = response.message || 'Successfully unsubscribed!';
        this.newsletterForm.reset();
      },
      error: (err) => {
        this.error = 'Error loading posts: ' + (err.message);
      }
    })

  }
}
