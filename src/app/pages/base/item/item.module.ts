import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';

import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DataTablesModule } from 'angular-datatables';
import { ListFgComponent } from './list-fg/list-fg.component';
import { ListSmComponent } from './list-sm/list-sm.component';
import { ListRmComponent } from './list-rm/list-rm.component';
import { ListPkComponent } from './list-pk/list-pk.component';
import { ListFsComponent } from './list-fs/list-fs.component';
import { ListOsComponent } from './list-os/list-os.component';
import { ListSpComponent } from './list-sp/list-sp.component';
import { EditFgComponent } from './edit-fg/edit-fg.component';
import { EditFsComponent } from './edit-fs/edit-fs.component';
import { EditOsComponent } from './edit-os/edit-os.component';
import { EditPkComponent } from './edit-pk/edit-pk.component';
import { EditRmComponent } from './edit-rm/edit-rm.component';
import { EditSmComponent } from './edit-sm/edit-sm.component';
import { EditSpComponent } from './edit-sp/edit-sp.component';


@NgModule({
  declarations: [FormComponent, ListComponent, EditComponent, ListFgComponent, ListSmComponent, ListRmComponent, ListPkComponent, ListFsComponent, ListOsComponent, ListSpComponent, EditFgComponent, EditFsComponent, EditOsComponent, EditPkComponent, EditRmComponent, EditSmComponent, EditSpComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ItemModule { }
