import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroSectionComponent } from './core/hero-section/hero-section.component';
import { SingInFormComponent } from './user/sing-in-form/sing-in-form.component';
import { SingUpFormComponent } from './user/sing-up-form/sing-up-form.component';
import { AuthFormsSectionComponent } from './user/auth-forms-section/auth-forms-section.component';
import { BlogSectionComponent } from './features/blog/blog-section/blog-section.component';
import { BlogDetailsComponent } from './features/blog/blog-details/blog-details.component';

const routes: Routes = [
  { path: '', component: HeroSectionComponent },
  { path: 'posts', component: BlogSectionComponent },
  { path: 'posts/:id', component: BlogDetailsComponent },
  {
    path: 'auth',
    component: AuthFormsSectionComponent,
    children: [
      { path: 'login', component: SingInFormComponent },
      { path: 'register', component: SingUpFormComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
