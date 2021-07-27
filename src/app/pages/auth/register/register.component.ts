import { takeUntil } from 'rxjs/operators';
import { RegisterService } from './services/register.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormRegister } from '@shared/utils/base-form-register';
import { Subscription } from 'rxjs';

declare var jQuery: any;
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public DepartmentData: any = [];
  public BranchData: any = [];
  public PositionData: any = [];
  public PermissionData: any = [];


  constructor(
    private registerSvc: RegisterService,
    private router: Router,
    public registerForm: BaseFormRegister
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function () {
        $('.app-header').css('display', 'none');
        $('.app-sidebar2').css('display', 'none');
        $('.app-sidebar3').css('display', 'none');
      });
    })(jQuery);
    // this.employeeForm.baseForm.get('role').setValidators(null);
    // this.employeeForm.baseForm.get('role').updateValueAndValidity();
    this.GetDepartment();
    this.GetBranch();
    this.GetPosition();
    this.GetPermission();

  }

  GetDepartment(): void {
    this.registerSvc.getDepartment().subscribe(resp => {
      this.DepartmentData = resp.data;
      console.log(this.DepartmentData);
    });

  }
  GetBranch(): void {
    this.registerSvc.getBranch().subscribe(resp => {
      this.BranchData = resp.data;
      console.log(this.BranchData);
    });

  }
  GetPosition(): void {
    this.registerSvc.getPosition().subscribe(resp => {
      this.PositionData = resp.data;
      console.log(this.PositionData);
    });

  }
  GetPermission(): void {
    this.registerSvc.getPermission().subscribe(resp => {
      this.PermissionData = resp.data;
      console.log(this.PermissionData);
    });

  }



  onRegister(): void {
    console.log(this.registerForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.registerForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(formData);

    if (this.registerForm.baseForm.invalid) {
      return;
    }
    // const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.registerSvc.new(formData).subscribe((res) => {
        this.router.navigate(['login']);
      });
    }
  }
  onChange(event: any): void {
    const file = event.target.files[0];
    this.registerForm.baseForm.patchValue({
      image: file
    });

  }
  onChangeSignature(event: any): void {
    const file = event.target.files[0];
    this.registerForm.baseForm.patchValue({
      signature: file
    });

  }

}

