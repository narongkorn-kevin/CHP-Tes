import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogUnitConvertionComponent } from './dialog-unit-convertion.component';



@NgModule({
  declarations: [DialogUnitConvertionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DialogUnitConvertionModule { }
