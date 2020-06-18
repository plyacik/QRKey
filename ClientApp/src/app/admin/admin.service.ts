import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { QrCode} from './_models/qrcode';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getQrkey() {
    return this.http.get(this.baseUrl + 'api/qrkey').toPromise();
  }

  createQrkey() {
    return this.http.post(this.baseUrl + 'api/qrkey', {}).toPromise();
  }

  getQrList() {
    return this.http.get<QrCode[]>(this.baseUrl + 'api/qrkey/getqrlist').toPromise();
  }

  addGuestQr(guestQr: QrCode) {
    return this.http.post(this.baseUrl + 'api/qrkey/addguestqr', guestQr).toPromise();
  }
}
