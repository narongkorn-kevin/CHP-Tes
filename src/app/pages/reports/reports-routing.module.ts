import { ReportsForcashComponent } from './reports-forcash/reports-forcash.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { ReportsItemTranComponent } from './reports-item-tran/reports-item-tran.component';
import { ReportsItemLocationComponent } from './reports-item-location/reports-item-location.component';
import { ReportsLocationInOutComponent } from './reports-location-in-out/reports-location-in-out.component';
import { ReportslocationInOutFgComponent } from './reports-location-in-out-fg/reports-location-in-out-fg.component';
import { ReportsItemLotComponent } from './reports-item-lot/reports-item-lot.component';
import { ReportSaleComponent } from './report-sale/report-sale.component';
import { ReportSaleBalanceComponent } from './report-sale-balance/report-sale-balance.component';
import { ReportDeliveryOrderComponent } from './report-delivery-order/report-delivery-order.component';
import { ReportDeadStockComponent } from './report-dead-stock/report-dead-stock.component';
import { ReportSlowStockComponent } from './report-slow-stock/report-slow-stock.component';
import { ReportStockCardMatComponent } from './report-stock-card-mat/report-stock-card-mat.component';
import { PrintLocationFgComponent } from './print-location-fg/print-location-fg.component';

import { ReportStockCardMatPrintComponent } from './report-stock-card-mat-print/report-stock-card-mat-print.component';
import { ReportStockCardPackingComponent } from './report-stock-card-packing/report-stock-card-packing.component';
import { ReportStockCardPackingPrintComponent } from './report-stock-card-packing-print/report-stock-card-packing-print.component';
import { ReportStockCardFgComponent } from './report-stock-card-fg/report-stock-card-fg.component';
import { ReportStockCardFgPrintComponent } from './report-stock-card-fg-print/report-stock-card-fg-print.component';
import { ReportStockCardComponent } from './report-stock-card/report-stock-card.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'item-tran', component: ReportsItemTranComponent },
  { path: 'item-location', component: ReportsItemLocationComponent },
  { path: 'item-lot', component: ReportsItemLotComponent },
  { path: 'forecast', component: ReportsForcashComponent },
  { path: 'location-in-out', component: ReportsLocationInOutComponent },
  { path: 'location-in-out-fg', component: ReportslocationInOutFgComponent },
  { path: 'sale-order', component: ReportSaleComponent },
  { path: 'sale-order-balance', component: ReportSaleBalanceComponent },
  { path: 'delivery-order', component: ReportDeliveryOrderComponent },
  { path: 'dead-stock', component: ReportDeadStockComponent },
  { path: 'slow-stock', component: ReportSlowStockComponent },
  { path: 'stock-card-mat', component: ReportStockCardMatComponent },
  { path: 'print_location_fg', component: PrintLocationFgComponent },
  { path: 'stock-card-mat',component: ReportStockCardMatComponent },
  { path: 'stock-card-mat-print/:start_date/:stop_date',component: ReportStockCardMatPrintComponent },
  { path: 'stock-card-packing',component: ReportStockCardPackingComponent },
  { path: 'stock-card-packing-print/:start_date/:stop_date',component: ReportStockCardPackingPrintComponent },
  { path: 'stock-card-fg',component: ReportStockCardFgComponent },
  { path: 'stock-card-fg-print/:start_date/:stop_date',component: ReportStockCardFgPrintComponent },
  { path: 'stock-card', component: ReportStockCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
