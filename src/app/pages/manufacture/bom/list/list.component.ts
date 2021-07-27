import { BomService } from './../services/bom.service';
import { takeUntil } from 'rxjs/operators';
import { HelperService } from './../../../../shared/helper.service';
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
import { NavigationExtras, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  };
  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];
  public item_type_id: any;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private bomSvc: BomService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private HelperService: HelperService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadTable();
  }



  loadTable(): void {

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['status'] = null
        that.bomSvc.getAll(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;
          console.log('dataTable',that.dataRow);

          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'bom_id' },
        { data: 'bom_name' },
        { data: 'item.name' },
        { data: 'unit_convertion.name' },
        { data: 'qty' },
        { data: 'status' },
        { data: 'status_by' },
        { data: 'status_at' },
        { data: 'reason' },
        { data: 'active' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onEdit(data): void {
    // console.log('success');
    // // return false
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     item: {
    //       id: data.id ,
    //       item_id: data.item_id,
    //       item_type_id: data.item_type_id,
    //       size_id: null,
    //       select_file: '',
    //       image: '',
    //       image_preview: data.image,
    //       name: data.name,
    //       size: data.size,
    //       min: data.min,
    //       max: data.max,
    //       price: data.price,
    //       unit_sell_id: data.unit_sell_id,
    //       unit_buy_id: data.unit_buy_id,
    //       unit_store_id: data.unit_store_id,
    //       material_type_id: data.material_type_id,
    //       material_grade_id: data.material_grade_id,
    //       material_color_id: data.material_color_id,
    //       material_manufactu_id: data.material_manufactu_id,
    //       spare_type_id: data.spare_type_id,
    //       location_id: data.location_id,
    //       role: '',
    //     }
    //   }
    // };

    this.router.navigate(['manufacture/bom/edit', data.id]);
  }

  // onDelete(itemId: number): void {
  //   if (window.confirm('Do you really want remove this data')) {
  //     this.bomSvc
  //       .delete(itemId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res: ItemResponse) => {
  //         if (res.code == 201) {
  //           this.rerender();
  //         }

  //       });
  //   }
  // }


}
