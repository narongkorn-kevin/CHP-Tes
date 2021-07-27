import { SizeRoutingModule } from './size-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [FormComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    SizeRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class SizeModule { }
