import { MaterialColorService } from './../services/material-color.service';
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
import { MaterialColorResponse } from '@app/shared/models/base.interface';
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
    private materialcolorSvc: MaterialColorService,
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
    // this.branchSvc.getAll().subscribe((branch) => {
    //   this.dataRow = branch.data;
    //   console.log(this.dataRow);

    //   const script = this.renderer.createElement('script');
    //   script.src = 'assets/plugins/datatable/js/dataTables.buttons.min.js';
    //   script.onload = () => {
    //     console.log('script loaded');
    //     const table = $('#example').DataTable({
    //       // dom: 'lBfrtiBp',
    //       lengthChange: true,
    //       buttons: ['copy', 'excel', 'pdf', 'colvis'],
    //       responsive: true,
    //       language: {
    //         searchPlaceholder: 'Search...',
    //         sSearch: '',
    //         lengthMenu: '_MENU_ ',
    //       }
    //     });
    //     table.buttons().container()
    //       .appendTo('#example_wrapper .col-md-6:eq(0)');

    //   };
    //   this.renderer.appendChild(this.elementRef.nativeElement, script);
    //   // this.dataSource.data = company;
    // });

  }

  loadTable(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.materialcolorSvc.getAll(dataTablesParameters).subscribe((resp) => {
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
        // { data: 'code' },
        { data: 'name' },
        { data: 'create_by' },
        { data: 'update_by' },
        { data: 'created_at' },
        { data: 'updated_at' },
        { data: 'status' },
        { data: 'action', orderable: false },
      ],
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
        },
      },
    };

    this.router.navigate(['base/material-color/edit'], navigationExtras);
  }

  onDelete(materialcolorId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.materialcolorSvc
        .delete(materialcolorId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: MaterialColorResponse) => {
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
}
