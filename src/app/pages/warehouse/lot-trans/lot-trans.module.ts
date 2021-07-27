import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotTransRoutingModule } from './lot-trans-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    LotTransRoutingModule
  ]
})
export class LotTransModule { }
