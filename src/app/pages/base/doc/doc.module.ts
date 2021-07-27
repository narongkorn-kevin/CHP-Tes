import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [FormComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    DocRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class DocModule { }
