import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigStockRoutingModule } from './config-stock-routing.module';
import { ListComponent } from './list/list.component';
import { ConfigComponent } from './config/config.component';


@NgModule({
  declarations: [ListComponent, ConfigComponent],
  imports: [
    CommonModule,
    ConfigStockRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class ConfigStockModule { }
