
import { CustomerService } from './../services/customer.service';
import { takeUntil } from 'rxjs/operators';


import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCustomer } from './../../../../shared/utils/base-form-customer';
import { Subscription } from 'rxjs';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private serviceSvc: CustomerService,
    private router: Router,
    public customerForm: BaseFormCustomer,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.customerForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.customerForm.baseForm.get('role').setValidators(null);
    this.customerForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.customerForm.baseForm.invalid) {
      return;
    }
    const formValue = this.customerForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.serviceSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/customer/list']);
      });
    }
  }
}
