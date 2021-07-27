import { BaseFormSpareType } from './../../../../shared/utils/base-form-sparetype';
import { SpareTypeService } from './../services/spare-type.service';
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
    private sparetypeSvc: SpareTypeService,
    private router: Router,
    public sparetypeForm: BaseFormSpareType
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.sparetypeForm.baseForm.get('role').setValidators(null);
    this.sparetypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.sparetypeForm.baseForm.invalid) {
      return;
    }

    const formValue = this.sparetypeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.sparetypeSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/spare-type/list']);
      });
    }
  }

}
