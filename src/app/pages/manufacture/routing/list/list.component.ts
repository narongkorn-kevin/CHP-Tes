import { DialogRoutingEditComponent } from './../../../../shared/dialogs/dialog-routing/routing-edit/routing-edit.component';
import { DialogRoutingFormComponent } from './../../../../shared/dialogs/dialog-routing/routing-form/routing-form.component';
import { BaseFormRouting } from './../../../../shared/utils/base-form-routing';
import { RoutingService } from './../services/routing.service';
import { takeUntil } from 'rxjs/operators';
import { HelperService } from './../../../../shared/helper.service';
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
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  actionTODO = Action.NEW;
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  };
  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];
  public routingForm: BaseFormRouting
  public item_type_id: any;
  isValidFormSubmitted = null;


  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private routingSvc: RoutingService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dialog : MatDialog,
    private HelperService: HelperService
  ) { }

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
        dataTablesParameters['status'] = 'Open'
        that.routingSvc.getAll(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;
          console.log('dataTable',that.dataRow);

          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'name' },
        { data: 'description' },
        { data: 'std_time' },
        { data: 'status' },
        { data: 'status_by' },
        { data: 'status_at' },
        { data: 'reason' },
        { data: 'active' },
        { data: 'action', orderable: false }

      ]
    };

  }

  onEdit(data): void {


    this.router.navigate(['manufacture/routing/edit', data.id]);
  }

  onApprove(data): void {


    this.router.navigate(['manufacture/routing/approve', data.id]);
  }



  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRoutingFormComponent,{
      width: '1200px',
      height: '500px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        alert('Sucess');
      }

    });
  }


}
