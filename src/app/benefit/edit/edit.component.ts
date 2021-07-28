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

interface disease {
  value: string;
  viewValue: string;
}

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
  selectedValue = new FormControl();

  public diseaseData: any = [];
  public BenefitbyIdData: any = [];
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
    private activatedRoute: ActivatedRoute,
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
     this.dateBenefit();

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
    this.GetDisease();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.GetBenefitById(id);
    });
  }


  GetDisease(): void {
    this.benefitSvc.getDisease().subscribe(resp => {
      this.diseaseData = resp.data;
      console.log(this.diseaseData);
    });

  }

  GetBenefitById(id): void {
    this.benefitSvc.getById(id).subscribe((resp) => {
      this.BenefitbyIdData = resp.data;
      this.benefitsForm.patchValue({
        id: this.BenefitbyIdData.id,
        name: this.BenefitbyIdData.name,
        pregnant: this.BenefitbyIdData.pregnant,
        age: this.BenefitbyIdData.age,
        sex: this.BenefitbyIdData.sex,
        disease_id: this.BenefitbyIdData.disease_id,

      });
      console.log('benefit',this.BenefitbyIdData)
      const rows = this.benefitsForm.get('benefit') as FormArray;

      this.BenefitbyIdData.benefit.map(d =>
        this.benefit().push(this.fb.group({
          seq: d.seq,

        })))
    });
  }




}
