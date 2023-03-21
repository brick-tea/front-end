import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://192.168.194.45:8080/accounts/';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}

  login(loginForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', loginForm);
  }

  register(signUpForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', signUpForm);
  }
}
