import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [FormComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
  ]
})
export class EventModule { }
