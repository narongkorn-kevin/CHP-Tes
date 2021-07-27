import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingRoutingModule } from './routing-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ApproveComponent } from './approve/approve.component';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent, ApproveComponent],
  imports: [
    CommonModule,
    RoutingRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class RoutingModule { }
