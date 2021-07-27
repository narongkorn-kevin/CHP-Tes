import { HelperService } from '@app/shared/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUnitConvertionComponent } from '@app/shared/dialogs/dialog-unit-convertion/dialog-unit-convertion.component';
import { BaseFormJob } from './../../../../shared/utils/base-form-job';
import { JobService } from './../services/job.service';
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
import { DialogBomComponent } from '@app/shared/dialogs/dialog-bom/dialog-bom.component';
import { DialogRoutingComponent } from '@app/shared/dialogs/dialog-routing/dialog-routing.component';
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
  isValidFormSubmitted = null;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private jobSvc: JobService,
    private router: Router,
    public jobForm: BaseFormJob,
    private dialog: MatDialog,
    private helper: HelperService,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {


    this.jobForm.baseForm.patchValue({
      start_date: this.helper.toDay()
    });
    // this.DefaultValueDate();
    // this.positionForm.baseForm.get('role').setValidators(null);
    // this.positionForm.baseForm.get('role').updateValueAndValidity();
  }

  // onAdd(): void {

  //   if (this.jobForm.baseForm.invalid) {
  //     return;
  //   }

  //   const formValue = this.jobForm.baseForm.value;
  //   if (this.actionTODO === Action.NEW) {
  //     this.jobSvc.new(formValue).subscribe((res) => {

  //       this.router.navigate(['manufacture/job/list']);
  //     });
  //   }
  // }

  // DefaultValueDate(): void {
  //   this.jobForm.baseForm.patchValue({
  //     start_date: this.helper.toDay()
  //   });
  // }

  onAdd(): void {
    this.isValidFormSubmitted = false;
    // if (this.bomLine().invalid) {
    //   return;
    // }
    if (this.jobForm.baseForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    // console.log(this.bomsForm.value);

    if (this.jobForm.baseForm.invalid) {
      return;
    }


    // console.log('bomform before',this.bomsForm)
      delete this.jobForm.baseForm.value.bom_id_2;
      delete this.jobForm.baseForm.value.routing_name;
      delete this.jobForm.baseForm.value.unit_convertion_name;

    const formValue = this.jobForm.baseForm.value;
    // console.log('FormvalueBefore',formValue)
    // formValue.BomLine = formValue.bomLine.forEach(del => {
    //   delete del.item_id2
    //   delete del.master_item_id2
    //   delete del.unit_convertion_name

    // });


    // console.log('delete', formValue.bomLine)

    if (this.actionTODO === Action.NEW) {
      console.log('Formvalue after delete',formValue)
      this.jobSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['manufacture/job/list']);
      });
    }
  }

  openDialogUnit() {

    let unitconvertion = this.jobForm.baseForm.value;
    const dialogRef = this.dialog.open(DialogUnitConvertionComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      unitconvertion =
      {
        unit_convertion_id: item.id,
        unit_convertion_name: item.name
      }
      if (item) {
        this.jobForm.baseForm.patchValue(
          unitconvertion
        )
      }

    });

  }

  openDialogBom() {

    let bom = this.jobForm.baseForm.value;
    const dialogRef = this.dialog.open(DialogBomComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      bom =
      {
        bom_id: item.id,
        bom_id_2: item.bom_id,
      }
      if (item) {
        this.jobForm.baseForm.patchValue(
          bom
        )
      }

    });

  }


  openDialogRouting() {

    let routing = this.jobForm.baseForm.value;
    const dialogRef = this.dialog.open(DialogRoutingComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      routing =
      {
        routing_id: item.id,
        routing_name: item.name,
      }
      if (item) {
        this.jobForm.baseForm.patchValue(
          routing
        )
      }

    });

  }

}
