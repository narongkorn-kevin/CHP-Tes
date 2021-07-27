import { BaseFormForCash } from '@shared/utils/base-form-forcash';
import { ForcashService } from './../services/forcash.service';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public CustomerData: any = [];
  public YearData: any = [];

  constructor(

    private forcashSvc: ForcashService,
    private router: Router,
    public forcashForm: BaseFormForCash
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.forcashForm.baseForm.get('role').setValidators(null);
    this.forcashForm.baseForm.get('role').updateValueAndValidity();
    this.GetCustomer();
    this.GetYear();
  }

  // onAdd(): void {
  //   if (this.forcashForm.baseForm.invalid) {
  //     return;
  //   }

  //   const formValue = this.forcashForm.baseForm.value;
  //   if (this.actionTODO === Action.NEW) {
  //     this.forcashSvc.new(formValue).subscribe((res) => {
  //       console.log('New ', res);
  //       this.router.navigate(['base/warehouses/list']);
  //     });
  //   }
  // }

  onAdd(): void {
    console.log(this.forcashForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.forcashForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(formData);

    if (this.forcashForm.baseForm.invalid) {
      return;
    }
    // const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.forcashSvc.new(formData).subscribe((res) => {

        this.router.navigate(['warehouse/forecast/list']);
      });
    }
  }

  GetCustomer(): void {
    this.forcashSvc.getCustomer().subscribe(resp => {
      this.CustomerData = resp.data;
    });

  }

  GetYear(): void {
    this.forcashSvc.getYear().subscribe(resp => {
      this.YearData = resp.data;
    });
  }

  onChange(event: any): void {
    const file = event.target.files[0];
    this.forcashForm.baseForm.patchValue({
      file: file
    });

  }

}
