import { DialogRoutingEditComponent } from './routing-edit/routing-edit.component';
import { DialogRoutingFormComponent } from './routing-form/routing-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [DialogRoutingFormComponent,DialogRoutingEditComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class DialogRoutingModule { }
