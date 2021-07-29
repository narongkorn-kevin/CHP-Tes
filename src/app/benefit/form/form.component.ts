import { BaseFormBenefit } from './../../shared/utils/base-form-benefit';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { BenefitService } from './../service/benefit.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';



enum Action {
  EDIT = 'edit',
  NEW = 'new',
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
 
  hide = true;
  actionTODO = Action.NEW;
  public diseaseData: any = [];
  public ServiceGroupData: any = [];
  benefitsForm : FormGroup;
  benefits1Form : FormGroup;
  private subscription: Subscription = new Subscription();


  constructor(
    private benefitSvc: BenefitService,
    private router: Router,
    private fb: FormBuilder,
    public benefitform: BaseFormBenefit

  ) {
    this.benefitsForm = this.fb.group({
      event: this.fb.array([]),
      service_id: '',
    })

    this.benefits1Form = fb.group({
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

    return this.benefitsForm.get('benefit') as FormArray
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
    this.GetDisease();
    this.GetServiceGroup();
  }


  GetDisease(): void {
    this.benefitSvc.getDisease().subscribe(resp => {
      this.diseaseData = resp.data;
      console.log(this.diseaseData);
    });

  }

  GetServiceGroup(): void {
    this.benefitSvc.get_service_group().subscribe((resp) => {
      this.ServiceGroupData = resp.data;
      console.log(this.ServiceGroupData);
    });
  }

  onSubmit1(): void {
    if (this.benefitform.baseForm.invalid) {
      return;
    }
    const formValue = this.benefitform.baseForm.value;

    console.log('test',this.benefitform.baseForm.value);
    if (this.actionTODO === Action.NEW) {
      this.benefitSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['benefit/list']);
      });
    }

}
}
