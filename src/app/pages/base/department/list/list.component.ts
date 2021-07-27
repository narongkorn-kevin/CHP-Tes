import { takeUntil } from 'rxjs/operators';
import { DepartmentService } from './../services/department.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { DataTableDirective } from 'angular-datatables';
import { DepartmentResponse } from '@app/shared/models/base.interface';

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

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router,
              private departmentSvc: DepartmentService,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private http: HttpClient
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
        // tslint:disable-next-line: deprecation
        that.departmentSvc.getAll(dataTablesParameters).subscribe(resp => {
            that.dataRow = resp.data.data;
            callback({
              recordsTotal: resp.total,
              recordsFiltered: resp.total,
              data: []
            });
          });
      },
      columns: [
        { data: 'No' },
        { data: 'name' },
        { data: 'create_by' },
        { data: 'update_by' },
        { data: 'created_at' },
        { data: 'updated_at' },
        { data: 'status' },
        { data: 'action' },
      ]
    };

  }

  onEdit(data): void {
    console.log(data);
    // return false
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          name: data.name,
          status: data.status,
          role: '',
        }
      }
    };

    this.router.navigate(['base/department/edit'], navigationExtras);
  }

  onDelete(departmentId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.departmentSvc
        .delete(departmentId)
        .pipe(takeUntil(this.destroy$))
        // tslint:disable-next-line: deprecation
        .subscribe((res: DepartmentResponse) => {
          if (res.code === 201){
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

}
