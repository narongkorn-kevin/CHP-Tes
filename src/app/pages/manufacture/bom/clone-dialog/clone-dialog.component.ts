import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { DialogUnitConvertionComponent } from '@app/shared/dialogs/dialog-unit-convertion/dialog-unit-convertion.component';
import { DialogItemComponent } from '../../../../shared/dialogs/dialog-item/dialog-item.component';
import { BomService } from '../services/bom.service';
import { HelperService } from '../../../../shared/helper.service';
@Component({
  selector: 'app-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.scss']
})
export class CloneDialogComponent implements OnInit {
  bomsForm: FormGroup;
  bomName: string;
  constructor(
    public dialogRef: MatDialogRef<CloneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private bomService: BomService,
    private el: ElementRef,
    private helper: HelperService
  ) {
    this.bomsForm = this.fb.group({
      bom_code: ['', Validators.required],
      bom_name: ['', Validators.required],
      item_id: ['', Validators.required],
      bom_id: ['', Validators.required],
      bom_id_show: [''],
      bom_name2: [''],
      unit_convertion_id: ['', Validators.required],
      unit_convertion_name: [''],
      qty: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.bomsForm.patchValue({
      item_id: this.data.item_id,
      bom_id: this.data.id,
      bom_id_show: this.data.bom_id,
      bom_name2: this.data.bom_name,
      qty: this.data.qty,
      unit_convertion_id: this.data.unit_convertion_id,
      unit_convertion_name: this.data.unit_convertion_name
    });
  }


  onSubmit(form: FormGroup) {
    console.log('this.form.validtor', this.bomsForm.valid);
    let value = form.value;
    if (this.bomsForm.valid) {
      this.bomService.cloneBom(value).subscribe((result: any) => {
        if (result.status === true) {
          this.dialogRef.close(true);
        }
      });
    } else {
      for (const key of Object.keys(this.bomsForm.controls)) {
        if (this.bomsForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
    }
  }

  onClose(): void {
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

      }
    });
  }

  openDialogUnit(): void {
    const dialogRef = this.dialog.open(DialogUnitConvertionComponent, {
      width: '500',
      height: '350',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed ',result);
      if (result) {

      }
    });
  }

}
