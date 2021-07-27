import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DataTablesModule } from 'angular-datatables';

console.warn('Permission module');
@NgModule({
  declarations: [FormComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class PermissionModule { }
