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
export class FormComponent implements OnInit {

  hide = true;
  actionTODO = Action.NEW;
  public diseaseData: any = [];
  public ServiceGroupData: any = [];
  public AgeData: any = [];
  benefitsForm: FormGroup;
  benefits1Form: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private benefitSvc: BenefitService,
    private router: Router,
    private fb: FormBuilder,
    public benefitform: BaseFormBenefit

  ) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.benefitform.baseForm.reset();
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
    this.benefitSvc.get_service_group().subscribe((resp) => {
      this.ServiceGroupData = resp.data;
      console.log(this.ServiceGroupData);
    });
  }


  GetAgeRange(): void {
    this.benefitSvc.get_age().subscribe((resp) => {
      this.AgeData = resp.data;
      console.log(this.AgeData);
    });
  }
  onAdd(): void {
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

        if (this.actionTODO === Action.NEW) {
          this.benefitSvc.new(formValue).subscribe((res) => {
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

}
