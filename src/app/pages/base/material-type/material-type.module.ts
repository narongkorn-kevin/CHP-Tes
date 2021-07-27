import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialTypeRoutingModule } from './material-type-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialTypeRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class MaterialTypeModule { }
