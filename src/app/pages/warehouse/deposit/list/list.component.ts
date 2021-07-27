import { BaseFormDepositApprove } from '@shared/utils/base-form-deposit-approve';
import { BaseFormDeposit } from '@shared/utils/base-form-deposit';
import { takeUntil } from 'rxjs/operators';
import { DepositService } from './../services/deposit.service';
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
import { DepositResponse } from '@app/shared/models/base.interface';
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
    private depositSvc: DepositService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    public depositForm: BaseFormDeposit,
    public approveForm: BaseFormDepositApprove
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
      order: [[2,'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['type']='Deposit'
        that.depositSvc.getAll(dataTablesParameters).subscribe((resp) => {
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
        { data: 'status' },
        { data: 'status_by' },
        { data: 'status_at' },
        { data: 'reason' },
        { data: 'action'},
        { data: 'action'},
        { data: 'action'},
        
      ],
    };
  }

  // onEdit(data): void {
  //   console.log(data);
  //   // return false
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       item: {
  //         id: data.id,
  //         name: data.name,
  //         role: '',
  //       },
  //     },
  //   };

  //   this.router.navigate(['base/branch/edit'], navigationExtras);
  // }

  // onDelete(branchId: number): void {
  //   if (window.confirm('Do you really want remove this data')) {
  //     this.branchSvc
  //       .delete(branchId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res: BranchResponse) => {
  //         if (res.code === 201) {
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

  onViewpdf(data): void {
    window.open('https://asada.logo-design360.com/asada-api/public/api/report_stockFG_PDF/' + data);
  }

  onApprove(data): void{
    // console.log(this.depositForm.baseForm.value)
    console.log(data);

  //   if (this.depositForm.baseForm.invalid) {
  //     return;
  //   }
  //   const formValue = this.depositForm.baseForm.value;
  //   console.log(formValue);
  //   // return false
  //   if (this.actionTODO === Action.EDIT) {
  //     this.depositSvc.update(formValue.id, formValue).subscribe((res) => {
  //       this.router.navigate(['base/branch/list']);
  //     });
  //   }
  //   // this.http.put('http://127.0.0.1:8000/api/edit_Product/' + this.depositForm.baseForm, this.editForm.value)
  // }

  }

  onEdit(data): void {
    console.log(data);
    // // return false
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

    this.router.navigate(['warehouse/deposit/edit/' + data.id]);
}

onEditTran(data): void {
  console.log(data);
  // // return false
  // const navigationExtras: NavigationExtras = {
  //   state: {
  //     item: {
  //       report_stock_id: data.id
  //     },
  //   },
  // };

  this.router.navigate(['warehouse/item-tran/list/'+ data.id]);
}



}
