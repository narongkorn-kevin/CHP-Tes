import { ItemTypeService } from './../services/item-type.service';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormItemType } from '@shared/utils/base-form-item-type';
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
    private itemtypeSvc: ItemTypeService,
    private router: Router,
    public itemtypeForm: BaseFormItemType
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.itemtypeForm.baseForm.get('role').setValidators(null);
    this.itemtypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.itemtypeForm.baseForm.invalid) {
      return;
    }

    const formValue = this.itemtypeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.itemtypeSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/item-type/list']);
      });
    }
  }

}
