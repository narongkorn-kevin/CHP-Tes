import { takeUntil } from 'rxjs/operators';
import { CompanyService } from './../services/company.service';
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
  public companyRow: any[];

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private companySvc: CompanyService, private elementRef: ElementRef, private renderer: Renderer2, private http: HttpClient) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    const that = this;

    // that.http
    //   .post<DataTablesResponse>(
    //     environment.API_URL + '/api/branch_page', {}
    //   ).subscribe(resp => {
    //     that.persons = resp.data;
    //     // console.log(that.persons);
    //     // alert(that.persons.length);
    //   });

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   serverSide: true,
    //   orderCellsTop: true,
    // };

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            environment.API_URL + '/api/branch_page',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.companyRow = resp.data;
            callback({
              recordsTotal: resp.to,
              recordsFiltered: resp.total,
              data: []
            });
          });
      },
      columns: [
        { data: 'id' },
        { data: 'firstName' },
        { data: 'lastName' }
      ]
    };

    // this.companySvc.getAll().subscribe((company) => {
    //   this.companyRow = company.data;

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

  onEdit(data): void {
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          name_th: data.name_th,
          name_en: data.name_en,
          role: '',
        }
      }
    };

    this.router.navigate(['base/company/edit'], navigationExtras);
  }

  onDelete(companyId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.companySvc
        .delete(companyId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.companySvc.getAll().subscribe((company) => {
            this.companyRow = company.data;
          });
        });
    }
  }
}
