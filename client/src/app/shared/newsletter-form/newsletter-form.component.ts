import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from './newsletter.service';
import { emailValidator } from '../validators/email-validator';
import { IServerResponse } from 'src/app/interfaces/serverResponse';
import { Subject, takeUntil, timer } from 'rxjs';


@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css'],
})
export class NewsletterFormComponent implements OnInit, OnDestroy {
  newsletterForm!: FormGroup;
  error: string | null = null;
  successMessage: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private newsletterService: NewsletterService
  ) { }

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }

  private showSuccessMessage(): void {
    timer(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.successMessage = null;
      });
  }

  subscribeHandler(): void {
    if (this.newsletterForm.invalid) {
      return;
    }

    const email = this.newsletterForm.get('email')?.value;

    this.newsletterService.subscribeToNewsletter(email!).subscribe({
      next: (response: IServerResponse) => {
        this.newsletterForm.reset();
        this.successMessage = response.message;
        this.showSuccessMessage();
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
        this.newsletterForm.reset();
        this.successMessage = response.message;
        this.showSuccessMessage();
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }
}