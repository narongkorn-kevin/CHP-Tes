import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeTypeRoutingModule } from './employee-type-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent],
  imports: [
    CommonModule,
    EmployeeTypeRoutingModule
  ]
})
export class EmployeeTypeModule { }
