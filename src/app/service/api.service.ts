/**
 * @description This Service is responsible for generating http headers
 */

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

// https://angular.io/guide/http-send-data-to-server
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': '', // request body's data type
    Authorization: '',
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
  getHeader(contentType: string) {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + this.storage.get(this.storage.accessToken)
    );
    if (contentType === 'json') {
      httpOptions.headers = httpOptions.headers.set(
        'Content-Type',
        'application/json'
      );
      return httpOptions;
    } else if (contentType === 'text') {
      httpOptions.headers = httpOptions.headers.set(
        'Content-Type',
        'text/plain'
      );
      return httpOptions;
    }
    return httpOptions;
  }
}
