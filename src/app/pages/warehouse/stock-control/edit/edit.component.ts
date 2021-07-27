import { BaseFormStockControl } from './../../../../shared/utils/base-form-stock-control';
import { StockControlService } from './../services/stock-control.service';
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
  public ItemTypeData: any = [];
  public stockcontrolData: any = [];
  public UserData: any = [];
  constructor(
    private stockcontrolSvc: StockControlService,
    private router: Router,
    public stockcontrolForm: BaseFormStockControl,
    public activatedRoute: ActivatedRoute
  )
   {
    // console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    // this.stockcontrolForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    // this.locationForm.baseForm.get('role').setValidators(null);
    // this.locationForm.baseForm.get('role').updateValueAndValidity();
    // this.GetWarehouse();
    this.GetItemType();
    this.GetUser();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.GetStockcontrolById(id);
    });
  }

  onUpdate(): void {

    if (this.stockcontrolForm.baseForm.invalid) {
      return;
    }
    const formValue = this.stockcontrolForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.stockcontrolSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['warehouse/stock-control/list']);
      });
    }
  }

  GetItemType(): void {
    this.stockcontrolSvc.getitemtype().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });
  }

  GetUser(): void {
      this.stockcontrolSvc.getuser().subscribe(resp => {
        this.UserData = resp.data;
        console.log(this.UserData);
      });

    }
    GetStockcontrolById(id): void {
      this.stockcontrolSvc.getstockcontrolbyId(id).subscribe((resp) => {
        this.stockcontrolData = resp.data;
        this.stockcontrolForm.baseForm.patchValue({
          id: this.stockcontrolData.id,
          item_type_id: this.stockcontrolData.item_type_id,
          // item_type: this.stockcontrolData.item_type_id,
          approver_id: this.stockcontrolData.approver_id,
          manager_id: this.stockcontrolData.manager_id,

        });
        console.log('ItemByData',this.stockcontrolData);

      });
    }
}
