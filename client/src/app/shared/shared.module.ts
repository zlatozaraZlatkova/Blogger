import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    HeroSectionComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    HeroSectionComponent
  ]
})
export class SharedModule { }
