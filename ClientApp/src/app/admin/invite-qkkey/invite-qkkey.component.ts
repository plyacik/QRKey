import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';

export interface QrCode {
  code: string;
  validity: number;
  created: number;
  client_Name: string;
  client_Phone: string;
}

@Component({
  selector: 'app-invite-qkkey',
  templateUrl: './invite-qkkey.component.html',
  styleUrls: ['./invite-qkkey.component.css']
})
export class InviteQkkeyComponent implements OnInit {

  displayedColumns: string[] = ['code', 'validity', 'created', 'client_Name', 'client_Phone'];
  getData: QrCode[];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.service.getQrList().then(
      res => { 
        this.getData = res as QrCode[];
        this.dataSource = new MatTableDataSource(this.getData);
      }
    )
    this.dataSource.sort = this.sort;
  }

}
