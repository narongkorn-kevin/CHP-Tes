// import { BaseFormMovementApprove } from '@shared/utils/base-form-movement-approve';
import { BaseFormMovement } from '@shared/utils/base-form-movement';
import { takeUntil } from 'rxjs/operators';
import { MovementService } from './../services/movement.service';
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
import { MovementResponse } from '@app/shared/models/base.interface';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();
  actionTODO = Action.NEW;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }),
  };

  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private movementSvc: MovementService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    public movementForm: BaseFormMovement
    // public approveForm: BaseFormMovementApprove
  ) {}

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
      order: [[2,'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['type']='Movement'
        that.movementSvc.getAll(dataTablesParameters).subscribe((resp) => {
          that.dataRow = resp.data.data;

          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'id' },
        { data: 'report_id' },
        { data: 'date' },
        { data: 'create_by' },
        { data: 'stutus' },
        { data: 'stutus_by' },
        { data: 'stutus_at' },
        { data: 'reason' },
        { data: 'action', orderable: false },
        { data: 'action', orderable: false },
        { data: 'action', orderable: false },
      ],
    };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  onViewpdf(data): void {
    window.open('https://asada.logo-design360.com/asada-api/public/api/report_stockFG_PDF/' + data);
  }

  onApprove(data): void{
    
    console.log(data);


  }

  onEdit(data): void {
    console.log(data);
    // return false
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     item: {
    //       id: data.id,
    //       report_id: data.report_id,
    //       status: data.status,
    //       reason: data.reason,
    //       role: '',
    //     },
    //   },
    // };

    this.router.navigate(['warehouse/movement/edit/'+data.id]);
}
onEditTran(data): void {
  console.log(data);
  // return false
  // const navigationExtras: NavigationExtras = {
  //   state: {
  //     item: {
  //       report_stock_id: data.id
  //     },
  //   },
  // };

  this.router.navigate(['warehouse/item-tran/list/'+data.id]);
}
}
