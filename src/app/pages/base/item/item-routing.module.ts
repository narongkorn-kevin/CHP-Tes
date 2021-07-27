import { EditSpComponent } from './edit-sp/edit-sp.component';
import { EditSmComponent } from './edit-sm/edit-sm.component';
import { EditRmComponent } from './edit-rm/edit-rm.component';
import { EditPkComponent } from './edit-pk/edit-pk.component';
import { EditOsComponent } from './edit-os/edit-os.component';
import { EditFsComponent } from './edit-fs/edit-fs.component';
import { EditFgComponent } from './edit-fg/edit-fg.component';
import { ListSpComponent } from './list-sp/list-sp.component';
import { ListSmComponent } from './list-sm/list-sm.component';
import { ListRmComponent } from './list-rm/list-rm.component';
import { ListPkComponent } from './list-pk/list-pk.component';
import { ListOsComponent } from './list-os/list-os.component';
import { ListFsComponent } from './list-fs/list-fs.component';
import { ListFgComponent } from './list-fg/list-fg.component';

import { EditComponent } from './../item/edit/edit.component';
import { FormComponent } from './../item/form/form.component';
import { ListComponent } from './../item/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'edit', component: EditComponent },
  { path: 'list-fg', component: ListFgComponent },
  { path: 'list-fs', component: ListFsComponent },
  { path: 'list-os', component: ListOsComponent },
  { path: 'list-pk', component: ListPkComponent },
  { path: 'list-rm', component: ListRmComponent },
  { path: 'list-sm', component: ListSmComponent },
  { path: 'list-sp', component: ListSpComponent },
  { path: 'edit-fg/:id', component: EditFgComponent },
  { path: 'edit-fs/:id', component: EditFsComponent },
  { path: 'edit-os/:id', component: EditOsComponent },
  { path: 'edit-pk/:id', component: EditPkComponent },
  { path: 'edit-rm/:id', component: EditRmComponent },
  { path: 'edit-sm/:id', component: EditSmComponent },
  { path: 'edit-sp/:id', component: EditSpComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
