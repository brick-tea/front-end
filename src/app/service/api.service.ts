/**
 * @description This Service is responsible for generating http headers
 */

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

// https://angular.io/guide/http-send-data-to-server

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
  getHeader(resType: any) {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.storage.get(this.storage.accessToken),
      }),
      responseType: resType, // responseType?: "arraybuffer" | "blob" | "text" | "json"
    };
    return httpOptions;
  }
}

// angular bug https://www.cnblogs.com/wangtingnoblog/p/10322483.html
export namespace ResponseType {
  export const Json = 'json' as 'json';
  export const Text = 'text' as 'text';
  export const Blob = 'blob' as 'blob';
  export const Arraybuffer = 'arraybuffer' as 'arraybuffer';
}
