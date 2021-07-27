
import { takeUntil } from 'rxjs/operators';
import { DepositService } from './../services/deposit.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormDeposit } from '@shared/utils/base-form-deposit';
import { BaseFormDepositApprove } from '@shared/utils/base-form-deposit-approve';
import { Subscription } from 'rxjs';
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
  public ItemData: any = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private depositSvc: DepositService,
    private router: Router,
    public depositForm: BaseFormDeposit,
    public activatedRoute: ActivatedRoute,
    public approveForm: BaseFormDepositApprove
  ) {
    // console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    // this.approveForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  // ngOnInit(): void {
  //   this.depositForm.baseForm.get('role').setValidators(null);
  //   this.depositForm.baseForm.get('role').updateValueAndValidity();

  // }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.getReportById(id);
    });
  }

  getReportById(id): void {
    this.depositSvc.getReportById(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log('my data',this.ItemData);
      this.approveForm.baseForm.patchValue({ id: this.ItemData.id});
      this.approveForm.baseForm.patchValue({ report_id: this.ItemData.report_id});
      this.approveForm.baseForm.patchValue({ status: this.ItemData.status});
      this.approveForm.baseForm.patchValue({ reason: this.ItemData.reason});
      console.log('my data 2', this.approveForm.baseForm);
    });
  }

  // GetApprove(id: String): void {
  //   this.depositSvc.getApprove(id).subscribe(resp => {
  //     this.ItemData = resp.data;
  //    this.depositForm.baseForm.patchValue(this.ItemData);
  //   });
  // }



  onUpdate(): void {

    if (this.approveForm.baseForm.invalid) {
      return;
    }
    const formValue = this.approveForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.depositSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['warehouse/deposit/list']);
      });
    }
  }
}
