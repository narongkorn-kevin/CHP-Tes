
import { BaseFormItemTran } from './../../../../shared/utils/base-form-item-tran';
import { BaseFormDepositApprove } from '@shared/utils/base-form-deposit-approve';
import { BaseFormDeposit } from '@shared/utils/base-form-deposit';
import { takeUntil } from 'rxjs/operators';
import { ItemTranService } from './../services/item-tran.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router,ActivatedRoute ,NavigationExtras } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { DepositResponse } from '@app/shared/models/base.interface';
import { BaseFormItemTranEdit } from '@app/shared/utils/base-form-item-tran-edit';
import { param } from 'jquery';
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
  params:any;
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
    private itemtranSvc: ItemTranService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    public itemtranForm: BaseFormItemTran,
    public editForm: BaseFormItemTranEdit,
    private route : ActivatedRoute,
    
  ) {
    // this.id = this.router.getCurrentNavigation().extras.state.item;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.loadTable(id);
    });

  }

  loadTable(id): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      order: [[7,'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['report_stock_id']= id
        that.itemtranSvc.getAll(dataTablesParameters).subscribe((resp) => {
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
        { data: 'name' },
        { data: 'qty' },
        { data: 'balance' },
        { data: 'location_1' },
        { data: 'create_by' },
        { data: 'created_at' },
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
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          item_id: data.item_id,
          name: data.item.name,
          qty: data.qty,
          location_1_id: data.location_1_id,
          balance: data.balance,
          remark: data.remark,
          customer_id: data.customer_id,
          type: data.type,
          role: '',
        },
      },
    };

    this.router.navigate(['warehouse/item-tran/edit'], navigationExtras);
}

}
