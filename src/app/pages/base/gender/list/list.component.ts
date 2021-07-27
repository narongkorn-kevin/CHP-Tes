import { takeUntil } from 'rxjs/operators';
import { GenderService } from './../services/gender.services.service';
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

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  dtOptions: DataTables.Settings = {};
  persons: Person[];

  private destroy$ = new Subject<any>();
  public genderRow: any[];

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private genderSvc: GenderService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    // const that = this;

    // that.http
    //   .post<DataTablesResponse>(
    //     'https://angular-datatables-demo-server.herokuapp.com/', {}
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

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2,
    //   serverSide: true,
    //   processing: true,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     that.http
    //       .post<DataTablesResponse>(
    //         'https://angular-datatables-demo-server.herokuapp.com/',
    //         dataTablesParameters, {}
    //       ).subscribe(resp => {
    //         that.persons = resp.data;
    //         callback({
    //           recordsTotal: resp.recordsTotal,
    //           recordsFiltered: resp.recordsFiltered,
    //           data: []
    //         });
    //       });
    //   },
    //   columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    // };
    this.genderSvc.getAll().subscribe((gender) => {
      this.genderRow = gender.data;

      const script = this.renderer.createElement('script');
      script.src = 'assets/plugins/datatable/js/dataTables.buttons.min.js';
      script.onload = () => {
        console.log('script loaded');
        const table = $('#example').DataTable({
          // dom: 'lBfrtiBp',
          lengthChange: true,
          buttons: ['copy', 'excel', 'pdf', 'colvis'],
          responsive: true,
          language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ ',
          }
        });
        table.buttons().container()
          .appendTo('#example_wrapper .col-md-6:eq(0)');

      };
      this.renderer.appendChild(this.elementRef.nativeElement, script);
      // this.dataSource.data = company;
    });
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

    this.router.navigate(['base/gender/edit'], navigationExtras);
  }

  onDelete(genderId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.genderSvc
        .delete(genderId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.genderSvc.getAll().subscribe((gender) => {
            this.genderRow = gender.data;
          });
        });
    }
  }
}
