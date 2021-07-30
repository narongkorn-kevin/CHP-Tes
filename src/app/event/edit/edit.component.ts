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
      var stringToConvert = this.ItemData.seq;
      var numberValue = Number(this.ItemData.seq)
      this.GetSequence(numberValue);
      this.GetService(this.ItemData.service_id);
      
      console.log('number',this.ItemData)
      this.eventsForm.patchValue(this.ItemData);
      this.eventsForm.patchValue({
        service_id: this.ItemData.service_id,
        id: this.ItemData.id,
        name: this.ItemData.name,
          seq: this.ItemData.seq,
          use_per_year: this.ItemData.use_per_year,
          remark: this.ItemData.remark,
        
      });
    });
  }

  onUpdate(): void {
    if (this.eventsForm.invalid) {
      return;
    }
    const formValue = this.eventsForm.value;
    
    console.log('test',formValue.id);
    if (this.actionTODO === Action.EDIT) {
      this.eventSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['event/list']);
      });
    }

}

GetSequence(id): void {
  this.eventSvc.getSequence().subscribe((resp) => {
    this.SeqData = resp.data;
    console.log('seq',this.SeqData);
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
