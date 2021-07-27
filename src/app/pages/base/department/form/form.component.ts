import { takeUntil } from 'rxjs/operators';
import { DepartmentService } from './../services/department.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormDepartment } from '@shared/utils/base-form-department';
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
    private departmentSvc: DepartmentService,
    private router: Router,
    public departmentForm: BaseFormDepartment
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.departmentForm.baseForm.get('role').setValidators(null);
    this.departmentForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.departmentForm.baseForm.invalid) {
      return;
    }

    const formValue = this.departmentForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.departmentSvc.new(formValue).subscribe((res) => {
        this.router.navigate(['base/department/list']);
      });
    }
  }

}
