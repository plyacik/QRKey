import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { QrCode, QrCodeResponce} from '../_models/qrcode';

@Component({
  selector: 'app-invite-qkkey',
  templateUrl: './invite-qkkey.component.html',
  styleUrls: ['./invite-qkkey.component.css']
})
export class InviteQkkeyComponent implements OnInit {

  getData: QrCode[];
  dataSource: MatTableDataSource<QrCode>;
  displayedColumns: string[] = ['code', 'validity', 'created', 'client_Name', 'client_Phone'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: AdminService) {
      this.dataSource = new MatTableDataSource(this.getData);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
  }

  ngOnInit() {
    this.service.getQrList().then(res => {
      this.getData = res;
      this.dataSource.sort = this.sort;
    });
  }

}
