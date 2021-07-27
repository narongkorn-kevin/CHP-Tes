import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'list', component: ListComponent },
  {path: 'edit/:id', component: EditComponent },
  {path: 'form', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockControlRoutingModule { }
