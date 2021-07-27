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
import { ActivatedRoute, Router } from '@angular/router';
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
  public WarehouseData: any = [];
  constructor(
    private locationSvc: LocationService,
    private router: Router,
    public locationForm: BaseFormLocation,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.locationForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.locationForm.baseForm.get('role').setValidators(null);
    this.locationForm.baseForm.get('role').updateValueAndValidity();
    this.GetWarehouse();
  }

  onUpdate(): void {

    if (this.locationForm.baseForm.invalid) {
      return;
    }
    const formValue = this.locationForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.locationSvc.update(formValue.id, formValue).subscribe((res) => {
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
