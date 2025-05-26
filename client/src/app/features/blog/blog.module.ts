import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BlogCreateComponent } from './blog-create/blog-create.component';


@NgModule({
  declarations: [
    BlogCardComponent,
    BlogDetailsComponent,
    BlogSectionComponent,
    BlogCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule
  ]
})
export class BlogModule { }
