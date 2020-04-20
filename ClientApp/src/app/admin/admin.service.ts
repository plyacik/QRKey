import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  readonly BaseURI = 'http://localhost:50741/admin';

  getNewQrkey() {
    return this.http.get(this.BaseURI + '/QRKey/GetQrkey').toPromise();
  }
}
