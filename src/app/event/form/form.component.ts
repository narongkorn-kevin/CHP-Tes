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
import { Router } from '@angular/router';
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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterViewInit, OnInit, OnDestroy {

  eventsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  columns = [{ name: 'name' }];
  filterData = [];
  private subscription: Subscription = new Subscription();
  public ServiceGroupData: any = [];
  public ServiceData: any = [];
  public SeqData: any = [];
  //**filterOption **//
  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<string[]>;
  //**filterOption **//

  constructor(
    private eventSvc: EventService,
    private router: Router,
    private fb: FormBuilder,
  ) {

    this.eventsForm = this.fb.group({
      service_id: '',
      event: this.fb.array([], [Validators.required]),
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
    this.GetService();
    this.GetSequence();
    //**filterOption **//
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    //**filterOption **//
  }
  //**filterOption **//
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('filter', filterValue);
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    //**filterOption **//
  }

  GetService(): void {
    this.eventSvc.get_service().subscribe((resp) => {
      this.ServiceData = resp.data;
      console.log('service', this.ServiceData);
      // this.myArray.forEach((currentValue, index) => {
      //   if(!currentValue.name) {
      //       this.myArray.splice(index, 1);
      //   }
      // });
      this.options = this.ServiceData;
    });
  }

  GetServiceGroup(): void {
    this.eventSvc.get_service_group().subscribe((resp) => {
      this.ServiceGroupData = resp.data;
      console.log(this.ServiceGroupData);
    });
  }

  GetSequence(): void {
    this.eventSvc.getSequence().subscribe((resp) => {
      this.SeqData = resp.data;
      console.log(this.SeqData);
    });
  }

}
