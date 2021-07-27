import { VendorService } from './../service/vendor.service';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormVendor } from './../../../../shared/utils/base-form-vendor';
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
    private vendorSvc: VendorService,
    private router: Router,
    public vendorForm: BaseFormVendor
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.vendorForm.baseForm.get('role').setValidators(null);
    this.vendorForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.vendorForm.baseForm.invalid) {
      return;
    }

    const formValue = this.vendorForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.vendorSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/vendor/list']);
      });
    }
  }

}
