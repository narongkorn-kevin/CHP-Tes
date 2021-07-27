import { data } from 'jquery';
import { BaseFormEditProfile } from './../../../../shared/utils/base-form-editprofile';
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
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public DepartmentData: any = [];
  public BranchData: any = [];
  public PositionData: any = [];
  public PermissionData: any = [];
  public ProfileName: string;
  public ProfileDepName: string;
  public ProfileBranch: string;
  public ProfilePosition: string;
  public ProfileImage: any = [];
  public ProfileSignature: any = [];
  public ProfileData: any = [];
  url_profile: any = [];
  url_signature: any = [];
  // image: any = [];


  constructor(
    private employeeSvc: EmployeeService,
    private router: Router,
    public editprofileForm: BaseFormEditProfile,
    public activatedRoute: ActivatedRoute,
  ) {
    // console.log('extrasEd222it111', this.router.getCurrentNavigation().extras.state.item);
    // this.employeeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
    // console.log(this.employeeForm.baseForm.value.image);

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.GetProfile();
    // this.employeeForm.baseForm.get('role').setValidators(null);
    // this.employeeForm.baseForm.get('role').updateValueAndValidity();
    // console.log(this.ProfileImage,this.ProfileSignature);

  }





  onUpdate(): void {
    const formData = new FormData();
    Object.entries(this.editprofileForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });
    if (this.editprofileForm.baseForm.invalid) {
      return;
    }
    // this.editprofileForm.baseForm.value.id = this.ProfileData.id
    const formValue = this.editprofileForm.baseForm.value;

    console.log(formValue);

    if (this.actionTODO === Action.EDIT) {

      this.employeeSvc.updateProfile(formValue.id, formData).subscribe((res) => {
        this.router.navigate(['base/employee/profile']);
      });
    }
  }

  onChange(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) =>
      this.url_profile = e.target.result;
    const file = event.target.files[0];
    this.editprofileForm.baseForm.patchValue({
      image: file
    });

  }


  onChangeSignature(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) =>
      this.url_signature = e.target.result;
    const file = event.target.files[0];
    this.editprofileForm.baseForm.patchValue({
      signature: file
    });

  }


  GetProfile(): void {
    this.employeeSvc.getProfile().subscribe((resp) => {
      this.ProfileData = resp.data;
      this.ProfileImage = this.ProfileData.image;
      this.ProfileSignature = this.ProfileData.signature;
      this.ProfileName = this.ProfileData.name;
      this.ProfileDepName = this.ProfileData.department.name;
      this.ProfileBranch = this.ProfileData.branch.name;
      this.ProfilePosition = this.ProfileData.position.name;
      this.editprofileForm.baseForm.patchValue({
        id: this.ProfileData.id,
        name: this.ProfileName
      });
      this.url_profile = this.ProfileImage;
      this.url_signature = this.ProfileData.signature;

      // console.log(this.ProfileImage,this.ProfileSignature);
    });
  }


}





