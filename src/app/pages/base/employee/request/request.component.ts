import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
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
import { EmployeeResponse } from '@app/shared/models/base.interface';
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


@Component({
  selector: 'app-list',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements AfterViewInit, OnInit, OnDestroy {
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
  constructor(private router: Router, private employeeSvc: EmployeeService, private elementRef: ElementRef, private renderer: Renderer2) { }

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


  //   this.employeeSvc.getAll().subscribe((employee) => {
  //     this.dataRow = employee.data;

  //     const script = this.renderer.createElement('script');
  //     script.src = 'assets/plugins/datatable/js/dataTables.buttons.min.js';
  //     script.onload = () => {
  //       console.log('script loaded');
  //       const table = $('#example').DataTable({
  //         // dom: 'lBfrtiBp',
  //         lengthChange: true,
  //         buttons: ['copy', 'excel', 'pdf', 'colvis'],
  //         responsive: true,
  //         language: {
  //           searchPlaceholder: 'Search...',
  //           sSearch: '',
  //           lengthMenu: '_MENU_ ',
  //         }
  //       });
  //       table.buttons().container()
  //         .appendTo('#example_wrapper .col-md-6:eq(0)');

  //     };
  //     this.renderer.appendChild(this.elementRef.nativeElement, script);
  //     // this.dataSource.data = company;
  //   });
  // }

  loadTable(): void {

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.employeeSvc.getAllReqeust(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;
          console.log(this.dataRow);
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: []
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'user_id' },
        { data: 'image' },
        { data: 'name' },
        { data: 'department.name' },
        { data: 'position.name' },
        { data: 'branch.name' },
        { data: 'status' },
        { data: 'created_at' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onActivate(data): void {
    console.log('success');
    // return false
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          email: data.email,
          password: '',
          confirm_password: '',
          image_url: data.image,
          image: '',
          signature: '',
          signature_url: data.signature,
          branch_id: data.branch_id,
          permission_id: data.permission_id,
          department_id: data.department_id,
          position_id: data.position_id,
          status: data.status,
          line_token: data.line_token,
          role: '',
          // company_id: data.company_id,
          // name_th: data.name_th,
          // name_en: data.name_en,

        }
      }
    };

    this.router.navigate(['base/employee/activate'], navigationExtras);
  }

  onDelete(employeeId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.employeeSvc
        .delete(employeeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: EmployeeResponse) => {
          if (res.code === 200) {
            this.rerender();
            console.log('rerendersuccess');
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
