import { BaseFormMaterialGrade } from './../../../../shared/utils/base-form-materialgrade';
import { MaterialGradeService } from './../services/material-grade.service';
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
    private materialgradeSvc: MaterialGradeService,
    private router: Router,
    public materialgradeForm: BaseFormMaterialGrade
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.materialgradeForm.baseForm.get('role').setValidators(null);
    this.materialgradeForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.materialgradeForm.baseForm.invalid) {
      return;
    }

    const formValue = this.materialgradeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.materialgradeSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/material-grade/list']);
      });
    }
  }

}
