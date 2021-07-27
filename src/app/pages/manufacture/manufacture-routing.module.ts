import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './bom/list/list.component';
import { FormComponent } from './bom/form/form.component';
import { AddDialogComponent } from './bom/add-dialog/add-dialog.component';
const routes: Routes = [
  { path: 'station', loadChildren: () => import('./station/station.module').then(m => m.StationModule) },
  { path: 'machine', loadChildren: () => import('./machine/machine.module').then(m => m.MachineModule) },
  { path: 'routing', loadChildren: () => import('./routing/routing.module').then(m => m.RoutingModule) },
  { path: 'bom', loadChildren: () => import('./bom/bom.module').then(m => m.BomModule) },
  { path: 'job', loadChildren: () => import('./job/job.module').then(m => m.JobModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ManufactureRoutingModule {

}
