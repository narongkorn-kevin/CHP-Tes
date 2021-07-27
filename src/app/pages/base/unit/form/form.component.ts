import { BaseFormUnit } from './../../../../shared/utils/base-form-unit';
import { UnitService } from './../services/unit.service';
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
    private unitSvc: UnitService,
    private router: Router,
    public unitForm: BaseFormUnit
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.unitForm.baseForm.get('role').setValidators(null);
    this.unitForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.unitForm.baseForm.invalid) {
      return;
    }

    const formValue = this.unitForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.unitSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/unit/list']);
      });
    }
  }

}
