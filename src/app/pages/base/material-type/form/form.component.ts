import { MaterialTypeService } from './../services/material-type.service';
import { BaseFormMaterialType } from './../../../../shared/utils/base-form-materialtype';
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
    private materialtypeSvc: MaterialTypeService,
    private router: Router,
    public materialtypeForm: BaseFormMaterialType
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.materialtypeForm.baseForm.get('role').setValidators(null);
    this.materialtypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.materialtypeForm.baseForm.invalid) {
      return;
    }

    const formValue = this.materialtypeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.materialtypeSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/material-type/list']);
      });
    }
  }

}
