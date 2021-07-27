import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent],
  imports: [
    CommonModule,
    MachineRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class MachineModule { }
