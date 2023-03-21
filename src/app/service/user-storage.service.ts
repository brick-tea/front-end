import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}
  isLogin(): Boolean {
    if (localStorage.getItem('access_token')) return true;
    return false;
  }
}
