
import { takeUntil } from 'rxjs/operators';
import { StationService } from './../services/station.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormStation } from '@shared/utils/base-form-station';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component'
import {MatDialog} from '@angular/material/dialog';
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
  public ItemData: any = [];
  
  constructor(
    private stationSvc: StationService,
    private router: Router,
    public stationForm: BaseFormStation,
    public activatedRoute: ActivatedRoute,
    private dialog : MatDialog,
  ) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.GetById(id);
      console.log('Mydata 3', params.id)
    });
  }

  GetById(id): void {
    this.stationSvc.getReportById(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log('my data', this.ItemData);
      this.stationForm.baseForm.patchValue({ id: this.ItemData.id });
      this.stationForm.baseForm.patchValue({ name: this.ItemData.name });
      this.stationForm.baseForm.patchValue({ description: this.ItemData.description });
      this.stationForm.baseForm.patchValue({ status: this.ItemData.status });
      console.log('my data 2', this.stationForm.baseForm);
    });
  }

  onUpdate(): void {

    if (this.stationForm.baseForm.invalid) {
      return;
    }
    const formValue = this.stationForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.stationSvc.update(formValue.id, formValue).subscribe((res) => {
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
        this.onUpdate();
      }
    });
  }
}
