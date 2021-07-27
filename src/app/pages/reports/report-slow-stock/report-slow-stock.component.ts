import { ReportSlowStockService } from './../services/report-slow-stock.service';
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
import { ItemTranService } from './../services/item-tran.service';
import { NavigatorService } from '../../../shared/navigator.service';
import { HelperService } from '../../../shared/helper.service';
declare const $: any;
declare const M: any;

@Component({
  selector: 'app-report-slow-stock',
  templateUrl: './report-slow-stock.component.html',
  styleUrls: ['./report-slow-stock.component.scss']
})
export class ReportSlowStockComponent implements OnInit {



  public dtOptions: DataTables.Settings = {};
  dataRow : any;
  customerRow :any;
  formFillter : FormGroup;
  itemTypeRow=[];
  itemRow: any;
  item:any;
  constructor(
    private ItemTranSvc : ItemTranService,
    private renderer : Renderer2,
    public fb : FormBuilder,
    private elementRef : ElementRef,
    private nav : NavigatorService,
    private sv : ReportSlowStockService,
    private helpers : HelperService
    ) {
      this.formFillter = this.fb.group({
        item_type_id:[''],
        item_id:[null],
        date_start:[null],
        date_stop:[null],
        customer_id:[null]
      });
    }




  ngOnInit(): void {
    this.formFillter.patchValue({
        item_type_id:'',
        item_id:'',
        date_start:'',
        date_stop:'',
        customer_id:''
    });
    this.getItemType();
    let newobj = this.helpers.replaceJsonValue({id:'',name:null,age:15,name1:null,name2:null,name3:null,name4:null,name5:null,name6:null});
    console.log(newobj);
  }
  getItemType(){
    this.ItemTranSvc.getItemType({}).subscribe((resp) => {
      this.itemTypeRow = resp.data;
    });
  }




  loadTable(dataTablesParameters :FormGroup): void {

    let param =dataTablesParameters.value;

    let msgTop='';
    $('#example').DataTable().destroy();
    this.sv.getAll(param).subscribe((resp) => {
      this.dataRow = resp.data;
      this.tableSet(msgTop);
      if(this.dataRow.length <1){ alert('Data not found!'); }
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
            title: 'Dead Stock Report',
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

  tableClear(res){
    let table = $('#example').DataTable();
    table
    .clear()
    .draw();
  }


}
