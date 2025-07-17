import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomButtonComponent } from './custom-button/custom-button.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { DateTimeAgoPipe } from './pipes/date-time-ago.pipe';
import { SentenceUpperCasePipe } from './pipes/sentence-upper-case.pipe';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent,
    DateTimeAgoPipe,
    SentenceUpperCasePipe,
    ErrorNotificationComponent,
    ConfirmDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent,
    DateTimeAgoPipe,
    SentenceUpperCasePipe,
    ErrorNotificationComponent
    
  ]
})
export class SharedModule { }
