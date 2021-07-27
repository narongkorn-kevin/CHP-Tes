import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogItemComponent } from './dialogs/dialog-item/dialog-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogRoutingComponent } from './dialogs/dialog-routing/dialog-routing.component';

@NgModule({
  declarations: [DialogRoutingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class SharedModule { }
