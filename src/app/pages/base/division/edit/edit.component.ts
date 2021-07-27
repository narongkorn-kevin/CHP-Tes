import { map, takeUntil } from 'rxjs/operators';
import { DivisionService } from './../services/division.service';
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
import { BaseFormDivision } from '@app/shared/utils/base-form-division';
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
    private divisionSvc: DivisionService,
    private router: Router,
    public divisionForm: BaseFormDivision,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.divisionForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.divisionForm.baseForm.get('role').setValidators(null);
    this.divisionForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.divisionForm.baseForm.invalid) {
      return;
    }
    const formValue = this.divisionForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.divisionSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/division/list']);
      });
    }
  }

}
