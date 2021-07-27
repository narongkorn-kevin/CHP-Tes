
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemLotRoutingModule } from './item-lot-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';





@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    ItemLotRoutingModule

  ] 
})
export class ItemLotModule { }
