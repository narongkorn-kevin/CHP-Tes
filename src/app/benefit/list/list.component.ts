import Swal from 'sweetalert2';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BenefitService } from './../service/benefit.service';
import { BenefitResponse } from './../../shared/models/base.interface';

import { startWith, takeUntil, map } from 'rxjs/operators';
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
import { Subject, Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;


  separatorKeysCodes = [ENTER, COMMA];

  fruitCtrl = new FormControl();
  ServiceCtrl = new FormControl();

  filteredFruits: Observable<any[]>;
  filteredService: Observable<any[]>;

  fruits = [ ];
  ServiceSelect = [ ];

  allFruits = [''];
  AllServiceSelect = [''];


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  };

  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];
  public ServiceGroupData: any = [];
  public ServiceData: any = [];
  // public allFruits: any = [];
  // public fruits: any = [];
  public AgeData: any = [];
  formFillter: FormGroup;


  @ViewChild('fruitInput') fruitInput: ElementRef;

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


    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this.filter(fruit) : this.allFruits.slice()));

      this.filteredService = this.ServiceCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this.filter(fruit) : this.allFruits.slice()));




  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log('event',event);


  }
  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allFruits.filter(fruit =>
        fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    console.log('selected event',event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
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
        { data: 'age_id.name' },
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
      text: "คุณต้องการลบบริการ ใช่หรือไม่?",
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
      this.allFruits = this.ServiceGroupData;
      console.log('allfruit',this.allFruits);
      this.fruitCtrl.setValue(null);
    });
  }
  GetService(): void {
    this.benefitSvc.get_service().subscribe((resp) => {
      this.ServiceData = resp.data;
      this.allFruits = this.ServiceData;
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
    var data = {
      draw: 1,
      columns: [
        {
          data: 'No',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'service_group_name',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'name',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'age_id.name',
          name: '',
          searchable: true,
          orderable: true,
          search: { value: '', regex: false },
        },
        {
          data: 'action',
          name: '',
          searchable: true,
          orderable: false,
          search: { value: '', regex: false },
        },
      ],
      order: [{ column: 0, dir: 'asc' }],
      start: 0,
      length: 10,
      search: { value: '', regex: false },
    };
    // this.dataRow = this.dataRowFilter.filter((item) => {
    //   if (item.warehouse_id == event) {
    //      return item;
    //   }
    // });
    data['service_group_id'] = form.value.service_group_id;
    data['service_id'] = form.value.service_id;
    data['age_id'] = form.value.age_id;
    this.benefitSvc.getAll(data).subscribe((resp) => {
    this.dataRow = resp.data.data;
    console.log('555',this.dataRow)
    });

  }

}
