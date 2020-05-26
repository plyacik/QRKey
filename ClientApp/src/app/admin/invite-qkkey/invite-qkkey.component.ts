import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { QrCode} from '../_models/qrcode';

@Component({
  selector: 'app-invite-qkkey',
  templateUrl: './invite-qkkey.component.html',
  styleUrls: ['./invite-qkkey.component.css']
})
export class InviteQkkeyComponent implements OnInit {

  qrList: QrCode[] = [];
  dataSource = new MatTableDataSource(this.qrList);
  displayedColumns: string[] = ['code', 'validity', 'created', 'client_Name', 'client_Phone'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: AdminService) {}

  ngOnInit() {
    this.service.getQrList().then(
      res => { 
        this.qrList = res;
        this.dataSource = new MatTableDataSource(this.qrList);
        this.dataSource.sort = this.sort;
      }
    );
  }

}
