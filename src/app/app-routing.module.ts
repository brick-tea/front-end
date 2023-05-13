//import { WelcomePageComponent } from './layout/welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './user-dashboard/profile/profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OrderManangerComponent } from './user-dashboard/order-mananger/order-mananger.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./user-auth/user-auth.module').then((m) => m.UserAuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'order',
    component: OrderManangerComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, useHash: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
