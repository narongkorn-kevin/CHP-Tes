import  Swal  from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BenefitService } from './../service/benefit.service';
import { BenefitResponse } from './../../shared/models/base.interface';

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
  public ServiceGroupData: any = [];
  public ServiceData: any = [];
  public AgeData: any = [];
  formFillter: FormGroup;



  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router,
    private benefitSvc: BenefitService,
    private elementRef: ElementRef,
    public fb: FormBuilder,
    private renderer: Renderer2) {
    this.formFillter = this.fb.group({
      service_group_id: '',
      service_id: '',
      age_id: '',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.loadTable();
    this.GetServiceGroup();
    this.GetService();
    this.GetAgeRange();

  }

  loadTable(): void {


    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['service_group_id'] = null;
        dataTablesParameters['service_id'] = null;
        dataTablesParameters['age_id'] = null;
        that.benefitSvc.getAll(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;
          console.log('datatable', that.dataRow);
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: []
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'service_group_name' },
        { data: 'name' },
        { data: 'age_id' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onEdit(data): void {

    this.router.navigate(['benefit/edit', data.id]);
  }

  onDelete(benefitId: number): void {
    Swal.fire({
      title: 'Warning!',
      text: "คุณต้องการลบริการ ใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.benefitSvc
          .delete(benefitId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res: BenefitResponse) => {
            if (res.code == 201) {
              this.rerender();
            }
            // this.branchSvc.getAll().subscribe((branch) => {
            // this.dataRow = branch.data;
            // });
          });
      }
    });
   
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }


  GetServiceGroup(): void {
    this.benefitSvc.get_service_group().subscribe((resp) => {
      this.ServiceGroupData = resp.data;
      console.log(this.ServiceGroupData);
    });
  }
  GetService(): void {
    this.benefitSvc.get_service().subscribe((resp) => {
      this.ServiceData = resp.data;
      console.log(this.ServiceData);
    });
  }
  GetAgeRange(): void {
    this.benefitSvc.get_age().subscribe((resp) => {
      this.AgeData = resp.data;
      console.log(this.AgeData);
    });
  }


  // Onsearch(form: FormGroup): void {
  //   console.log('test',form.value);

  //   let formValue = form.value;
  //   const that = this;
  //   this.dtOptions = {
  //     pagingType: 'full_numbers',
  //     pageLength: 10,
  //     serverSide: true,
  //     processing: true,
  //     ajax: (dataTablesParameters: any, callback) => {
  //       dataTablesParameters['service_group_id'] = formValue.service_group_id;
  //       dataTablesParameters['service_id'] = formValue.service_id;
  //       dataTablesParameters['age_id'] = formValue.age_id;
  //       that.benefitSvc.getAll(dataTablesParameters).subscribe(resp => {
  //         that.dataRow = resp.data.data;
  //         console.log('datatable', that.dataRow);
  //         callback({
  //           recordsTotal: resp.data.total,
  //           recordsFiltered: resp.data.total,
  //           data: []
  //         });
  //       });
  //     },
  //     columns: [
  //       { data: 'No' },
  //       { data: 'service_group_name' },
  //       { data: 'name' },
  //       { data: 'age_id' },
  //       { data: 'action', orderable: false }
  //     ]
  //   };

  // }

  Onsearch(form: FormGroup): void {
    console.log('test',form.value);

    let formValue = form.value;
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['service_group_id'] = formValue.service_group_id;
        dataTablesParameters['service_id'] = formValue.service_id;
        dataTablesParameters['age_id'] = formValue.age_id;
        that.benefitSvc.getAll(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;
          console.log('datatable', that.dataRow);
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: []
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'service_group_name' },
        { data: 'name' },
        { data: 'age_id' },
        { data: 'action', orderable: false }
      ]
    };

  }

}
