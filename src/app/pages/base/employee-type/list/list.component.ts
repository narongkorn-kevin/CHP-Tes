import { takeUntil } from 'rxjs/operators';
import { CompanyService } from './../services/employee-type.service';
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
declare var $: any;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();
  public companyRow: any[];

  @ViewChild(MatSort) sort: MatSort;
  constructor(private companySvc: CompanyService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.companySvc.getAll().subscribe((company) => {
      this.companyRow = company.data;

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

}
