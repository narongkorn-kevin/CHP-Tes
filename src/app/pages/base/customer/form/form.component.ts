import { CustomerService } from './../services/customer.service';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormCustomer } from './../../../../shared/utils/base-form-customer';
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

  constructor(
    private customerSvc: CustomerService,
    private router: Router,
    public customerForm: BaseFormCustomer
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.customerForm.baseForm.get('role').setValidators(null);
    this.customerForm.baseForm.get('role').updateValueAndValidity();
    this.customerForm.baseForm.reset();
    // this.customerForm.baseForm.patchValue({
    //   name: '',
    //   contact: '',
    //   email: '',
    //   phone: '',
    //   adress: ''
    // });
  }

  onAdd(): void {
    if (this.customerForm.baseForm.invalid) {
      return;
    }

    const formValue = this.customerForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.customerSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/customer/list']);
      });
    }
  }

}
