import { param } from 'jquery';
import { ReportForcashService } from './../services/report-forcash.service';
import { takeUntil } from 'rxjs/operators';
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
import { from, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from './../../../shared/helper.service';
declare const $: any;
declare const M: any;

@Component({
  selector: 'app-reports-forcash',
  templateUrl: './reports-forcash.component.html',
  styleUrls: ['./reports-forcash.component.scss']
})
export class ReportsForcashComponent implements OnInit {

   reducer = (currentValue) =>  currentValue;


  dataRow: any;
  dataRow2: any;
  formFillter: FormGroup;
  itemTypeRow = [];
  itemRow: any;
  item: any;
  public CustomerData: any = [];
  public YearData: any = [];

  constructor(
    private ReportforcashSvc: ReportForcashService,
    private renderer: Renderer2,
    public fb: FormBuilder,
    private elementRef: ElementRef,
    private helpers : HelperService,
  ) {
    this.formFillter = this.fb.group({
      customer_id: [''],
      year: [''],
    });
  }




  ngOnInit(): void {
    this.formFillter.patchValue({
      customer_id: '',
      year: '',
    });

    this.GetCustomer();
    this.GetYear();
  }


  loadTable(dataTablesParameters: FormGroup): void {
    let param = dataTablesParameters.value;
    if(!param.customer_id && !param.year){
      alert('Please select item!');
      return;
    }

    let msgTop='';
    msgTop +=` Year ${param.year}`;

    this.ReportforcashSvc.getAll(param).subscribe((resp: any) => {
      this.dataRow = resp.data;
      $('#example').DataTable().destroy();
        this.tableSet(msgTop);
    });
  }


  tableSet(msgTop='') {

    const script = this.renderer.createElement('script');
    script.src = 'assets/plugins/datatable/js/dataTables.buttons.min.js';
    script.onload = () => {
      console.log('script loaded');
      const table = $('#example').DataTable({
        paging: false,
        ordering: false,
        info: true,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'copy'
          },
          {
            extend: 'excelHtml5',
            title: 'Forecast Report',
            messageTop: `${msgTop} `
          },
         
        ],
        responsive: false
      });
      table.buttons().container().appendTo('#example_wrapper .col-md-6:eq(0)');
    };
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  tableClear(res) {
    let table = $('#example').DataTable();
    table
      .clear()
      .draw();
  }

  GetCustomer(): void {
    this.ReportforcashSvc.getCustomer().subscribe(resp => {
      this.CustomerData = resp.data;
    //  console.log(this.CustomerData);
    });

  }

  GetYear(): void {
    this.ReportforcashSvc.getYear().subscribe(resp => {
      this.YearData = resp.data;
    });
  }


  // SumReport(arr: any , col) {
  //   let res = 0;
  //   arr.forEach((item,i) => {
  //     res += item.col;
  //     console.log(res);
  //     if(i == arr.length-1){
  //       return res;
  //     }
  //   });
  // }

}
