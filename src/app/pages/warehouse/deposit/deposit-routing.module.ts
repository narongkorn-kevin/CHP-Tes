


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ApproveComponent } from './approve/approve.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [

  { path: 'form', component: FormComponent },
  { path: 'list', component: ListComponent },
  { path: 'approve/:id', component: ApproveComponent},
  { path: 'edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositRoutingModule { }
