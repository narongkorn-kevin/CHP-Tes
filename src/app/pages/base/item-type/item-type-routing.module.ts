import { EditComponent } from './../item-type/edit/edit.component';
import { FormComponent } from './../item-type/form/form.component';
import { ListComponent } from './../item-type/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemTypeRoutingModule { }
