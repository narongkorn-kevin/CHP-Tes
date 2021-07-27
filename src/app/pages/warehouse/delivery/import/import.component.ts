import { BaseFormDeriveryImport } from './../../../../shared/utils/base-form-derivery-import';
import { DeliveryService } from './../services/delivery.service';
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
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public CustomerData: any = [];
  public YearData: any = [];

  constructor(

    private deriveryorderSvc: DeliveryService,
    private router: Router,
    public deriveryorderForm: BaseFormDeriveryImport
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.GetCustomer();
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

  onImport(): void {
    console.log(this.deriveryorderForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.deriveryorderForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(this.deriveryorderForm.baseForm.value);

    if (this.deriveryorderForm.baseForm.invalid) {
      return;
    }
    // const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.deriveryorderSvc.import(formData).subscribe((res) => {
        console.log('formData',formData);

        this.router.navigate(['warehouse/delivery/list']);
      });
    }
  }

  GetCustomer(): void {
    this.deriveryorderSvc.getCustomer().subscribe(resp => {
      this.CustomerData = resp.data;
      console.log('getcustomer',this.CustomerData);
    });

  }
  onChange(event: any): void {
    const file = event.target.files[0];
    this.deriveryorderForm.baseForm.patchValue({
      file: file
    });

  }

}
