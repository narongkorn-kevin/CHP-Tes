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
import { HelperService } from '../../../shared/helper.service';
import { ItemService } from '../../services/item.service';
declare const $: any;
declare const M: any;
@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {


  public dtOptions: DataTables.Settings = {};
  dataRow: any;
  itemTypeRow = [];
  locationRow = [];
  wareHouseRow = [];
  item: any;
  constructor(
    private services: ItemService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private helpers: HelperService
  ) {
  }




  ngOnInit(): void {
    this.tableSet();

  }





  loadTable(param): void {
    this.services.getAll(param).subscribe((resp) => {
      $('#example').DataTable().destroy();
      this.dataRow = resp.data;
      if (this.dataRow.length < 1) { alert('Data not found!'); } else {
        let msgTop='';

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
