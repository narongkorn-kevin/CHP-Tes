import { BaseFormLocation } from './../../../../shared/utils/base-form-location';
import { LocationService } from './../services/location.service';
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
  public WarehouseData: any = [];
  constructor(
    private locationSvc: LocationService,
    private router: Router,
    public locationForm: BaseFormLocation
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.locationForm.baseForm.get('role').setValidators(null);
    this.locationForm.baseForm.get('role').updateValueAndValidity();
    this.GetWarehouse();
  }


  onAdd(): void {
    if (this.locationForm.baseForm.invalid) {
      return;
    }

    const formValue = this.locationForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.locationSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/location/list']);
      });
    }
  }

  GetWarehouse(): void {
    this.locationSvc.getWarehouse().subscribe(resp => {
      this.WarehouseData = resp.data;
      console.log(this.WarehouseData);
    });


  }
}
