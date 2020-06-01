import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QrCode} from '../_models/qrcode';

interface Interval {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: QrCode) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  intervals: Interval[] = [
    {value: 3600, viewValue: 'Час'},
    {value: 21600, viewValue: '6 Часов'},
    {value: 86400, viewValue: 'Сутки'},
    {value: 604800, viewValue: 'Неделя'},
    {value: 1209600, viewValue: '2 Недели'},
  ];

  doAction(){
    this.local_data.validity = this.local_data.startValidity + this.local_data.interval;
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
