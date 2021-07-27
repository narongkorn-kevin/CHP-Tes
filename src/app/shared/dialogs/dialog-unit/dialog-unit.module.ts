import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogUnitComponent } from './dialog-unit.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [DialogUnitComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class DialogUnitModule { }

