import { ConfigStockService } from './../services/config-stock.service';
import { ConfigStockResponse } from './../../../../shared/models/base.interface';
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
  public ConfigscotkData: any = [];
  private destroy$ = new Subject<any>();
  public dataRow: any[];
  public dataRowFilter: any[];
  public warehouse_id: any[];

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private configstockSvc: ConfigStockService,
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
    this.GetConfigStock();
    // this.headers = new HttpHeaders();

    // this.headers = this.headers.append('Authorization', "Bearer " + localStorage.getItem(''));

    // this.loadTable();
    // this.GetWarehouse();

  }

  // loadTable(): void {
  //   const that = this;
  //   this.dtOptions = {
  //     pagingType: 'full_numbers',
  //     pageLength: 10,
  //     serverSide: true,
  //     processing: true,
  //     ajax: (dataTablesParameters: any, callback) => {
  //       dataTablesParameters['status']= 'Open';
  //       that.configstockSvc.getAll(dataTablesParameters).subscribe((resp) => {
  //         that.dataRow = resp.data.data;
  //         console.log('console',that.dataRow);
  //         // that.dataRowFilter = that.dataRow;
  //         callback({
  //           recordsTotal: resp.data.total,
  //           recordsFiltered: resp.data.total,
  //           data: [],
  //         });
  //       });
  //     },
  //     columns: [
  //       { data: 'id' },
  //       { data: 'item_type.name' },
  //       { data: 'user_approver.name' },
  //       { data: 'user_manager.name' },
  //       // { data: 'status' },
  //       { data: 'create_by' },
  //       { data: 'update_by' },
  //       { data: 'created_at' },
  //       { data: 'updated_at' },
  //       { data: 'action', orderable: false },
  //     ],
  //   };
  // }



  GetConfigStock(): void {
    this.configstockSvc.getconfig_stock().subscribe(resp => {
      this.ConfigscotkData = resp.data;
      console.log(this.ConfigscotkData);
    });

  }


  // onDelete(stockcontrolId: number): void {
  //   if (window.confirm('Do you really want remove this data')) {
  //     this.configstockSvc
  //       .delete(stockcontrolId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res: StockControlResponse) => {
  //         if (res.code == 201) {
  //           this.rerender();
  //         }
  //         // this.branchSvc.getAll().subscribe((branch) => {
  //         // this.dataRow = branch.data;
  //         // });
  //       });
  //   }
  // }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
