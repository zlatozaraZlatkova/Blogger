import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, take, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { NewsletterService } from './newsletter.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { emailValidator } from '../validators/email-validator';
import { IServerResponse } from 'src/app/interfaces/serverResponse';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css'],
})
export class NewsletterFormComponent implements OnInit, OnDestroy {
  newsletterForm!: FormGroup;
  error: string | null = null;
  successMessage: string | null = null;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private newsletterService: NewsletterService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }

  private showSuccessMessage(): void {
    timer(5000)
      .pipe(take(1))
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
      error: (err) => {
        this.newsletterForm.reset();
      },
    });
  }

  unsubscribeHandler(): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        title: 'Newsletter Unsubscibe',
        message: 'Are you sure you want to remove yourself from the list?',
        confirmButtonText: 'Unsubscribe',
        cancelButtonText: 'Cancel',
        emailInputTag: true,
      },
    });

    const dialogSub = dialogRef.afterClosed().subscribe((modalResponseEmail) => {
      if (modalResponseEmail) {
        this.newsletterService
          .unsubscribeToNewsletter(modalResponseEmail)
          .subscribe({
            next: (response) => {
              this.newsletterForm.reset();
              this.successMessage = response.message;
              this.showSuccessMessage();
            },
          });
      }

    });

    this.subscriptions.add(dialogSub);
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }
}