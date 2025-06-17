import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogSectionComponent } from './blog-section/blog-section.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { GuestGuard } from 'src/app/shared/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BlogSectionComponent,
        canActivate: [GuestGuard],
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
        canActivate: [AuthGuard],
        data: {
          title: 'Create Post', 
          layout: 'default',
          showHeader: true,
          showFooter: true,
        },
      },
      {
        path: ':id',
        component: BlogDetailsComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Post Details', 
          layout: 'default',
          showHeader: true,
          showFooter: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }
