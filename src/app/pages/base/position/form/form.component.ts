import { takeUntil } from 'rxjs/operators';
import { PositionService } from './../services/position.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormPosition } from '@shared/utils/base-form-position';
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
    private positionSvc: PositionService,
    private router: Router,
    public positionForm: BaseFormPosition
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.positionForm.baseForm.get('role').setValidators(null);
    this.positionForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {

    if (this.positionForm.baseForm.invalid) {
      return;
    }

    const formValue = this.positionForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.positionSvc.new(formValue).subscribe((res) => {

        this.router.navigate(['base/position/list']);
      });
    }
  }

}
