import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HeaderComponent } from './header/header.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';



@NgModule({
  declarations: [
    HeroSectionComponent,
    HeaderComponent,
    CustomButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, 
  ],
  exports: [
    HeaderComponent,
    HeroSectionComponent,
    CustomButtonComponent
  ]
})
export class SharedModule { }
