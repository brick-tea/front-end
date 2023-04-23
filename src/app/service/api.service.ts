/**
 * @description This Service is responsible for generating http headers
 */

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

const API = 'https://192.168.194.45:8080/';

// https://angular.io/guide/http-send-data-to-server
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private storage: StorageService) {}

  /**
   * @description
   * to generate a header for specific content type
   * @param contentType, can be 'json' or 'text'
   * @returns httpHeader
   */
  getHeader(contentType: string | null) {
    httpOptions.headers.set(
      'Authorization',
      this.storage.get(this.storage.accessToken)
    );
    if (contentType === 'json') {
      httpOptions.headers.set('Content-Type', 'application/json');
      return httpOptions;
    } else if (contentType === 'text') {
      httpOptions.headers.set('Content-Type', 'text/plain');
      return httpOptions;
    } else return httpOptions;
  }
}
