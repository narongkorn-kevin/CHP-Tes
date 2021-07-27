import { BaseFormMaterialType } from './../../../../shared/utils/base-form-materialtype';
import { MaterialTypeService } from './../services/material-type.service';
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
    private materialtypeSvc: MaterialTypeService,
    private router: Router,
    public materialtypeForm: BaseFormMaterialType,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.materialtypeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.materialtypeForm.baseForm.get('role').setValidators(null);
    this.materialtypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.materialtypeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.materialtypeForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.materialtypeSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/material-type/list']);
      });
    }
  }
}
