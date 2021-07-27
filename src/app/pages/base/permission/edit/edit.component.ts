import { data, param } from 'jquery';
import { takeUntil, map } from 'rxjs/operators';
import { PermissionService } from './../services/permission.service';
import { PermissionItem } from '../permissionitem';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPermissionEdit } from '@shared/utils/base-form-permission-edit';
import { Subscription } from 'rxjs';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements AfterViewInit, OnInit, OnDestroy {
  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  permissionRole = [];
  private subscription: Subscription = new Subscription();
  public GetPermissionMenu: any = [];
  public GetPermissionData: any = [];
  public MenuName: any = [];
  public id: any = [];


  constructor(
    private permissionSvc: PermissionService,
    private router: Router,
    public permissionFormedit: BaseFormPermissionEdit,
    public activatedRoute: ActivatedRoute,
    private permissionItem: PermissionItem
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.permissionFormedit.baseForm.setValue(
      this.router.getCurrentNavigation().extras.state.item
    );
    this.id = this.router.getCurrentNavigation().extras.state.item.id;
    // console.log('logGetpermissiondata',this.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.permissionRole = this.permissionItem.permissionitem;
    console.log('permission role', this.permissionRole);
    this.permissionFormedit.baseForm.get('role').setValidators(null);
    this.permissionFormedit.baseForm.get('role').updateValueAndValidity();
    // this.GetMenu(this.id);
    this.GetPermissionDatabyId(this.id);
    // this.GetPermissionValue('viewUser');
  }

  onUpdate(): void {
    if (this.permissionFormedit.baseForm.invalid) {
      return;
    }
    const formValue = this.permissionFormedit.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      formValue.permission_id = formValue.id;
      console.log(formValue);
      this.permissionSvc.update(formValue).subscribe((res) => {
        this.router.navigate(['base/permission/list']);
      });
    }
  }

  // GetPermissionDatabyId(id): void {
  //   this.permissionSvc.getPermissionMenubyId(id).subscribe((resp) => {
  //     this.MenuName = [];
  //     this.GetPermissionData = resp.data;
  //     console.log('GetPermissionData',this.GetPermissionData)
  //     this.GetPermissionMenu.forEach((item, i) => {
  //       const indexs = this.GetPermissionData.findIndex(
  //         (obj) => obj.name === item.name
  //       );
  //       if (indexs >= 0) {
  //         this.CheckPermission(item.name);
  //         this.GetPermissionMenu[i].status = 1;
  //       } else {
  //         this.GetPermissionMenu[i].status = 0;
  //       }
  //     });
  //   });
  // }

  // GetMenu(id): void {
  //   this.permissionSvc.getPermissionMenu().subscribe((resp) => {
  //     this.GetPermissionMenu = resp.data;
  //     this.GetPermissionDatabyId(id);
  //   });
  // }
  GetPermissionDatabyId(id): void {
    this.MenuName = [];
    this.permissionSvc.getPermissionMenubyId(id).subscribe((resp) => {
      this.GetPermissionData = resp.data;
      this.GetPermissionData.forEach((element) => {
        this.MenuName.push(element.name);
      });
      console.log('respData', this.GetPermissionData);
      // this.GetPermissionValue('deleteUser');
      // alert('getid');
    });
  }

  // GetPermissionValue(param) {
  //   this.GetPermissionData.map((item)=>{
  //     if(item.name = param){
  //       alert(item.name);
  //       return;
  //     }
  //   })
  // }

  GetPermissionValue(param) {
    let rs = this.GetPermissionData.some((item) => {
      if (item.name === param) {
        return item;
      }
    });
    return rs;
  }

  CheckPermission(event): void {
    if (event.target.checked === true) {
      console.log('check in', this.MenuName);
      this.MenuName.push(event.target.value);
      this.permissionFormedit.baseForm.patchValue({
        name: this.MenuName,
      });
    } else {
      this.MenuName = this.MenuName.filter(
        (item) => item !== event.target.value
      );
      // this.MenuName.push(event.target.value);
      this.permissionFormedit.baseForm.patchValue({
        name: this.MenuName,
      });
      console.log('ติ้กออก', this.MenuName);
    }
    console.log('total', this.MenuName);
  }
}
