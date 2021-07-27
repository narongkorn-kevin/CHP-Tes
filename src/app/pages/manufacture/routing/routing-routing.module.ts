import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ApproveComponent } from './approve/approve.component';


const routes: Routes = [

  { path: 'form', component: FormComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent},
  { path: 'approve/:id', component: ApproveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
