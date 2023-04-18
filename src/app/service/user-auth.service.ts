/**
 * @file user-auth.service.ts
 * @brief service for authorization
 * 登入登出的驗證與快取處理
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
const AUTH_API = 'https://192.168.194.45:8080/account/';
const TOKEN = 'access_token';
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private user: UserService //
  ) {}

  loginStatus(): boolean {
    /// activate authentication by removing the comment
    console.log('access_token: ' + this.storage.get(TOKEN));
    if (this.storage.get('access_token') === 'null') return true;
    else return true;
  }

  login(loginForm: any): Observable<any> {
    this.user.saveUserAccount(loginForm.account);
    return this.http.post(AUTH_API + 'login', loginForm);
  }

  register(signUpForm: any): Observable<any> {
    this.user.saveUserAccount(signUpForm.account);
    return this.http.post(AUTH_API + 'signup', signUpForm);
  }

  verify(verifyForm: any) {
    return this.http.post(AUTH_API + 'verify', verifyForm);
  }

  logout() {
    // const log: any = this.http.post(AUTH_API + 'logout');
    this.storage.clearAll();
  }

  setToken(token: string) {
    this.storage.set(this.storage.accessToken, token);
  }
}
