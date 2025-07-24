import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { authResolver } from 'src/app/core/resolvers/auth.resolver';
import { ProfileCardComponent } from './profile-card/profile-card.component';

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
        component: ProfileCardComponent,
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
