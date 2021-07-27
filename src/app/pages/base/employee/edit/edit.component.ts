import { BaseFormEditEmployee } from './../../../../shared/utils/base-form-edit-employee';
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
  public DepartmentData: any = [];
  public BranchData: any = [];
  public PositionData: any = [];
  public PermissionData: any = [];
  public ProfileData: any = [];



  constructor(
    private employeeSvc: EmployeeService,
    private router: Router,
    public editemployeeForm: BaseFormEditEmployee,
    public activatedRoute: ActivatedRoute,

  )
  {
    console.log('extrasEdit111', this.router.getCurrentNavigation().extras.state.item);
    this.editemployeeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
    console.log(this.editemployeeForm.baseForm.value.image);



  }
  url_profile = this.router.getCurrentNavigation().extras.state.item.image_url;
  url_signature = this.router.getCurrentNavigation().extras.state.item.signature_url;



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    // this.editemployeeForm.baseForm.get('role').setValidators(null);
    // this.editemployeeForm.baseForm.get('role').updateValueAndValidity();
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

  onUpdate(): void {
    const formData = new FormData();
    Object.entries(this.editemployeeForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });
    if (this.editemployeeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.editemployeeForm.baseForm.value;


    if (this.actionTODO === Action.EDIT)
    {
      this.employeeSvc.update(formValue.id, formData).subscribe((res) => {
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
    this.editemployeeForm.baseForm.patchValue({
      image: file
    });

  }


  onChangeSignature(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(e: any)=>
    this.url_signature=e.target.result;
    const file = event.target.files[0];
    this.editemployeeForm.baseForm.patchValue({
      signature: file
    });

  }
}





