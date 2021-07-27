import { takeUntil } from 'rxjs/operators';
import { SizeService } from './../services/size.service';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormSize } from '@shared/utils/base-form-size';
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
    private serviceSvc: SizeService,
    private router: Router,
    public sizeForm: BaseFormSize,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.sizeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.sizeForm.baseForm.get('role').setValidators(null);
    this.sizeForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.sizeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.sizeForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.serviceSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/size/list']);
      });
    }
  }
}
