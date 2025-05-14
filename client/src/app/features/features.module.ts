import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BlogSectionComponent } from './blog-section/blog-section.component';
import { SharedModule } from '../shared/shared.module';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogCardComponent } from './blog-card/blog-card.component';


@NgModule({
  declarations: [
    BlogSectionComponent,
    BlogDetailsComponent,
    BlogCardComponent,   
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    BlogSectionComponent,
    BlogDetailsComponent,  
  ]
})
export class FeaturesModule { }
