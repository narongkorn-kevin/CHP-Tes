import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../station/list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationRoutingModule { }
