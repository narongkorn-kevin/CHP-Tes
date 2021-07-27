import { BaseFormItemType } from './../../../../shared/utils/base-form-item-type';
import { ItemTypeService } from './../services/item-type.service';
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
    private itemtypeSvc: ItemTypeService,
    private router: Router,
    public itemtypeForm: BaseFormItemType,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.itemtypeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.itemtypeForm.baseForm.get('role').setValidators(null);
    this.itemtypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.itemtypeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.itemtypeForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.itemtypeSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/item-type/list']);
      });
    }
  }
}
