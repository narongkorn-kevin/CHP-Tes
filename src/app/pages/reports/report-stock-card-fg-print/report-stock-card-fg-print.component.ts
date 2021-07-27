import { switchAll, takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../../shared/helper.service';
import { ReportLocationInOutService } from './../services/report-location-in-out.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;
declare const M: any;

@Component({
  selector: 'app-report-stock-card-fg-print',
  templateUrl: './report-stock-card-fg-print.component.html',
  styleUrls: ['./report-stock-card-fg-print.component.scss']
})
export class ReportStockCardFgPrintComponent implements OnInit {


  public dtOptions: DataTables.Settings = {};
  dataRow: any;
  formFillter: FormGroup;
  itemTypeRow = [];
  locationRow = [];
  wareHouseRow = [];
  item: any;
  constructor(
    private services: ReportLocationInOutService,
    private renderer: Renderer2,
    public fb: FormBuilder,
    private elementRef: ElementRef,
    private helpers: HelperService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formFillter = this.fb.group({
      location_id: [''],
      warehouse_id: [null],
      item_type_id:[null],
      date_start: [null],
      date_stop: [null],
      haveQty: [null]
    });
  }


  reduceBF(arr=[]){
   let res=0.00;
   arr.forEach((item,i) => {
     if(item.sum_befor_date_start){
       //if(item.sum_befor_date_start>0){
         res = res + parseFloat(item.sum_befor_date_start);
       //}
      }
     if(i==arr.length-1){
      console.log(res);
     }
   });
   return res;
  }

  reduceInput(arr=[]){
    let res=0.00;
    arr.forEach((item,i) => {
      if(item.qty_input){
        //if(item.sum_befor_date_start>0){
          res = res + parseFloat(item.qty_input);
        //}
       }
      if(i==arr.length-1){
      }
    });
    return res;
   }

   reduceOutput(arr=[]){
    let res=0.00;
    arr.forEach((item,i) => {
      if(item.qty_output){
        //if(item.sum_befor_date_start>0){
          res = res + parseFloat(item.qty_output);
        //}
       }
      if(i==arr.length-1){
      }
    });
    return res;
   }

   reduceAdjOutput(arr=[]){
    let res=0.00;
    arr.forEach((item,i) => {
      if(item.adj_output){
        //if(item.sum_befor_date_start>0){
          res = res + parseFloat(item.adj_output);
        //}
       }
      if(i==arr.length-1){
      }
    });
    return res;
   }

   reduceAdjInput(arr=[]){
    let res=0.00;
    arr.forEach((item,i) => {
      if(item.adj_input){
        //if(item.sum_befor_date_start>0){
          res = res + parseFloat(item.adj_input);
        //}
       }
      if(i==arr.length-1){
      }
    });
    return res;
   }

   reduceBalance(arr=[]){
    let res=0.00;
    arr.forEach((item,i) => {
      if(item.balance){
        //if(item.sum_befor_date_start>0){
          res = res + parseFloat(item.balance);
        //}
       }
      if(i==arr.length-1){
      }
    });
    return res;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.formFillter.patchValue({
        item_type_id: [1],
        item_id: '',
        date_start: params.start_date,
        date_stop: params.stop_date,
        haveQty: true,
        location_id:[]
      });
    });
   
    this.loadTable(this.formFillter);
  }


  loadTable(dataTablesParameters: FormGroup): void {
    let param = dataTablesParameters.value;
    delete param.warehouse_id;
    this.services.getAll(param).subscribe((resp) => {
      this.dataRow = resp.data;
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }


}
