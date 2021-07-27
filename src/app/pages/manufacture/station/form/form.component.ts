import { takeUntil } from 'rxjs/operators';
import { StationService } from './../services/station.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseFormStation } from '@app/shared/utils/base-form-station';
import { ConfirmDialogComponent } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component'
import {MatDialog} from '@angular/material/dialog';
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
    private stationSvc: StationService,
    private router: Router,
    public stationForm: BaseFormStation,
    private dialog : MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.stationForm.baseForm.get('role').setValidators(null);
    this.stationForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.stationForm.baseForm.invalid) {
      return;
    }

    const formValue = this.stationForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.stationSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['manufacture/station/list']);
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      width: '500px',
      data: {title: 'CONFIRM DIALOG', message: 'ARE YOU SURE ?'}
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.onAdd();
      }
    });
  }

}
