import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() toReg = new EventEmitter<void>();
  loginForm = this.formBuilder.group({
    account: [
      null,
      [Validators.required, Validators.pattern('[46][0-9]{3}[0-9A-Z]{5}')],
    ],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: UserAuthService
  ) {
    if (this.authService.loginStatus() === true) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        alert('SIGNIN SUCCESSFUL');
        this.authService.setToken(res.token);
        this.router.navigate(['/home']);
        console.log(res);
      },

      (err) => {
        console.log(err);
        if (err.status === 0) {
          alert('Server No Response');
        } else if (err.status === 401) {
          alert('Account Not Exist or Wrong Password');
        } else alert('Unknown Error');
      }
    );
  }
}
