import { BaseFormRouting } from './../../../utils/base-form-routing';
import { DialogRoutingService } from './../services/dialog-routing.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
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
  selector: 'app-routing-form',
  templateUrl: './routing-form.component.html',
  styleUrls: ['./routing-form.component.scss']
})
export class DialogRoutingFormComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private dialogroutingSvc: DialogRoutingService,
    public dialogRef: MatDialogRef<DialogRoutingFormComponent>,
    private router: Router,
    public routingForm: BaseFormRouting
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.routingForm.baseForm.reset();
    // this.positionForm.baseForm.get('role').setValidators(null);
    // this.positionForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {

    if (this.routingForm.baseForm.invalid) {
      return;
    }

    const formValue = this.routingForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.dialogroutingSvc.new(formValue).subscribe((res) => {
        this.dialogRef.close(true);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }



}
