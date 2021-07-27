import { param } from 'jquery';
import { ForcashService } from './../services/forcash.service';

import { takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormForCash } from '@shared/utils/base-form-forcash';
import { BaseFormForcashApprove } from '@shared/utils/base-form-forcash-approve';
import { Subscription } from 'rxjs';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
  APPROVE = 'approve',
}

@Component({
  selector: 'app-form',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements AfterViewInit, OnInit, OnDestroy {

  dtOptions: any;
  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public CustomerData: any = [];
  public YearData: any = [];

  constructor(
    private forcashSvc: ForcashService,
    private router: Router,
    public forcashForm: BaseFormForCash,
    public approveForm: BaseFormForcashApprove,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.approveForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.forcashForm.baseForm.get('role').setValidators(null);
    this.forcashForm.baseForm.get('role').updateValueAndValidity();
    this.GetCustomer();
    this.GetYear();
  }

  onUpdate(): void {

    if (this.approveForm.baseForm.invalid) {
      return;
    }
    const formValue = this.approveForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.forcashSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['warehouse/forecast/list']);
      });
    }
  }

  Approve(): void {

    if (this.approveForm.baseForm.invalid) {
      return;
    }
    const formValue = this.approveForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.forcashSvc.approve(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['warehouse/forecast/list']);
      });
    }
  }

  GetCustomer(): void {
    this.forcashSvc.getCustomer().subscribe(resp => {
      this.CustomerData = resp.data;
      console.log(this.CustomerData);
    });

  }

  GetYear(): void {
    this.forcashSvc.getYear().subscribe(resp => {
      this.YearData = resp.data;
      console.log(this.YearData);
    });



  }
}
