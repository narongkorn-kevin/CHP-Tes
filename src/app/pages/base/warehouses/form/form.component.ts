import { BaseFormWarehouses } from './../../../../shared/utils/base-form-warehouses';
import { WarehousesService } from './../services/warehouses.service';
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

  constructor(
    private warehousesSvc: WarehousesService,
    private router: Router,
    public warehousesForm: BaseFormWarehouses
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.warehousesForm.baseForm.get('role').setValidators(null);
    this.warehousesForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.warehousesForm.baseForm.invalid) {
      return;
    }

    const formValue = this.warehousesForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.warehousesSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/warehouses/list']);
      });
    }
  }

}
