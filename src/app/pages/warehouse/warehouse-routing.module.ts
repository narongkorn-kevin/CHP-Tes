import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';

import { DepositModule } from '../warehouse/deposit/deposit.module';
import { WithdrawModule } from '../warehouse/withdraw/withdraw.module';
import { MovementModule } from '../warehouse/movement/movement.module';
import { AdjustModule } from '../warehouse/adjust/adjust.module';
import { ItemLotModule } from '../warehouse/item-lot/item-lot.module';

const routes: Routes = [
  { path: '', component: WarehouseComponent },
  { path: 'deposit', loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule) },
  { path: 'withdraw', loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule) },
  { path: 'movement', loadChildren: () => import('./movement/movement.module').then(m => m.MovementModule) },
  { path: 'adjust', loadChildren: () => import('./adjust/adjust.module').then(m => m.AdjustModule) },
  { path: 'item-tran', loadChildren: () => import('./item-tran/item-tran.module').then(m => m.ItemTranModule) },
  { path: 'item-lot', loadChildren: () => import('./item-lot/item-lot.module').then(m => m.ItemLotModule) },
  { path: 'sale', loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule) },
  { path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule) },
  { path: 'forecast', loadChildren: () => import('./forcash/forcash.module').then(m => m.ForcashModule) },
  { path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule) },
  { path: 'lot-trans', loadChildren: () => import('./lot-trans/lot-trans.module').then(m => m.LotTransModule) },
  { path: 'stock-control', loadChildren: () => import('./stock-control/stock-control.module').then(m => m.StockControlModule) },
  { path: 'config-stock', loadChildren: () => import('./config-stock/config-stock.module').then(m => m.ConfigStockModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
