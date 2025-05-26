import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BlogModule } from './blog/blog.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    BlogModule,
    RouterModule,
   
  ]
})
export class FeaturesModule { }
