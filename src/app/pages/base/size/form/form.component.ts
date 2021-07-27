
import { takeUntil } from 'rxjs/operators';
import { SizeService } from './../services/size.service';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormSize } from './../../../../shared/utils/base-form-size';
import { Subscription } from 'rxjs';
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
    private sizeSvc: SizeService,
    private router: Router,
    public sizeForm: BaseFormSize
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.sizeForm.baseForm.get('role').setValidators(null);
    this.sizeForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.sizeForm.baseForm.invalid) {
      return;
    }

    const formValue = this.sizeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.sizeSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/size/list']);
      });
    }
  }

}
