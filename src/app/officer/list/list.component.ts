import { takeUntil } from 'rxjs/operators';

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
import { OfficerResponse } from '@app/shared/models/base.interface';
import { BaseFormOfficer } from '@shared/utils/base-form-officer';

import { OfficeServiceService } from '../service/office-service.service';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];
  

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private officerServ: OfficeServiceService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    //public officerForm: BaseFormOfficer
  ) {}


  ngOnInit(): void {
    //$("#officerTbData").DataTable();
    //this.dataRow = [];
    this.onloadTable();
  }

  onloadTable(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['status']='Yes'
        that.officerServ.getAll(dataTablesParameters).subscribe((resp) => {
          that.dataRow = resp.data.data;
          console.log('test',that.dataRow);

          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'id' },
        { data: 'fname_th' },
        { data: 'lname_th' },
        { data: 'position' },
        { data: 'email' },
        { data: 'phone' },
        { data: 'edit' },
        { data: 'del' }
      ]
    };
  }

  onSearch(): void {

    // if (this.positionForm.baseForm.invalid) {
    //   return;
    // }

    // const formValue = this.positionForm.baseForm.value;
    // if (this.actionTODO === Action.NEW) {
    //   this.positionSvc.new(formValue).subscribe((res) => {

    //     this.router.navigate(['base/position/list']);
    //   });
    // }
  }

  onEdit(data): void {
    console.log(data);
    // return false
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          //name: data.name,
          id_card: data.id_card,
          //password:  data.password,
          prefix_th:  data.prefix_th,
          prefix_en:  data.prefix_en,
          fname_th:  data.fname_th,
          lname_th:  data.lname_th,
          fname_en:  data.fname_en,
          lname_en: data.lname_en,
          position: data.position,
          email: data.email,
          village:  data.village,
          village_no: data.village_no,
          alley:  data.alley,
          road: data.road,
          sub_district:  data.sub_district,
          district:  data.district,
          province:  data.province,
          postal_code:  data.postal_code,
          phone:  data.phone,
          mobile_phone: data.mobile_phone,
          status: data.status,
          // name_th: data.name_th,
          // name_en: data.name_en,
          role: '',
        }
      }
    };

    this.router.navigate(['officer/edit'], navigationExtras);
  }

  onDelete(offierId : number): void {
    console.log(offierId);
    // if (window.confirm('Do you really want remove this data')) {
    //   this.positionSvc
    //     .delete(positionId)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((res: PositionResponse) => {
    //       if (res.code == 201){
    //         this.rerender();
    //       }
    //       // this.branchSvc.getAll().subscribe((branch) => {
    //         // this.dataRow = branch.data;
    //       // });
    //     });
    // }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }


}
