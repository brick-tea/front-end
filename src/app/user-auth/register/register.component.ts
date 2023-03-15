import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public signUpForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      account: new FormControl(),
      password: new FormControl(),
    });
  }

  token: string = '';
  login() {
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
