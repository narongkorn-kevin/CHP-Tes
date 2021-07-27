import { map, takeUntil } from 'rxjs/operators';
import { DepartmentService } from './../services/department.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormDepartment } from '@shared/utils/base-form-department';
import { Observable, Subscription } from 'rxjs';
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
    private departmentSvc: DepartmentService,
    private router: Router,
    public departmentForm: BaseFormDepartment,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.departmentForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.departmentForm.baseForm.get('role').setValidators(null);
    this.departmentForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.departmentForm.baseForm.invalid) {
      return;
    }
    const formValue = this.departmentForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.departmentSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/department/list']);
      });
    }
  }
}
