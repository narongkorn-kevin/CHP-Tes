import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  config:any 
}


@Component({
  selector: 'app-treeview-dialog',
  templateUrl: './treeview-dialog.component.html',
  styleUrls: ['./treeview-dialog.component.scss']
})
export class TreeviewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TreeviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
