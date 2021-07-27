import { takeUntil } from 'rxjs/operators';
import { SaleorderService } from './../services/sale.service';
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
declare var $: any;
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Person } from '../../../../shared/models/user.interface';
import { environment } from '@env/environment';

class DataTablesResponse {
  data: any[];
  draw: number;
  to: number;
  total: number;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  public dtOptions: DataTables.Settings = {};
  persons: Person[];

  private destroy$ = new Subject<any>();
  public saleRow: any[];
  public dataRow: any[];

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private saleSvc: SaleorderService, private renderer: Renderer2, private http: HttpClient) { }

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
      order: [[1,'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.status = 'Open';
        that.saleSvc.getAll(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;

          // console.log("test " + that.dataRow);
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: []
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'order_id' },
        { data: 'customer_id' },
        { data: 'user_id' },
        { data: 'date' },
        { data: 'status' },
        { data: 'status_at' },
        // { data: 'updated_at' },
        // { data: 'created_at' },
        // { data: 'update_by' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onEdit(data): void {
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     item: {
    //       id: data.id,
    //       order_id: data.order_id,
    //       date: data.date,
    //       ref_no: data.ref_no,
    //       shipping_date: data.shipping_date,
    //       shipping_term: data.shipping_term,
    //       customer_id: data.customer_id,
    //       user_id: data.user_id,
    //       remark: data.remark,
    //       amount: data.amount,
    //       tax: data.tax,
    //       tax_amount: data.tax_amount,
    //       net_amount: data.net_amount,
    //       role: '',
    //     }
    //   }
    // };
    this.router.navigate(['/warehouse/sale/edit', data.id]);
    // this.router.navigate(['warehouse/sale/edit'], navigationExtras);
  }

  // onDelete(companyId: number): void {
  //   if (window.confirm('Do you really want remove this data')) {
  //     this.saleSvc
  //       .delete(companyId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res) => {
  //         this.saleSvc.getAll().subscribe((company) => {
  //           this.saleRow = company.data;
  //         });
  //       });
  //   }
  // }
}
