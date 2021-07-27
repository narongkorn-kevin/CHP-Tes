import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';

import { StationRoutingModule } from './station-routing.module';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ConfirmDialogComponent } from '@app/shared/dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent],
  imports: [
    CommonModule,
    StationRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class StationModule { }
