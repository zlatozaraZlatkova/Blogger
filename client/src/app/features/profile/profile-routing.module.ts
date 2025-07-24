import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from 'src/app/core/guards/auth.guard';
import { authResolver } from 'src/app/core/resolvers/auth.resolver';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { PublicProfileDetailsComponent } from './public-profile-details/public-profile-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserProfileComponent,
        canActivate: [authGuard],
        resolve: { user: authResolver },
        data: {
          title: "User's Profile",
          layout: 'default',
          showHeader: true,
          showFooter: true,
        },
      },
      {
        path: 'public/:id',
        component: PublicProfileDetailsComponent,
        canActivate: [authGuard],
        data: {
          title: "Profile Card",
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
export class ProfileRoutingModule {}
