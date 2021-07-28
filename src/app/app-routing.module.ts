import { BenefitModule } from './benefit/benefit.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckLoginGuard } from '@shared/guards/check-login.guard';
const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule), },
  {
    path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then((m) => m.LoginModule), canActivate: [CheckLoginGuard],
  },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'base', loadChildren: () => import('./pages/base/base.module').then(m => m.BaseModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule), },
  { path: 'time', loadChildren: () => import('./pages/time/time.module').then(m => m.TimeModule) },
  { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'forgot', loadChildren: () => import('./pages/auth/forgot/forgot.module').then(m => m.ForgotModule)},
  { path: 'warehouse', loadChildren: () => import('./pages/warehouse/warehouse.module').then(m => m.WarehouseModule) },
  { path: 'manufacture', loadChildren: () => import('./pages/manufacture/manufacture.module').then(m => m.ManufactureModule) },
  { path: 'dialog-item', loadChildren: () => import('./shared/dialogs/dialog-item/dialog-item.module').then(m => m.DialogItemModule) },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'sale', loadChildren: () => import('./pages/sale/sale.module').then(m => m.SaleModule) },
  { path: 'dialog-item-for-inventory', loadChildren: () => import('./shared/dialogs/dialog-item-for-inventory/dialog-item-for-inventory.module').then(m => m.DialogItemForInventoryModule) },
  { path: 'dialog-routing', loadChildren: () => import('./shared/dialogs/dialog-routing/dialog-routing.module').then(m => m.DialogRoutingModule) },
  { path: 'dialog-unit', loadChildren: () => import('./shared/dialogs/dialog-unit/dialog-unit.module').then(m => m.DialogUnitModule) },
  { path: 'dialog-unit-convertion', loadChildren: () => import('./shared/dialogs/dialog-unit-convertion/dialog-unit-convertion.module').then(m => m.DialogUnitConvertionModule) },
  { path: 'dialog-bom', loadChildren: () => import('./shared/dialogs/dialog-bom/dialog-bom.module').then(m => m.DialogBomModule) },
  { path: 'benefit', loadChildren: () => import('./benefit/benefit.module').then(m => m.BenefitModule) },
  {
    path: '**', loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
