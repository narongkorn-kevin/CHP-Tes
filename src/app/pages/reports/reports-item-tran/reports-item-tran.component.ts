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
declare const $: any;
declare const M: any;
@Component({
  selector: 'app-reports-item-tran',
  templateUrl: './reports-item-tran.component.html',
  styleUrls: ['./reports-item-tran.component.scss']
})

export class ReportsItemTranComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  dataRow : any;
  formFillter : FormGroup;
  itemTypeRow=[];
  itemRow: any;
  item:any;
  constructor( 
    private ItemTranSvc : ItemTranService,
    private renderer : Renderer2,
    public fb : FormBuilder,
    private elementRef : ElementRef,
    private nav : NavigatorService
    ) {
      this.formFillter = this.fb.group({
        item_type_id:[''],
        item_id:[null],
        date_start:[null],
        date_stop:[null]
      });
    }

    

    
  ngOnInit(): void {

    this.tableSet();
    this.formFillter.patchValue({
        item_type_id:'',
        item_id:'',
        date_start:'',
        date_stop:''
    });
    this.getItemType();
  }

  getItemType(){
    this.ItemTranSvc.getItemType({}).subscribe((resp) => {
      this.itemTypeRow = resp.data;
    });
  }

  getItem(e){
    console.log(e.target.value);
    let item_type_id = e.target.value;
    this.ItemTranSvc.getItem({item_type_id:item_type_id}).subscribe((resp) => {
      this.itemRow = resp.data;
    });
  }

  loadTable(dataTablesParameters :FormGroup): void {

    let param =dataTablesParameters.value;
    if(!param.item_id){
      alert('Please select item!');
      return;
    }
    let itemName = this.itemRow.filter((obj)=>{ if(obj.id == param.item_id){ return obj; } })
    let msgTop='';
    msgTop =`Item Name ${itemName[0].item_id}`;
    if(this.formFillter.value.date_start && this.formFillter.value.date_stop){
      msgTop +=` From ${this.formFillter.value.date_start} To ${this.formFillter.value.date_stop}`;
    }
    delete param.item_type_id;

    $('#example').DataTable().destroy();
    this.ItemTranSvc.getAll(param).subscribe((resp) => {
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
            title: 'Item Transaction',
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
