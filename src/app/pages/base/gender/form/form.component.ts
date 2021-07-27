import { GenderService } from './../services/gender.services.service';
import { map, takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormGender } from '@shared/utils/base-form-gender';
import { Observable, Subscription } from 'rxjs';
import { GenderResponse } from '@app/shared/models/base.interface';
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

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  state: Observable<GenderResponse>;


  constructor(
    private genderSvc: GenderService,
    private router: Router,
    public genderForm: BaseFormGender,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);

      });


    this.genderForm.baseForm.get('role').setValidators(null);
    this.genderForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.genderForm.baseForm.invalid) {
      return;
    }

    const formValue = this.genderForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.NEW) {
      this.genderSvc.new(formValue).subscribe((res) => {
        this.router.navigate(['base/gender/list']);
      });
    }
  }

}
