/// for services to store data

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  accessToken: string = 'access_token'; // variable to get/store access token

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    const value = localStorage.getItem(key);
    if (value) return value;
    else return 'null';
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
