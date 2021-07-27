import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { ActivateComponent } from './activate/activate.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


@NgModule({
  declarations: [ListComponent, FormComponent, ViewComponent, EditComponent, RequestComponent, ActivateComponent,
    ProfileComponent, ChangepasswordComponent, EditprofileComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
