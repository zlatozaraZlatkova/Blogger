import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomButtonComponent } from './custom-button/custom-button.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EyeIconComponent } from './eye-icon/eye-icon.component';



@NgModule({
  declarations: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomButtonComponent,
    NewsletterFormComponent,
    EyeIconComponent
  ]
})
export class SharedModule { }
