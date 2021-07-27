import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { ListComponent } from './list/list.component';
import { ApproveComponent } from './approve/approve.component';
import { EditComponent } from './edit/edit.component';
import { DialogItemComponent } from '@app/shared/dialogs/dialog-item/dialog-item.component';




@NgModule({
  declarations: [ListComponent, ApproveComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    DepositRoutingModule
  ] ,
  entryComponents: [
    DialogItemComponent
  ]
})
export class DepositModule { }
