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
  benefitsForm : FormGroup;
  benefits1Form : FormGroup;

  private subscription: Subscription = new Subscription();


  constructor(
    private benefitSvc: BenefitService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public benefitform: BaseFormBenefit

  ) {
    this.benefitsForm = this.fb.group({
      event: this.fb.array([]),
      service_id: '',
    })

    this.benefits1Form = fb.group({
      id: '',
      service_group_id : '',
      name: '',
      group_taget: '',
      pregnant: '',
      age:'',
      sex:'',
      disease_id:'',
    })
   }


   ngOnDestroy(): void {
     this.subscription.unsubscribe();
     this.addBenefit();
     this.dateBenefit();

   }
   benefit(): FormArray {

    return this.benefitsForm.get('event') as FormArray
  }
  newBenefit(): FormGroup {
    return this.fb.group({
      name: '',
      seq: '',
      user_per_year: '',
      remark: '',
    })
  }
  addBenefit(): void {
    2
    this.benefit().push(this.newBenefit());
  }

  dateBenefit(): void {
    this.benefit().push(this.newBenefit());
  }

  removeBenefit(i: number): void {
    this.benefit().removeAt(i);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.GetBenefitById(id);
    });
    this.GetDisease();
    


  }


  GetDisease(): void {
    this.benefitSvc.getDisease().subscribe(resp => {
      this.diseaseData = resp.data;
      console.log(this.diseaseData);
    });

  }

  GetServiceGroup(id): void {
    this.benefitSvc.get_service_group_update(id).subscribe((resp) => {
      this.ServiceGroupData = resp.data;
      console.log(this.ServiceGroupData);
    });
  }

  onUpdate(): void {
    if (this.benefits1Form.invalid) {
      return;
    }
    const formValue = this.benefits1Form.value;
    console.log('test',this.benefits1Form.value);
    if (this.actionTODO === Action.EDIT) {
      this.benefitSvc.update(formValue.id, formValue).subscribe((res) => {
        console.log('Edit ', res);
        this.router.navigate(['benefit/list']);
      });
    }

}

GetBenefitById(id, ): void {
  this.benefitSvc.getById(id).subscribe((resp) => {
    this.BenefitbyIdData = resp.data;
    
    this.GetServiceGroup(this.BenefitbyIdData.service_groups[0].id);
    this.benefits1Form.patchValue({
      id: this.BenefitbyIdData.id,
      name: this.BenefitbyIdData.name,
      pregnant: this.BenefitbyIdData.pregnant,
      age: this.BenefitbyIdData.age,
      sex: this.BenefitbyIdData.sex,
      disease_id: this.BenefitbyIdData.disease_id,
      group_taget: this.BenefitbyIdData.group_taget,
      

    });
    console.log('benefit',this.BenefitbyIdData)
    console.log('benefits1Form',this.benefits1Form.value)
    console.log('benefits1Form',this.BenefitbyIdData.service_groups[0].id)

  });
}
}
