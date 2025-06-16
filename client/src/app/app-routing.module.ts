import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroSectionComponent } from './core/hero-section/hero-section.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HeroSectionComponent },
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo:'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
