import { BaseFormMaterialColor } from './../../../../shared/utils/base-form-materialcolor';
import { MaterialColorService } from './../services/material-color.service';
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
    private materialcolorSvc: MaterialColorService,
    private router: Router,
    public materialcolorForm: BaseFormMaterialColor
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.materialcolorForm.baseForm.get('role').setValidators(null);
    this.materialcolorForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.materialcolorForm.baseForm.invalid) {
      return;
    }

    const formValue = this.materialcolorForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.materialcolorSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/material-color/list']);
      });
    }
  }

}
