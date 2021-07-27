import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormEmployee } from '@shared/utils/base-form-employee';
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
  public DepartmentData: any = [];
  public BranchData: any = [];
  public PositionData: any = [];
  public PermissionData: any = [];


  constructor(
    private employeeSvc: EmployeeService,
    private router: Router,
    public employeeForm: BaseFormEmployee

  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  url_profile ="assets/images/noimage.png"
  url_signature ="assets/images/nosig.png"
  ngAfterViewInit(): void {
    console.log('test');
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



  onAdd(): void {
    console.log(this.employeeForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.employeeForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(formData);

    if (this.employeeForm.baseForm.invalid) {
      return;
    }
    // const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.employeeSvc.new(formData).subscribe((res) => {

        this.router.navigate(['base/employee/list']);
      });
    }
  }
  onChange(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(e: any)=>
    this.url_profile=e.target.result;
    const file = event.target.files[0];
    this.employeeForm.baseForm.patchValue({
      image: file
    });

  }
  onChangeSignature(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(e: any)=>
    this.url_signature=e.target.result;
    const file = event.target.files[0];
    this.employeeForm.baseForm.patchValue({
      signature: file
    });

  }
}

