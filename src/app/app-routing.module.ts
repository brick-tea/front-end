//import { WelcomePageComponent } from './layout/welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: UserAuthComponent,
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  /*{
    path: '**',
    redirectTo: 'AppComponent',
    pathMatch: 'full',
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, useHash: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
