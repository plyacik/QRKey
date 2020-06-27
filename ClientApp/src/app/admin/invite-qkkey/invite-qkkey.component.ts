import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { QrCode } from '../_models/qrcode';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-invite-qkkey',
  templateUrl: './invite-qkkey.component.html',
  styleUrls: ['./invite-qkkey.component.css']
})
export class InviteQkkeyComponent implements OnInit {

  qrList: QrCode[] = [];
  dataSource = new MatTableDataSource(this.qrList);
  displayedColumns: string[] = ['created', 'client_Name', 'client_Phone', 'startValidity', 'validity', 'action'];
  selection = new SelectionModel<QrCode>(true, []);
  timenow: number = Math.trunc(new Date().getTime() / 1000);

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.service.getQrList().then(
      res => { 
        this.qrList = res;
        this.initTable()
      }
    );
  }

  initTable() {
    this.timenow = Math.trunc(new Date().getTime() / 1000);
    this.dataSource = new MatTableDataSource(this.qrList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.qrList = result;
      this.initTable();
    });
  }

  sendQr(element: QrCode){
    
  }

  resetQr(element: QrCode){
    let timestamp = Math.trunc(new Date().getTime() / 1000);
    if (element.validity >= timestamp ) {
      this.service.resetGuestQr(element.id).then(
        res => {
          this.qrList = res;
          this.initTable()
        });
    }
  }

}
