import { UnitConvertionResponse } from './../../../../shared/models/base.interface';
import { UnitConvertionService } from './../services/unit-convertion.service';
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
  public ItemTypeData: any = [];
  private destroy$ = new Subject<any>();
  public dataRow: any[];
   public itemtype_id: any[];

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private unitconvertionSvc: UnitConvertionService,
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
    this.GetitemType();
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
        dataTablesParameters['item_type_id']=null
        that.unitconvertionSvc.getAll(dataTablesParameters).subscribe((resp) => {
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
        // { data: 'item_type_id.name' },
        // { data: 'unit_id.name' },
        { data: 'name' },
        { data: 'description' },
        { data: 'value' },
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
          item_type_id: data.item_type_id,
          unit_id: data.unit_id,
          name: data.name,
          description: data.description,
          value: data.value,
          status: data.status,
          role: '',
        },
      },
    };

    this.router.navigate(['base/unit-convertion/edit'], navigationExtras);
  }

  onDelete(unitconvertionId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.unitconvertionSvc
        .delete(unitconvertionId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: UnitConvertionResponse) => {
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

  GetitemType(): void {
    this.unitconvertionSvc.getitemtype().subscribe((resp) => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });
  }

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
    data['item_type_id']= event;
    this.unitconvertionSvc.getAll(data).subscribe((resp) => {
    this.dataRow = resp.data.data;

    });
  }
}
