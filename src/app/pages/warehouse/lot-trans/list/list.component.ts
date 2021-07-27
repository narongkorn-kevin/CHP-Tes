import { BaseFormLotTrans } from './../../../../shared/utils/base-form-lot-trans';
import { BaseFormDepositApprove } from '@shared/utils/base-form-deposit-approve';
import { BaseFormDeposit } from '@shared/utils/base-form-deposit';
import { takeUntil } from 'rxjs/operators';
import { LotTransService } from './../services/lot-trans.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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

  id: string;
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lottransSvc: LotTransService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    public lottransForm: BaseFormLotTrans,
    public approveForm: BaseFormDepositApprove
  ) {

    // console.log('extras', this.router.getCurrentNavigation().extras.state.item_id);
    // this.id = this.router.getCurrentNavigation().extras.state.item_id;
    // console.log(this.id);
    // this.id = this.router.getCurrentNavigation().extras.state.item;
    // console.log(this.id);
   
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.loadTable(this.id);
    this.activatedRoute.params.subscribe(params => {
      // const id = params.i;
      this.loadTable(params);
    });

  }

  loadTable(params): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['item_id']= params.item_id
        dataTablesParameters['item_lot_id']= params.item_lot_id
        that.lottransSvc.getAll(dataTablesParameters).subscribe((resp) => {
          that.dataRow = resp.data.data;
         console.log('5555',that.dataRow);

          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'item_id' },
        { data: 'name' },
        { data: 'qty' },
        { data: 'create_by' },
        { data: 'created_at' },
        { data: 'lot_id' },
        { data: 'report_id' },

   
      
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


//   onEdit(data): void {
//     console.log(data);
//     // return false
//     const navigationExtras: NavigationExtras = {
//       state: {
//         item: {
//           id: data.id,
//           report_id: data.report_id,
//           status: data.status,
//           reason: data.reason,
//           role: '',
//         },
//       },
//     };

//     this.router.navigate(['warehouse/deposit/approve'], navigationExtras);
// }

// onEditTran(data): void {
//   console.log(data);
//   // return false
//   const navigationExtras: NavigationExtras = {
//     state: {
//       item: {
//         report_stock_id: data.id
//       },
//     },
//   };

//   this.router.navigate(['warehouse/item-tran/list'], navigationExtras);
// }



}
