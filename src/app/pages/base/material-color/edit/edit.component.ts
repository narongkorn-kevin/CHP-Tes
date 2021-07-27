import { MaterialColorService } from './../services/material-color.service';
import { BaseFormMaterialColor } from './../../../../shared/utils/base-form-materialcolor';
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
    private materialcolorSvc: MaterialColorService,
    private router: Router,
    public materialcolorForm: BaseFormMaterialColor,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.materialcolorForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.materialcolorForm.baseForm.get('role').setValidators(null);
    this.materialcolorForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.materialcolorForm.baseForm.invalid) {
      return;
    }
    const formValue = this.materialcolorForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.materialcolorSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/material-color/list']);
      });
    }
  }
}
