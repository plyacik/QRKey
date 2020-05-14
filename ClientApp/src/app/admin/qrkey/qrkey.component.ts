import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-qrkey',
  templateUrl: './qrkey.component.html',
  styleUrls: ['./qrkey.component.css']
})
export class QrkeyComponent implements OnInit {

  constructor(private service: AdminService) { }

  public myAngularxQrCode: string = null;

  ngOnInit() {
    this.service.getQrkey().then(
      res => {
        this.myAngularxQrCode = res['code'];
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreateQrkey() {
    this.service.createQrkey().then(
      res => {
        this.myAngularxQrCode = res['code'];
      },
      err => {
        console.error(err);
      }
    )
  }
  

}
