import { BaseFormAdjustApprove } from './../../../../shared/utils/base-form-adjust-approve';

import { BaseFormAdjust } from '@shared/utils/base-form-adjust';

import { ConfirmDialogComponent } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component'
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdjustService } from '../service/adjust.service';
import {MatDialog} from '@angular/material/dialog';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements AfterViewInit, OnInit, OnDestroy {


  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  constructor(
    private adjustSvc: AdjustService,
    private router: Router,
    public adjustForm: BaseFormAdjust,
    public activatedRoute: ActivatedRoute,
    public addjustapproveForm: BaseFormAdjustApprove,
    private dialog : MatDialog,

  ) {
    // console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    // this.addjustapproveForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  // ngOnInit(): void {
  //   this.adjustForm.baseForm.get('role').setValidators(null);
  //   this.adjustForm.baseForm.get('role').updateValueAndValidity();
  // }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.getReportById(id);
    });
  }

  getReportById(id): void {
    this.adjustSvc.getReportById(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log('my data',this.ItemData);
      this.addjustapproveForm.baseForm.patchValue({ id: this.ItemData.id});
      this.addjustapproveForm.baseForm.patchValue({ report_id: this.ItemData.report_id});
      this.addjustapproveForm.baseForm.patchValue({ status: this.ItemData.status});
      this.addjustapproveForm.baseForm.patchValue({ reason: this.ItemData.reason});
      console.log('my data 2', this.addjustapproveForm.baseForm);
    });


  }
  onUpdate(): void {

    if (this.addjustapproveForm.baseForm.invalid) {
      return;
    }
    const formValue = this.addjustapproveForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.adjustSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['warehouse/adjust/list']);
      });
    }
  }
    //เปิด Dialog
    openDialog() {
      const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        width: '500px',
        data: {title: 'CONFIRM DIALOG', message: 'ARE YOU SURE ?'}
      });
  
      // ปิด Dialog พร้อมรับค่า result
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result){
          this.onUpdate();
        }
      });
    }
}
