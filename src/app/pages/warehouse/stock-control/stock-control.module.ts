import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockControlRoutingModule } from './stock-control-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [ListComponent, EditComponent, FormComponent],
  imports: [
    CommonModule,
    StockControlRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class StockControlModule { }
