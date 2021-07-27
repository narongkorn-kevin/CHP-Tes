import { BaseFormUnit } from './../../../../shared/utils/base-form-unit';
import { UnitService } from './../services/unit.service';
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
    private unitSvc: UnitService,
    private router: Router,
    public unitForm: BaseFormUnit,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.unitForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.unitForm.baseForm.get('role').setValidators(null);
    this.unitForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.unitForm.baseForm.invalid) {
      return;
    }
    const formValue = this.unitForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.unitSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/unit/list']);
      });
    }
  }
}
