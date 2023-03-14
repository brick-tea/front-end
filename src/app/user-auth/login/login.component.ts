import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      account: new FormControl(),
      password: new FormControl(),
    });
  }

  token: string = '';
  login() {
    console.log(this.loginForm.value);
    this.http
      .post<any>(
        'http://192.168.194.45:8080/accounts/login',
        this.loginForm.value
      ) // pigtnt
      // .post<any>('http://192.168.194.97:8080/User/login', this.loginForm.value)  // nick
      // .post<any>('http://localhost:3000/signupUsersList', this.loginForm.value) // >json-server --watch db.json
      .subscribe(
        (res) => {
          alert('SIGNIN SUCCESSFUL');
          this.loginForm.reset();
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
