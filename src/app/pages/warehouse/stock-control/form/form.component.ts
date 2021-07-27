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
import { Router } from '@angular/router';
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
  public ItemTypeData: any = [];
  public UserData: any = [];
  constructor(
    private stockcontrolSvc: StockControlService,
    private router: Router,
    public stockcontrolForm: BaseFormStockControl
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    // this.stockcontrolForm.get('role').setValidators(null);
    // this.stockcontrolForm.get('role').updateValueAndValidity();
    this.GetItemType();
    this.GetUser();
  }


  onAdd(): void {
    if (this.stockcontrolForm.baseForm.invalid) {
      return;
    }

    const formValue = this.stockcontrolForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.stockcontrolSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
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

  }

