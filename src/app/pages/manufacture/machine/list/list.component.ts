import { MachineResponse } from './../../../../shared/models/base.interface';
import { MachineService } from './../serivces/machine.service';
import { takeUntil } from 'rxjs/operators';
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
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { PositionResponse } from '@app/shared/models/base.interface';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
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
  constructor(private router: Router ,
    private machineSvc: MachineService,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

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
      ajax: (dataTablesParameters: any, callback) => {
        that.machineSvc  .getAll(dataTablesParameters).subscribe(resp => {
            that.dataRow = resp.data.data;
            console.log('datatable',that.dataRow);
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total,
              data: []
            });
          });
      },
      columns: [
        { data: 'No' },
        { data: 'name' },
        { data: 'setup_time' },
        { data: 'create_by' },
        { data: 'updated_at' },
        { data: 'created_at' },
        { data: 'update_by' },
        { data: 'status' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onEdit(data): void {
    // console.log(data);
    // // return false
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     item: {
    //       id: data.id,
    //       name: data.name,
    //       status: data.status,
    //       // name_th: data.name_th,
    //       // name_en: data.name_en,
    //       role: '',
    //     }
    //   }
    // };

    this.router.navigate(['manufacture/machine/edit',data.id]);
  }

  onDelete(machineId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.machineSvc
        .delete(machineId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: MachineResponse) => {
          if (res.code == 201){
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
