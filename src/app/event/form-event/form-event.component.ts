import { Event } from '@app/shared/models/base.interface'
import { takeUntil, startWith, map } from 'rxjs/operators';
import { EventService } from './../service/event.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

//////////////////////////

//////////////////////////

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements AfterViewInit, OnInit, OnDestroy {

  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];

  eventsForm: FormGroup;
  eventsForm1: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  columns = [{ name: 'name' }];
  filterData = [];
  getServieId: any;
  eventId: any;
  private subscription: Subscription = new Subscription();
  public ServiceGroupData: any = [];
  public ServiceData: any = [];
  public EventData: any = [];
  public SeqData: any = [];
  public ItemData: any = [];
 
  constructor(
    private eventSvc: EventService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {

    this.eventsForm = this.fb.group({
      service_id: '',
      event: this.fb.array([], [Validators.required]),
    });

    this.eventsForm1 = this.fb.group({
      // service_id: '',
      id: '',
      name: '',
      seq: '',
      use_per_year: '',
      remark: '',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addEvent();
  }

  event(): FormArray {

    return this.eventsForm.get('event') as FormArray
  }


  newEvent(): FormGroup {
    return this.fb.group({
      name: '',
      seq: '',
      use_per_year: '',
      remark: '',

    })
  }
  addEvent(): void {
    2
    this.event().push(this.newEvent());
  }

  dateEvent(): void {
    this.event().push(this.newEvent());
  }

  removeEvent(i: number): void {
    this.event().removeAt(i);
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Warning!',
      text: "คุณต้องการบันทึกข้อมูล ใช่หรือไม่?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.eventsForm.invalid) {
          return;
        }
        const formValue = this.eventsForm.value;

        if (this.actionTODO === Action.NEW) {
          this.eventSvc.new(formValue).subscribe((res) => {
            Swal.fire({
              title: 'Success!',
              text: "ดำเนินการเสร็จสิ้น!",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#28a745',
              confirmButtonText: 'ตกลง',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['event/list']);
              }
            })
          });
        }
      }
    });

  }
  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.GetSequence();
    
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.eventId = id;
      this.GetEventByID(id);
      this.loadTable(id);
      console.log('555',this.eventId)
    });
 
  }

  GetService(id): void {
    this.eventSvc.get_service().subscribe((resp) => {
      this.ServiceData = resp.data;
      console.log('service', this.ServiceData);
      
    });
  }

  GetEvent(id): void {
    this.eventSvc.get_service().subscribe((resp) => {
      this.EventData = resp.data;
      console.log('EventData', this.EventData);
      
    });
  }

  GetSequence(): void {
    this.eventSvc.getSequence().subscribe((resp) => {
      this.SeqData = resp.data;
      console.log(this.SeqData);
    });
  }

  GetEventByID(id): void {

    this.eventSvc.getById(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log('666', this.ItemData)
      this.GetService(this.ItemData.id);
      this.eventsForm.patchValue({
        service_id: this.ItemData.id,
      });

      // this.eventsForm1.patchValue({
      //   id: this.ItemData.service_id,
      //   name: this.ItemData.name,
      //   seq: this.ItemData.seq,
      //   use_per_year: this.ItemData.use_per_year,
      //   remark: this.ItemData.remark,
      // });
    });
  }
/////////Datatable////////
// onChangeType(event: any): void {
//   // this.loadTable();
//   var data = {
//     draw: 1,
//     columns: [
//       {
//         data: 'id',
//         name: '',
//         searchable: true,
//         orderable: true,
//         search: { value: '', regex: false },
//       },
//       {
//         data: 'service_id',
//         name: '',
//         searchable: true,
//         orderable: true,
//         search: { value: '', regex: false },
//       },
//       {
//         data: 'name',
//         name: '',
//         searchable: true,
//         orderable: true,
//         search: { value: '', regex: false },
//       },
//       {
//         data: 'seq',
//         name: '',
//         searchable: true,
//         orderable: true,
//         search: { value: '', regex: false },
//       },
//       {
//         data: 'use_per_year',
//         name: '',
//         searchable: true,
//         orderable: true,
//         search: { value: '', regex: false },
//       },
//       {
//         data: 'remark',
//         name: '',
//         searchable: true,
//         orderable: true,
//         search: { value: '', regex: false },
//       },
//       {
//         data: 'action',
//         name: '',
//         searchable: true,
//         orderable: false,
//         search: { value: '', regex: false },
//       },
//     ],
//     order: [{ column: 0, dir: 'asc' }],
//     start: 0,
//     length: 10,
//     search: { value: '', regex: false },
//   };
//   // this.dataRow = this.dataRowFilter.filter((item) => {
//   //   if (item.warehouse_id == event) {
//   //      return item;
//   //   }
//   // });
//   data['service_id'] = event;
//   this.eventSvc.getAll(data).subscribe((resp) => {
//   this.dataRow = resp.data.data;
//   console.log('555',this.dataRow)
//   });
  
// }

loadTable(id): void {
  const that = this;
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      dataTablesParameters['service_id']= id;
      that.eventSvc.getAll(dataTablesParameters).subscribe((resp) => {
        that.dataRow = resp.data.data;
        // that.dataRowFilter = that.dataRow;
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
      { data: 'seq' },
      { data: 'use_per_year' },
      { data: 'remark' },
      { data: 'action', orderable: false }
    ],
  };
}
/////////Datatable////////



}
