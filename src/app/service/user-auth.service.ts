// for auth module

import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://192.168.194.45:8080/accounts/';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  loginStatus(): boolean {
    if (this.storageService.get('access_token') === null) return false;
    else return true;
  }

  login(loginForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', loginForm);
  }

  setToken(token: string) {
    this.storageService.set('access_token', token);
  }

  register(signUpForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', signUpForm);
  }

  logout() {
    // const log: any = this.http.post(AUTH_API + 'logout');
    this.storageService.clearAll();
  }
}
