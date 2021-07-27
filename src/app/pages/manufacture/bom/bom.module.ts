import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BomRoutingModule } from './bom-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ApproveComponent } from './approve/approve.component';
import { MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent, ApproveComponent,AddDialogComponent, EditDialogComponent, CloneDialogComponent],
  imports: [
    CommonModule,
    BomRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    FormsModule
  ],
  entryComponents:[AddDialogComponent],
  exports:[MatIconModule,]
})
export class BomModule {  }
