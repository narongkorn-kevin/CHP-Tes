import { BaseFormUnitConvertion } from './../../../../shared/utils/base-form-unitconvertion';
import { UnitConvertionService } from './../services/unit-convertion.service';
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
  public UnitData: any = [];
  public ItemTypeData: any = [];

  constructor(
    private unitconvertionSvc: UnitConvertionService,
    private router: Router,
    public unitconvertionForm: BaseFormUnitConvertion

  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.unitconvertionForm.baseForm.get('role').setValidators(null);
    this.unitconvertionForm.baseForm.get('role').updateValueAndValidity();
    this.GetUnit();
    this.GetItemType();
  }




  onAdd(): void {
    if (this.unitconvertionForm.baseForm.invalid) {
      return;
    }

    const formValue = this.unitconvertionForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.unitconvertionSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/unit-convertion/list']);
      });
    }
  }

  GetItemType(): void {
    this.unitconvertionSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

   }
   GetUnit(): void {
    this.unitconvertionSvc.getUnit().subscribe(resp => {
      this.UnitData = resp.data;
      console.log(this.UnitData);
    });

   }


}
