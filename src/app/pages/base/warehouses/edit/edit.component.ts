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

  constructor(
    private warehousesSvc: WarehousesService,
    private router: Router,
    public warehousesForm: BaseFormWarehouses,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.warehousesForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.warehousesForm.baseForm.get('role').setValidators(null);
    this.warehousesForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.warehousesForm.baseForm.invalid) {
      return;
    }
    const formValue = this.warehousesForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.warehousesSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/warehouses/list']);
      });
    }
  }
}
