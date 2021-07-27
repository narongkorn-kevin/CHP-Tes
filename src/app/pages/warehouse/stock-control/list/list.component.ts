import { StockControlResponse } from './../../../../shared/models/base.interface';
import { StockControlService } from './../services/stock-control.service';
import { takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import {
  ItemTypeResponse,
  LocationResponse,
} from '@app/shared/models/base.interface';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();
  eventname: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }),
  };

  public dtOptions: DataTables.Settings = {};
  public WarehouseData: any = [];
  private destroy$ = new Subject<any>();
  public dataRow: any[];
  public dataRowFilter: any[];
  public warehouse_id: any[];

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private stockcontrolSvc: StockControlService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.headers = new HttpHeaders();

    // this.headers = this.headers.append('Authorization', "Bearer " + localStorage.getItem(''));

    this.loadTable();
    // this.GetWarehouse();

  }

  loadTable(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['status']= 'Open';
        that.stockcontrolSvc.getAll(dataTablesParameters).subscribe((resp) => {
          that.dataRow = resp.data.data;
          console.log('console',that.dataRow);
          // that.dataRowFilter = that.dataRow;
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'id' },
        { data: 'item_type.name' },
        { data: 'user_approver.name' },
        { data: 'user_manager.name' },
        // { data: 'status' },
        { data: 'create_by' },
        { data: 'update_by' },
        { data: 'created_at' },
        { data: 'updated_at' },
        { data: 'action', orderable: false },
      ],
    };
  }

  onEdit(data): void {
    // console.log(data);
    // // return false
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     item: {
    //       id: data.id,
    //       item_type_id: data.item_type_id,
    //       approver_id: data.approver_id,
    //       manager_id: data.manager_id,
    //       role: '',
    //     },
    //   },
    // };

    this.router.navigate(['warehouse/stock-control/edit',data.id]);
  }

  onDelete(stockcontrolId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.stockcontrolSvc
        .delete(stockcontrolId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: StockControlResponse) => {
          if (res.code == 201) {
            this.rerender();
          }
          // this.branchSvc.getAll().subscribe((branch) => {
          // this.dataRow = branch.data;
          // });
        });
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  // GetWarehouse(): void {
  //   this.stockcontrolSvc.getWarehouse().subscribe((resp) => {
  //     this.WarehouseData = resp.data;
  //     console.log(this.WarehouseData);
  //   });
  // }

  onChangeType(event: any): void {
    // this.loadTable();
    var data = {
      draw: 1,
      columns: [
        {
          data: 'id',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'code',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'name',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'create_by',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'update_by',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'created_at',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'updated_at',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'action',
          name: '',
          searchable: true,
          orderable: false,
          search: { value: '', regex: false },
        },
      ],
      order: [{ column: 0, dir: 'asc' }],
      start: 0,
      length: 10,
      search: { value: '', regex: false },
    };
    // this.dataRow = this.dataRowFilter.filter((item) => {
    //   if (item.warehouse_id == event) {
    //      return item;
    //   }
    // });
    data['warehouse_id']= event;
    this.stockcontrolSvc.getAll(data).subscribe((resp) => {
    this.dataRow = resp.data.data;

    });
  }
}
