import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
@NgModule({
  declarations: [UserAuthComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MdbFormsModule,
  ],
})
export class UserAuthModule {}
