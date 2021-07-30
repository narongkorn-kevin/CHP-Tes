import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenefitRoutingModule } from './benefit-routing.module';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { MatChip } from '@angular/material/chips';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [FormComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    BenefitRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
  ]
})
export class BenefitModule { }
