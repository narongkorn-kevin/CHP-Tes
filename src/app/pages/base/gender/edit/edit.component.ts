import { map, takeUntil } from 'rxjs/operators';
import { GenderService } from './../services/gender.services.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCompany } from '@shared/utils/base-form-company';
import { Observable, Subscription } from 'rxjs';
import { BaseFormGender } from '@app/shared/utils/base-form-gender';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();


  constructor(
    private genderSvc: GenderService,
    private router: Router,
    public genderForm: BaseFormGender,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.genderForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.genderForm.baseForm.get('role').setValidators(null);
    this.genderForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.genderForm.baseForm.invalid) {
      return;
    }
    const formValue = this.genderForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.genderSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/gender/list']);
      });
    }
  }

}
