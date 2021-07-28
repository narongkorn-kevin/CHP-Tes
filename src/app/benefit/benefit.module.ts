import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenefitRoutingModule } from './benefit-routing.module';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [FormComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    BenefitRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class BenefitModule { }
