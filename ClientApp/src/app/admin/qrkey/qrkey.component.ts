import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qrkey',
  templateUrl: './qrkey.component.html',
  styleUrls: ['./qrkey.component.css']
})
export class QrkeyComponent implements OnInit {

  constructor(private service: AdminService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/qrkey/getqrkey').subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }

  ngOnInit() {
  }


  onGetQrkey() {
    
  }
  

}
