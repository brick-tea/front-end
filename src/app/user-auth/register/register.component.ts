import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() toLog = new EventEmitter();
  signUpForm = this.formBuilder.group({
    account: [
      null,
      [Validators.required, Validators.pattern('[46][0-9]{3}[0-9A-Z]{5}')],
    ],
    password: [null, [Validators.required, Validators.minLength(6)]],
    nickname: [null, [Validators.required, Validators.maxLength(30)]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  token: string = '';
  signup() {
    console.log(this.signUpForm.value);
    this.http
      .post<any>(
        'https://192.168.194.45:8080/accounts/signup',
        this.signUpForm.value
      ) // pigtnt
      // .post<any>('http://192.168.194.97:8080/User/login', this.loginForm.value)  // nick
      // .post<any>('http://localhost:3000/signupUsersList', this.loginForm.value) // >json-server --watch db.json
      .subscribe(
        (res) => {
          alert('SIGNIN SUCCESSFUL');
          this.signUpForm.reset();
          this.router.navigate(['/home']);
          this.token = res.token;
          console.log(res);
          console.log('token: ' + res.token);
        },

        (err) => {
          alert('Something went wrong');
          console.log(err);
        }
      );
  }
}
