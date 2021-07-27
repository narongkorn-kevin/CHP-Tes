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
import { ItemTranService } from './../services/item-tran.service';
import { HelperService } from './../../../shared/helper.service';
declare const $: any;
declare const M: any;

@Component({
  selector: 'app-reports-item-location',
  templateUrl: './reports-item-location.component.html',
  styleUrls: ['./reports-item-location.component.scss']
})
export class ReportsItemLocationComponent implements OnInit {


  public dtOptions: DataTables.Settings = {};
  dataRow: any;
  formFillter: FormGroup;
  itemTypeRow = [];
  itemRow: any;
  item: any;
  locRow=[];
  constructor(
    private ItemTranSvc: ItemTranService,
    private renderer: Renderer2,
    public fb: FormBuilder,
    private elementRef: ElementRef,
    private helpers : HelperService,
  ) {
    this.formFillter = this.fb.group({
      location_id:[''],
      item_type_id: [''],
      item_id: [null],
      date_start: [null],
      date_stop: [null]
    });
  }




  ngOnInit(): void {
    this.getlocation();
    this.formFillter.patchValue({
      location_id:'',
      item_type_id: '',
      item_id: '',
      date_start: this.helpers.toDay(),
      date_stop: this.helpers.toDay()
    });


    // this.loadTable(this.formFillter);
    this.getItemType();
  }

  getItemType() {
    this.ItemTranSvc.getItemType({}).subscribe((resp) => {
      this.itemTypeRow = resp.data;
    });
  }

  getItem(e) {
    console.log(e.target.value);
    let item_type_id = e.target.value;
    this.ItemTranSvc.getItem({ item_type_id: item_type_id }).subscribe((resp) => {
      this.itemRow = resp.data;
      // this.tableSet();
    });
  }

  getlocation() {
    this.ItemTranSvc.getLocation({}).subscribe((resp) => {
      this.locRow = resp.data;
      console.log('loc row',this.locRow);
    });
  }

  loadTable(dataTablesParameters: FormGroup): void {
    let param =dataTablesParameters.value;
    delete param.item_type_id;
    let msgTop='';
    if(param.item_id){
      let itemName = this.itemRow.filter((obj)=>{ if(obj.id == param.item_id){ return obj; } })
      msgTop =`Item Name ${itemName[0].item_id}`;
    }
    if(this.formFillter.value.date_start && this.formFillter.value.date_stop){
      msgTop +=` From ${this.formFillter.value.date_start} To ${this.formFillter.value.date_stop}`;
    }

    this.ItemTranSvc.getAllLocataion(param).subscribe((resp :any) => {
      this.dataRow = resp.data;
      $('#example').DataTable().destroy();
      if (this.dataRow.length < 1) { alert('Data not found!'); } else {
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
            title: 'Item Location',
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
