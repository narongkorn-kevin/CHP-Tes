import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing.module';
import { ManufactureComponent } from './manufacture.component';


@NgModule({
  declarations: [ManufactureComponent],
  imports: [
    CommonModule,
    ManufactureRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ManufactureModule { }
