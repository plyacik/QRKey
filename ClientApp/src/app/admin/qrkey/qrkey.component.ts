import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-qrkey',
  templateUrl: './qrkey.component.html',
  styleUrls: ['./qrkey.component.css']
})
export class QrkeyComponent implements OnInit {

  constructor(private service: AdminService) { }

  ngOnInit() {
  }


  onGetQrkey() {
    this.service.getNewQrkey().then(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    );
  }
  

}
