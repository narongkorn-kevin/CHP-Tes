import { BaseFormActivate } from './../../../../shared/utils/base-form-activate';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormEmployee } from '@shared/utils/base-form-employee';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
enum Action {
  ACTIVATE = 'activate',
  NEW = 'new',
}
@Component({
  selector: 'app-form',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.ACTIVATE;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public DepartmentData: any = [];
  public BranchData: any = [];
  public PositionData: any = [];
  public PermissionData: any = [];
  public ProfileData: any = [];

  constructor(
    private employeeSvc: EmployeeService,
    private router: Router,
    public employeeForm: BaseFormEmployee,
    public activateForm: BaseFormActivate,
    public activatedRoute: ActivatedRoute,
  ) {
    console.log('extrasEdit111', this.router.getCurrentNavigation().extras.state.item);
    this.activateForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
    console.log(this.employeeForm.baseForm.value.image);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    // this.employeeForm.baseForm.get('role').setValidators(null);
    // this.employeeForm.baseForm.get('role').updateValueAndValidity();
    this.GetDepartment();
    this.GetBranch();
    this.GetPosition();
    this.GetPermission();


  }
  GetDepartment(): void {
    this.employeeSvc.getDepartment().subscribe(resp => {
      this.DepartmentData = resp.data;
      console.log(this.DepartmentData);
    });

   }
   GetBranch(): void {
    this.employeeSvc.getBranch().subscribe(resp => {
      this.BranchData = resp.data;
      console.log(this.BranchData);
    });

   }
   GetPosition(): void {
    this.employeeSvc.getPosition().subscribe(resp => {
      this.PositionData = resp.data;
      console.log(this.PositionData);
    });

   }
   GetPermission(): void {
    this.employeeSvc.getPermission().subscribe(resp => {
      this.PermissionData = resp.data;
      console.log(this.PermissionData);
    });

   }

  Activate(): void {

    if (this.activateForm.baseForm.invalid) {
      return;
    }
    const formValue = this.activateForm.baseForm.value;
    console.log(formValue);

    if (this.actionTODO === Action.ACTIVATE)
    {
      this.employeeSvc.activate(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/employee/request']);
      });
    }
  }

}





