import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { QrCode} from '../_models/qrcode';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-invite-qkkey',
  templateUrl: './invite-qkkey.component.html',
  styleUrls: ['./invite-qkkey.component.css']
})
export class InviteQkkeyComponent implements OnInit {

  qrList: QrCode[] = [];
  dataSource = new MatTableDataSource(this.qrList);
  displayedColumns: string[] = ['select', 'code', 'validity', 'created', 'client_Name', 'client_Phone'];
  selection = new SelectionModel<QrCode>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: AdminService) {}

  ngOnInit() {
    this.service.getQrList().then(
      res => { 
        this.qrList = res;
        this.dataSource = new MatTableDataSource(this.qrList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: QrCode): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.code + 1}`;
  }

}
