import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ImportComponent } from './import/import.component';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent, ImportComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    DeliveryRoutingModule
  ]
})
export class DeliveryModule { }
