import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BlogModule } from './blog/blog.module';
import { PublicProfileModule } from './public-profile/public-profile.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    BlogModule,
    PublicProfileModule,
    RouterModule,
   
  ]
})
export class FeaturesModule { }
