import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBomComponent } from './dialog-bom.component';



@NgModule({
  declarations: [DialogBomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DialogBomModule { }
