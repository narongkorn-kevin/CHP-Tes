import { WithdrawRoutingModule } from './withdraw-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ListComponent } from './list/list.component';
import { ApproveComponent } from './approve/approve.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [FormComponent, ListComponent, ApproveComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    WithdrawRoutingModule
  ]
})
export class WithdrawModule { }
