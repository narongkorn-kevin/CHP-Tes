import { BaseFormStation } from './../../../../shared/utils/base-form-station';

import { takeUntil } from 'rxjs/operators';
import { StationService } from './../services/station.service';
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
import { StationResponse } from '@app/shared/models/base.interface';
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
    private stationSvc: StationService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    public stationForm: BaseFormStation,
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
    console.log('555',this.loadTable)
    
  }

  loadTable(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['status']='Open'
        that.stationSvc.getAll(dataTablesParameters).subscribe((resp) => {
          that.dataRow = resp.data.data;
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'name' },
        { data: 'description' },
        { data: 'status' },
        { data: 'create_by' },
        { data: 'update_by' },
        { data: 'created_at' },
        { data: 'updated_at' },
        { data: 'action' },

      ],
    };
    console.log('333',this.dtOptions)
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  // onViewpdf(data): void {
  //   window.open('https://asada.logo-design360.com/asada-api/public/api/report_stockFG_PDF/' + data);
  // }

  onEdit(data): void {
    console.log(data);
    this.router.navigate(['manufacture/station/edit/' + data.id]);
  }
}
