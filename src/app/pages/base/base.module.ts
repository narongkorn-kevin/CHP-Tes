import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { DialogComponent } from './examples/dialog/dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { TreeViewComponent } from './examples/tree-view/tree-view.component';
import {DialogItemForInventoryComponent } from '../../shared/dialogs/dialog-item-for-inventory/dialog-item-for-inventory.component';

@NgModule({
  declarations: [
    BaseComponent,    
    DialogComponent,
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
  ],
  entryComponents:[
    ConfirmDialogComponent,
    DialogItemForInventoryComponent
  ]
})
export class BaseModule { }
