import { BaseFormMaterialGrade } from './../../../../shared/utils/base-form-materialgrade';
import { MaterialGradeService } from './../services/material-grade.service';
import { takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private materialgradeSvc: MaterialGradeService,
    private router: Router,
    public materialgradeForm: BaseFormMaterialGrade,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.materialgradeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.materialgradeForm.baseForm.get('role').setValidators(null);
    this.materialgradeForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.materialgradeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.materialgradeForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.materialgradeSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/material-grade/list']);
      });
    }
  }
}
