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

interface disease {
  value: string;
  viewValue: string;
}

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
  selectedValue = new FormControl();
  
  public diseaseData: any = [];
  toppings = new FormControl();
  toppingList: string[] = ['กลุ่มหญิงตั้งครรภ์', 'กลุ่มเด็กเล็ก 0-5 ปี', 'กลุ่มเด็กโตและวัยรุ่นอายุ 6-24 ปี ', 'กลุ่มผู้ใหญ่ 25-58 ปี', 'กลุ่มผู้สูงอายุ 60 ปีขึ้นไป'];
  disease1: disease[] = [
    {value: '0', viewValue: 'โรคอ้วน'},
    {value: '1', viewValue: 'โรคเบาหวาน'},
    {value: '22', viewValue: 'โรค HIV'}
  ];

  benefitsForm : FormGroup;
  private subscription: Subscription = new Subscription();


  constructor(
    private benefitSvc: BenefitService,
    private router: Router,
    private fb: FormBuilder,
    
  ) {
    this.benefitsForm = this.fb.group({
      benefit: this.fb.array([]),
    })
   }

   ngOnDestroy(): void {
     this.subscription.unsubscribe();
     this.addBenefit();
   }
   benefit(): FormArray {

    return this.benefitsForm.get('benefit') as FormArray
  }
  newBenefit(): FormGroup {
    return this.fb.group({
    
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
    
  }

  
  GetDisease(): void {
    this.benefitSvc.getDisease().subscribe(resp => {
      this.diseaseData = resp.data;
      console.log(this.diseaseData);
    });

  }

}
