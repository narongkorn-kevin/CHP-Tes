import { ReactiveFormsModule } from '@angular/forms';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForcashRoutingModule } from './forcash-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ApproveComponent } from './approve/approve.component';



@NgModule({
  declarations: [ListComponent, FormComponent, ApproveComponent],
  imports: [
    CommonModule,
    ForcashRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ForcashModule { }
