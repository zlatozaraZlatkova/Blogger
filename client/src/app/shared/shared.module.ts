import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomButtonComponent } from './custom-button/custom-button.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { DateTimeAgoPipe } from './pipes/date-time-ago.pipe';




@NgModule({
  declarations: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent,
    DateTimeAgoPipe

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent,
    DateTimeAgoPipe
    
  ]
})
export class SharedModule { }
