import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getNewQrkey() {
    return this.http.get(this.baseUrl + 'api/qrkey').toPromise();
  }
}
