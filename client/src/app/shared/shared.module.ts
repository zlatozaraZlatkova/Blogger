import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HeaderComponent } from './header/header.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';



@NgModule({
  declarations: [
    HeroSectionComponent,
    HeaderComponent,
    CustomButtonComponent,
    FooterComponent,
    NewsletterFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
  ],
  exports: [
    HeaderComponent,
    HeroSectionComponent,
    CustomButtonComponent,
    FooterComponent,
    NewsletterFormComponent
  ]
})
export class SharedModule { }
