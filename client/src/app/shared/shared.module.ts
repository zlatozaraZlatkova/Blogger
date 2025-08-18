import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CustomButtonComponent } from './custom-button/custom-button.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { DateTimeAgoPipe } from './pipes/date-time-ago.pipe';
import { SentenceUpperCasePipe } from './pipes/sentence-upper-case.pipe';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TypewriterComponent } from './typewriter/typewriter.component';
import { ListDialogComponent } from './list-dialog/list-dialog.component';





@NgModule({
  declarations: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent,
    DateTimeAgoPipe,
    SentenceUpperCasePipe,
    ErrorNotificationComponent,
    ConfirmDialogComponent,
    PaginationComponent,
    TypewriterComponent,
    ListDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent,
    DateTimeAgoPipe,
    SentenceUpperCasePipe,
    ErrorNotificationComponent,
    PaginationComponent,
    TypewriterComponent,
    ListDialogComponent
    
  ]
})
export class SharedModule { }
