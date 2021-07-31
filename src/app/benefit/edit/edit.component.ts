import { BaseFormBenefit } from './../../shared/utils/base-form-benefit';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { BenefitService } from './../service/benefit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


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

  hide = true;
  actionTODO = Action.EDIT;
  public diseaseData: any = [];
  public ServiceGroupData: any = [];
  public BenefitbyIdData: any = [];
  public AgeData: any = [];
  benefitsForm : FormGroup;
  benefits1Form : FormGroup;

  selectList: [];
  eventname: [];

  private subscription: Subscription = new Subscription();


  constructor(
    private benefitSvc: BenefitService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public benefitform: BaseFormBenefit

  ) {
    
   }


   ngOnDestroy(): void {
     this.subscription.unsubscribe();
   

   }
   
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.GetBenefitById(id);
    });
    
    this.GetDisease();
    this.GetServiceGroup();
    this.GetAgeRange();
    

  }


  GetDisease(): void {
    this.benefitSvc.getDisease().subscribe(resp => {
      this.diseaseData = resp.data;
      console.log(this.diseaseData);
    });

  }

  GetServiceGroup(): void {
    this.benefitSvc.get_service_group().subscribe((resp: any) => {
      this.ServiceGroupData = resp.data;
      console.log('servicegroup',this.ServiceGroupData);
    });
  }

//   onUpdate(): void {
//     if (this.benefitform.baseForm.invalid) {
//       return;
//     }
//     const formValue = this.benefits1Form.value;
//     console.log('test',this.benefits1Form.value);
//     if (this.actionTODO === Action.EDIT) {
//       this.benefitSvc.update(formValue.id, formValue).subscribe((res) => {
//         console.log('Edit ', res);
//         this.router.navigate(['benefit/list']);
//       });
//     }

// }

onUpdate(): void {
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
      if (this.benefitform.baseForm.invalid) {
        return;
      }
      const formValue = this.benefitform.baseForm.value;
      //console.log(this.officerForm.baseForm.value);

      if (this.actionTODO === Action.EDIT) {
        this.benefitSvc.update(formValue.id, formValue).subscribe((res) => {
          Swal.fire({
            title: 'Success!',
            text: "ดำเนินการเสร็จสิ้น!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#28a745',
            confirmButtonText: 'ตกลง',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['benefit/list']);
            }
          })
        });
      }

    }
  });
}

GetAgeRange(): void {
  this.benefitSvc.get_age().subscribe((resp) => {
    this.AgeData = resp.data;
    console.log('age',this.AgeData);
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
GetBenefitById(id ): void {
  this.benefitSvc.getById(id).subscribe((resp:any) => {
    this.BenefitbyIdData = resp.data;
    var num = this.BenefitbyIdData.pregnant;
    var n = num.toString();
    console.log('benefit',this.BenefitbyIdData)
    this.benefitform.baseForm.patchValue({
      id: this.BenefitbyIdData.id,
      name: this.BenefitbyIdData.name,
      pregnant: n,
      age_id: this.BenefitbyIdData.age_id,
      sex: this.BenefitbyIdData.sex,
      disease_id: this.BenefitbyIdData.disease_id,
      group_taget: this.BenefitbyIdData.group_taget,
      service_group_id: this.BenefitbyIdData.service_groups[0].name,
      
    });
    
    console.log('benefits1Form',this.benefitform.baseForm.value)
    console.log('ServiceGroupID',this.BenefitbyIdData.service_groups[0].id)

  });
}


// onSelect(event: any): void {
//   this.eventname = event;

//   console.log('event',this.eventname)
//   // this.GetServiceGroup(this.eventname);
  

// }
}
