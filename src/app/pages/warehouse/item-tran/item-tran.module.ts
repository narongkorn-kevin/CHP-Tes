import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ItemTranRoutingModule } from './item-tran-routing.module';


@NgModule({
  declarations: [EditComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    ItemTranRoutingModule
  ]
})
export class ItemTranModule { }
