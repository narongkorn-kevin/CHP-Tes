


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [

  { path: 'form', component: FormComponent },
  { path: 'list/:id', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemLotRoutingModule { }
