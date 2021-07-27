import { BaseFormItemTranEdit } from './../../../../shared/utils/base-form-item-tran-edit';
import { BaseFormItemTran } from './../../../../shared/utils/base-form-item-tran';
import { BaseFormLocation } from './../../../../shared/utils/base-form-location';

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
import { ItemTranService } from '../services/item-tran.service';
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
  public WarehouseData: any = [];
  constructor(
    private itemtranSvc: ItemTranService,
    private router: Router,
    public itemtranForm: BaseFormItemTran,
    public activatedRoute: ActivatedRoute,
    public editForm: BaseFormItemTranEdit
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.editForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.itemtranForm.baseForm.get('role').setValidators(null);
    this.itemtranForm.baseForm.get('role').updateValueAndValidity();
    
  }



  onUpdate(): void {

    if (this.editForm.baseForm.invalid) {
      return;
    }
    const formValue = this.editForm.baseForm.value;
    console.log(formValue);
    
    if (this.actionTODO === Action.EDIT) {
      this.itemtranSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['warehouse/deposit/list']);
      });
    }
  }

}
