/**
 * @brief service to store persional information
 * @function
 */

import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

const USER_API = 'https://thebrickteam.com/user/';

// https://angular.io/guide/http-send-data-to-server

const userAccount: string = 'user_account'; // variable to get/store user id
const userName: string = 'user_nickname'; // variable to get/store user nickname
const userMajor: string = 'user_major'; // variable to get/store user major
const userGrade: string = 'user_grade'; // variable to get/store user grade

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  profile: any = {};

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private api: ApiService
  ) {}

  /**
   * @ngdoc method
   * @name ngOnInit
   * @description load jwt token from local storage(if have)
   */
  ngOnInit() {
    this.api.getHeader('json');
    this.getUserInfo();
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http
      .get<UserInfo>(USER_API + 'profile', this.api.getHeader('json'))
      .pipe(
        tap((res) => {
          this.saveUserAccount(res.account);
          this.saveUserName(res.nickname);
          this.saveUserMajor(res.major);
        })
      );
  }
  uploadUserInfo(profile: UserUpdate): Observable<UserInfo> {
    return this.http
      .patch<UserInfo>(
        USER_API + 'profile',
        profile,
        this.api.getHeader('json')
      )
      .pipe(
        tap((res) => {
          this.saveUserAccount(res.account);
          this.saveUserName(res.nickname);
          this.saveUserMajor(res.major);
        })
      );
  }

  /* store data catch */

  saveUserAccount(account: string) {
    this.storage.set(userAccount, account);
  }

  private saveUserName(name: string) {
    this.storage.set(userName, name);
  }

  private saveUserMajor(major: string) {
    this.storage.set(userMajor, major);
  }

  private saveUserGrade(grade: string) {
    this.storage.set(userGrade, grade);
  }

  /* get data catch */

  catchUserAccount() {
    return this.storage.get(userAccount);
  }

  catchUserName(): string {
    return this.storage.get(userName);
  }

  catchUserMajor(): string {
    return this.storage.get(userMajor);
  }

  catchUserGrade(): string {
    return this.storage.get(userGrade);
  }

  // user information API
}
export interface UserInfo {
  account: string;
  email: string;
  nickname: string;
  major: string;
  grade: 0;
  createdAt: string;
}
export interface UserUpdate {
  nickname: string;
  major: string;
  grade: 0;
}
