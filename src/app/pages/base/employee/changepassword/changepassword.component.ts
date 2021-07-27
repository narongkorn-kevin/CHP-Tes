import { BaseFormChangepassword } from './../../../../shared/utils/base-form-changepassword';
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
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements AfterViewInit, OnInit, OnDestroy {

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
    public changepasswordForm: BaseFormChangepassword,
    public activatedRoute: ActivatedRoute,
  ) {
    // console.log('extrasEdit111', this.router.getCurrentNavigation().extras.state.item);
    // this.changepasswordForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
    // console.log(this.changepasswordForm.baseForm.value.image);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.GetProfile();
    // this.changepasswordForm.baseForm.get('role').setValidators(null);
    // this.changepasswordForm.baseForm.get('role').updateValueAndValidity();


  }

  GetProfile(): void {
    this.employeeSvc.getProfile().subscribe((resp) => {
      this.ProfileData = resp.data;
      console.log(this.ProfileData.id);
    });
  }

  ChangePassword(): void {
    if (this.changepasswordForm.baseForm.invalid) {
      return;
    }
    this.changepasswordForm.baseForm.value.id = this.ProfileData.id
    const formValue = this.changepasswordForm.baseForm.value;
    if (this.actionTODO === Action.EDIT)
    {
      console.log(formValue.id);
      this.employeeSvc.changePassword(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/employee/profile']);
      });
    }

}

}



