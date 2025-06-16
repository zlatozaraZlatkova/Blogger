import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogSectionComponent } from './blog-section/blog-section.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BlogSectionComponent },
      { path: 'create', component: BlogCreateComponent },
      { path: ':id', component: BlogDetailsComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class BlogRoutingModule {}
