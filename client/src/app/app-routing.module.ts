import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroSectionComponent } from './core/hero-section/hero-section.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HeroSectionComponent,
    data: {
      title: 'Home',
      layout: 'default',
      showHeader: true,
      showFooter: true,
    },
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule)

  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: {
      title: 'Page Not Found',
      layout: 'default',
      showHeader: true,
      showFooter: true,
    },
  },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
