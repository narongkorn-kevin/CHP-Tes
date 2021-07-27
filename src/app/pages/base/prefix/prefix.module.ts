import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrefixRoutingModule } from './prefix-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [EditComponent, ListComponent, FormComponent],
  imports: [
    CommonModule,
    PrefixRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PrefixModule { }
