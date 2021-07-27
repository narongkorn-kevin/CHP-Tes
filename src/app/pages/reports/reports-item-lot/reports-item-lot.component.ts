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
import { ReportsItemLotService } from './../services/reports-item-lot.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;
declare const M: any;

@Component({
  selector: 'app-reports-item-lot',
  templateUrl: './reports-item-lot.component.html',
  styleUrls: ['./reports-item-lot.component.scss']
})
export class ReportsItemLotComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  dataRow: any;
  formFillter: FormGroup;
  itemTypeRow = [];
  itemRow: any;
  item: any;
  params:any;
  constructor(
    private services: ReportsItemLotService,
    private renderer: Renderer2,
    public fb: FormBuilder,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formFillter = this.fb.group({
      item_type_id: [''],
      item_id: [null],
      date_start: [null],
      date_stop: [null]
    });
  }




  ngOnInit(): void {

    this.route.queryParams.subscribe((param)=>{ this.params = param; });
    if(this.params.item_type_id){
      this.getItem({target:{value:this.params.item_type_id}}); 
    }

    this.formFillter.patchValue({
      item_type_id: this.params.item_type_id,
      item_id: this.params.item_id,
      date_start: '',
      date_stop: ''
    });
    // this.loadTable(this.formFillter);
    this.getItemType();
    if(this.params.item_type_id && this.params.item_id){
      this.loadTable(this.formFillter);
    }
  }

  getItemType() {
    this.services.getItemType({}).subscribe((resp) => {
      this.itemTypeRow = resp.data;
      if(this.formFillter.value.item_id){
        this.formFillter.patchValue({item_id:this.formFillter.value.item_id})
        setTimeout(() => {
        }, 500);
      }
    });
  }

  getItem(e) {
    console.log(e.target.value);
    let item_type_id = e.target.value;
    this.services.getItem({ item_type_id: item_type_id }).subscribe((resp) => {
      this.itemRow = resp.data;
      // this.tableSet();
    });
  }

  loadTable(dataTablesParameters: FormGroup): void {
    let param = dataTablesParameters.value;
    if (!param.item_id) {
      alert('Please select item!');
      return;
    }
    delete param.item_type_id;
    const that = this;


    this.services.getAll(param).subscribe((resp) => {
      $('#example').DataTable().destroy();
      this.dataRow = resp.data;
      if (this.dataRow.length < 1) { alert('Data not found!'); } else {
        this.tableSet();
      }
    });
  }

  tableSet() {
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
            extend: 'copy',
          },
          {
            extend: 'excelHtml5',
            title: 'Report Item Lot'
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

  tableClear() {
    let table = $('#example').DataTable();
    table
      .clear()
      .draw();
  }

}
