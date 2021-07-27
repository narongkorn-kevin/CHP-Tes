import { takeUntil } from 'rxjs/operators';
import { PositionService } from './../services/position.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPosition } from '@shared/utils/base-form-position';
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
    private positionSvc: PositionService,
    private router: Router,
    public positionForm: BaseFormPosition,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.positionForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

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

  onUpdate(): void {
    if (this.positionForm.baseForm.invalid) {
      return;
    }
    const formValue = this.positionForm.baseForm.value;
    if (this.actionTODO === Action.EDIT)
    {
      this.positionSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/position/list']);
      });
    }
  }
}
