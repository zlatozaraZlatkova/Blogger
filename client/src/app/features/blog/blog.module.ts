import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { GoogleDriveUploadComponent } from './google-drive-upload/google-drive-upload.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentCreateComponent } from './comment-create/comment-create.component';


@NgModule({
  declarations: [
    BlogCardComponent,
    BlogDetailsComponent,
    BlogSectionComponent,
    BlogCreateComponent,
    GoogleDriveUploadComponent,
    BlogEditComponent,
    CommentListComponent, 
    CommentCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule,
    ReactiveFormsModule,
    BlogRoutingModule,
    MatIconModule
  ]
})
export class BlogModule { }
