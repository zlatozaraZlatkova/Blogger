import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    BlogRoutingModule
  ]
})
export class BlogModule { }
