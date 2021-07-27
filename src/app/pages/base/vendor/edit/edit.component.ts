
import { VendorService } from './../service/vendor.service';
import { takeUntil } from 'rxjs/operators';


import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormVendor } from './../../../../shared/utils/base-form-vendor';
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
    private serviceSvc: VendorService,
    private router: Router,
    public vendorForm: BaseFormVendor,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.vendorForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.vendorForm.baseForm.get('role').setValidators(null);
    this.vendorForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.vendorForm.baseForm.invalid) {
      return;
    }
    const formValue = this.vendorForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.serviceSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/vendor/list']);
      });
    }
  }
}
