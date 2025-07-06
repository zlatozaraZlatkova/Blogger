import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogSectionComponent } from './blog-section/blog-section.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { BlogEditComponent } from './blog-edit/blog-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BlogSectionComponent,
        data: {
          title: 'Blog Posts',
          layout: 'default',
          showHeader: true,
          showFooter: true,
        },
      },
      {
        path: 'create',
        component: BlogCreateComponent,
        canActivate: [authGuard],
        data: {
          title: 'Create Post',
          layout: 'default',
          showHeader: true,
          showFooter: true,
        },
      },
      {
        path: 'update/:id',
        component: BlogEditComponent,
        canActivate: [authGuard],
        data: {
          title: 'Post Edit',
          layout: 'default',
          showHeader: true,
          showFooter: true,
        },
      },
      {
        path: ':id',
        component: BlogDetailsComponent,
        data: {
          title: 'Post Details',
          layout: 'default',
          showHeader: true,
          showFooter: true,
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }
