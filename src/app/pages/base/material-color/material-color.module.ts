import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialColorRoutingModule } from './material-color-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialColorRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class MaterialColorModule { }
