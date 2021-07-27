import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  config:any 
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  config={
    title:'CONFIRM',
    message:'ARE YOU SURE ?',
    button:{
      confirm:'CONFIRM',
      cancel:'CANCEL'
    }
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    
    if(this.data.title) this.config.title = this.data.title
    if(this.data.message) this.config.message = this.data.message
    if(this.data.button){
      if(this.data.button.cancel) this.config.button.cancel = this.data.button.cancel
      if(this.data.button.confirm) this.config.button.confirm = this.data.button.confirm
    }
  }


  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
