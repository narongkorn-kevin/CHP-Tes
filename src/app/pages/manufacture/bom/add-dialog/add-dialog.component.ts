import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { DialogUnitConvertionComponent } from '@app/shared/dialogs/dialog-unit-convertion/dialog-unit-convertion.component';
import { DialogItemComponent } from '../../../../shared/dialogs/dialog-item/dialog-item.component';
import { BomService } from '../services/bom.service';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  bomLineForm: FormGroup;
  bomName: string;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private bomService: BomService,
  ) {
    this.bomLineForm = this.fb.group({
      seq: [''],
      bom_id: [''],
      item_id: [''],
      name: [''],
      name2: [''],
      unit_convertion_id: [''],
      unit: [''],
      qty: [''],
      master_item_id: [''],
      bom_line_origin_id:['']
    });
  }

  ngOnInit(): void {
  //  console.log('this.data ', this.data);
    this.bomName = this.data.bom_id;
    let seq;
    let bom_line_origin_id;
    let bom_id;
    /// ตรวจสอบ seq ถ้าไม่มี ให้เซ็ตเป็น 1
    if (this.data.seq) {
      seq = this.data.seq+1;
      bom_id = this.data.bom_id;
      bom_line_origin_id = this.data.id;
    } else {
      bom_id = this.data.id;
      bom_line_origin_id = null;
      seq = 1;
    }
    this.bomLineForm.patchValue({
      master_item_id: this.data.item_id,
      name: this.data.item.item_id,
      bom_id: bom_id,
      seq: seq,
      bom_line_origin_id:bom_line_origin_id,
      unit: this.data.unit_convertion.name
    });
  }


  onSubmit(form: FormGroup) {
    let value = form.value;
    delete value.name2;
    delete value.name;
    delete value.unit;
    this.bomService.addByLine(value).subscribe((result: any) => {
      if (result.status === true) {
        this.dialogRef.close(true);
      }
    });
  }

  onclose(): void {
    this.dialogRef.close(false);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogItemComponent, {
      width: '500',
      height: '350',
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
      if (result) {
        this.bomLineForm.patchValue({
          item_id: result.id,
          name2: result.item_id,
          unit_convertion_id: result.unit_store.id,
          unit: result.unit_store.name
        });
      }
    });
  }

  openDialogUnit():void{
    const dialogRef = this.dialog.open(DialogUnitConvertionComponent, {
      width: '500',
      height: '350',
    });

    dialogRef.afterClosed().subscribe(result => {
    // console.log('The dialog was closed ',result);
      if (result) {
        this.bomLineForm.patchValue({
          unit_convertion_id: result.id,
          unit: result.name
        });
      }
    });
  }

}
