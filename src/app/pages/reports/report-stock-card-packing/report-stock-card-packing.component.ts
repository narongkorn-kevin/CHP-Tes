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
declare const $: any;
declare const M: any;

@Component({
  selector: 'app-report-stock-card-packing',
  templateUrl: './report-stock-card-packing.component.html',
  styleUrls: ['./report-stock-card-packing.component.scss']
})
export class ReportStockCardPackingComponent implements OnInit {



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
    private helpers: HelperService
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




  ngOnInit(): void {
    this.tableSet();
    this.formFillter.patchValue({
      item_type_id: [4],
      item_id: '',
      date_start: this.helpers.toDay(),
      date_stop: this.helpers.toDay(),
      haveQty: true,
      location_id:[]
    });
  }





  loadTable(dataTablesParameters: FormGroup): void {
    let param = dataTablesParameters.value;
    delete param.warehouse_id;
    this.services.getAll(param).subscribe((resp) => {
      $('#example').DataTable().destroy();
      this.dataRow = resp.data;
      if (this.dataRow.length < 1) { alert('Data not found!'); } else {
        let msgTop='';
        if(this.formFillter.value.date_start && this.formFillter.value.date_stop){
          msgTop +=` From ${this.formFillter.value.date_start} To ${this.formFillter.value.date_stop}`;
        }
        this.tableSet(msgTop);
      }
    });
  }

  tableSet(msgTop='') {
    const script = this.renderer.createElement('script');
    script.src = 'assets/plugins/datatable/js/dataTables.buttons.min.js';
    script.onload = () => {
      console.log('script loaded');
      const table = $('#example').DataTable({
        "paging": false,
        "ordering": false,
        "info": true,
        lengthChange: true,
        buttons: [
          {
            extend: 'copy'
          },
          {
            extend: 'excelHtml5',
            title: 'STOCK CARD REPORT MATERIAL,SCRAP,SUBMT,NG',
            messageTop: `${msgTop} `
          }
        ],
        responsive: false,
        language: {
          searchPlaceholder: 'Search...',
          sSearch: 'Search',
          lengthMenu: '_MENU_ ',
        },
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


}
