import { Event } from '@app/shared/models/base.interface'
import { takeUntil } from 'rxjs/operators';
import { EventService } from './../service/event.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  private subscription: Subscription = new Subscription();
  public ServiceGroupData: any = [];
  public ServiceData: any = [];
  public SeqData: any = [];

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
      if (result.isConfirmed){
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
  }

  GetService(): void {
    this.eventSvc.get_service().subscribe((resp) => {
      this.ServiceData = resp.data;
      console.log('service',this.ServiceData);
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
