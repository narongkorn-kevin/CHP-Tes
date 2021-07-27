import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportsItemTranComponent } from './reports-item-tran/reports-item-tran.component';
import { ReportsItemLocationComponent } from './reports-item-location/reports-item-location.component';
import { ReportsLocationInOutComponent } from './reports-location-in-out/reports-location-in-out.component';
import { ReportslocationInOutFgComponent } from './reports-location-in-out-fg/reports-location-in-out-fg.component';
import { ReportsItemLotComponent } from './reports-item-lot/reports-item-lot.component';
import { ReportsForcashComponent } from './reports-forcash/reports-forcash.component';
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


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [ReportsComponent, 
    ReportsItemTranComponent, 
    ReportsItemLocationComponent,
     ReportsLocationInOutComponent, 
     ReportslocationInOutFgComponent, 
     ReportsItemLotComponent, 
     ReportsForcashComponent,
     ReportSaleComponent,
     ReportSaleBalanceComponent,
     ReportDeliveryOrderComponent,
     ReportDeadStockComponent,
     ReportSlowStockComponent,
     ReportStockCardMatComponent,
     PrintLocationFgComponent,
     ReportStockCardMatPrintComponent,
     ReportStockCardPackingComponent,
     ReportStockCardPackingPrintComponent,
     ReportStockCardFgComponent,
     ReportStockCardFgPrintComponent,
     ReportStockCardComponent,
    ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReportsModule { }
