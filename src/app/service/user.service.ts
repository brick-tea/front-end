/**
 * @brief service to store persional information
 * @function
 */

import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';

const USER_API = 'https://192.168.194.45:8080/user/';

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

  private getUserInfo() {
    this.http.get(USER_API + 'profile' + this.api.getHeader('json')).subscribe(
      (res) => {
        console.log(res);
        this.profile = res;
        this.saveUserAccount(this.profile['account']);
        this.saveUserName(this.profile['nickname']);
        this.saveUserMajor(this.profile['major']);
        this.saveUserGrade(this.profile['grade'] as string); // api response number
        // createAt
      },
      (err) => {
        console.log(err);
        alert('Error loading profile');
      }
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
