import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QrCode} from '../_models/qrcode';
import { AdminService } from '../admin.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MinDateValidator } from '../../shared/mindate.validator';
import { MaxDateValidator } from '../../shared/maxdate.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Interval {
  value: number;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  public phone_mask = ['+', '3', '8', '(', '0', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  addForm : FormGroup = new FormGroup({         
    "client_Name": new FormControl("", [Validators.required]),
    "client_Phone": new FormControl("", [Validators.required]),
    "startValidity": new FormControl(new Date(),[
      Validators.required, 
      MinDateValidator.cannotLessNow,
      MaxDateValidator.cannotMore7Days
    ]),
    "interval": new FormControl(86400, [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  send_data: QrCode = {
    startValidity: 1,
    validity: 1,
    client_Name: '',
    client_Phone: '',
    code: null,
    created: null,
    interval: null
  };

  constructor(
    private service: AdminService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogBoxComponent>) {}

  intervals: Interval[] = [
    {value: 3600, viewValue: 'Час'},
    {value: 21600, viewValue: '6 Часов'},
    {value: 86400, viewValue: 'Сутки'},
    {value: 604800, viewValue: 'Неделя'},
    {value: 1209600, viewValue: '2 Недели'},
  ];

  doAction(){
    console.log('start_cre');
    let timestamp = Math.trunc(this.addForm.get('startValidity').value.getTime() / 1000);
    this.send_data.startValidity = timestamp;
    this.send_data.validity = timestamp + this.addForm.get('interval').value;
    this.send_data.client_Name = this.addForm.get('client_Name').value;
    this.send_data.client_Phone = this.addForm.get('client_Phone').value;
    
    this.service.addGuestQr(this.send_data).then(
      res => { this.dialogRef.close(); },
      err => {
        this._snackBar.open(err.error, 'Закрыть', {
          duration: 2000,
        });
      });    
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
