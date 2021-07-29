import { BaseFormBenefit } from './../../shared/utils/base-form-benefit';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { EventService } from './../service/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';



enum Action {
  EDIT = 'edit',
  NEW = 'new',
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  eventsForm: FormGroup;
  hide = true;
  actionTODO = Action.EDIT;
  public diseaseData: any = [];
  public ServiceGroupData: any = [];
  public BenefitbyIdData: any = [];
  public ItemData: any = [];
  public SeqData: any = [];
  public ServiceData: any = [];
  benefitsForm : FormGroup;
  benefits1Form : FormGroup;
  eventId: number;
  selectList: [];
  eventname: [];

  private subscription: Subscription = new Subscription();


  constructor(
    private eventSvc: EventService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public benefitform: BaseFormBenefit

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
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.eventId = id;
      this.GetEventByID(id);
      console.log('555',this.eventId)
    });
  }


  GetDisease(): void {
    this.eventSvc.getDisease().subscribe(resp => {
      this.diseaseData = resp.data;
      console.log(this.diseaseData);
    });

  }

  // GetServiceGroup(): void {
  //   this.eventSvc.get_service_group().subscribe((resp: any) => {
  //     this.ServiceGroupData = resp.data;
  //     setTimeout(() => {
        
  //       this.setSelect(1);
  //     }, 1000);

  //     console.log('servicegroup',this.ServiceGroupData);
  //   });
  // }

  GetEventByID(id): void {
    this.eventSvc.getById(id).subscribe(resp => {
      this.ItemData = resp.data;
      this.GetService(this.ItemData.service_id);
      this.GetSequence(this.ItemData.seq);
      console.log(this.ItemData.service_id)
      this.eventsForm.patchValue(this.ItemData);
      this.eventsForm.patchValue({
        service_id: this.ItemData.service_id,
        
      });
      
      this.ItemData.map( d=>
        this.event().push(this.fb.group({
          name: d.name,
          seq: d.seq,
          use_per_year: d.use_per_year,
          remark: d.remark,
          
        }))
        
      );
    });
  }

  onUpdate(): void {
    if (this.benefits1Form.invalid) {
      return;
    }
    const formValue = this.benefits1Form.value;
    console.log('test',this.benefits1Form.value);
    if (this.actionTODO === Action.EDIT) {
      this.eventSvc.update(formValue.id, formValue).subscribe((res) => {
        console.log('Edit ', res);
        this.router.navigate(['benefit/list']);
      });
    }

}

GetSequence(id): void {
  this.eventSvc.getSequence().subscribe((resp) => {
    this.SeqData = resp.data;
    console.log(this.SeqData);
  });
}

GetService(id): void {
  this.eventSvc.get_service().subscribe((resp) => {
    this.ServiceData = resp.data;
    console.log('service',this.ServiceData);
  });
}
// setSelect(id){
//   let elm = document.getElementsByClassName("mat-pseudo-checkbox");
//   console.log(elm);
//   alert(elm.length);
//   return;
//    let res = this.selectList.some(id);
//     console.log('res', res);
//     return res;
// }



// onSelect(event: any): void {
//   this.eventname = event;

//   console.log('event',this.eventname)
//   // this.GetServiceGroup(this.eventname);
  

// }
}
