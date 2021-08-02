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
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule), },
  { path: 'time', loadChildren: () => import('./pages/time/time.module').then(m => m.TimeModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'forgot', loadChildren: () => import('./pages/auth/forgot/forgot.module').then(m => m.ForgotModule)},
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'sale', loadChildren: () => import('./pages/sale/sale.module').then(m => m.SaleModule) },
 
  { path: 'benefit', loadChildren: () => import('./benefit/benefit.module').then(m => m.BenefitModule) },
  { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
  { path: 'officer', loadChildren: () => import('./officer/officer.module').then(m => m.OfficerModule) },
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
