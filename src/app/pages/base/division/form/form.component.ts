import { takeUntil } from 'rxjs/operators';
import { DivisionService } from './../services/division.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormDivision } from '@shared/utils/base-form-division';
import { Subscription } from 'rxjs';
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

  constructor(
    private divisionSvc: DivisionService,
    private router: Router,
    public divisionForm: BaseFormDivision
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.divisionForm.baseForm.get('role').setValidators(null);
    this.divisionForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.divisionForm.baseForm.invalid) {
      return;
    }

    const formValue = this.divisionForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.divisionSvc.new(formValue).subscribe((res) => {
        this.router.navigate(['base/division/list']);
      });
    }
  }

}
