import { BaseFormConfigStock } from './../../../../shared/utils/base-form-config-stock';
import { ConfigStockService } from './../services/config-stock.service';
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
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public ConfigscotkData: any = [];
  public UserData: any = [];
  constructor(
    private configstockSvc: ConfigStockService,
    private router: Router,
    public configstockForm: BaseFormConfigStock
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
    this.GetConfigStock();

  }


  onAdd(): void {
    if (this.configstockForm.baseForm.invalid) {
      return;
    }

    const formValue = this.configstockForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.configstockSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['warehouse/config-stock/list']);
      });
    }
  }

  GetConfigStock(): void {
    this.configstockSvc.getconfig_stock().subscribe(resp => {
      this.ConfigscotkData = resp.data;
      this.configstockForm.baseForm.patchValue({
        id: this.ConfigscotkData.id,
        stock_dead: this.ConfigscotkData.stock_dead,
        stock_slow: this.ConfigscotkData.stock_slow,


      });
      console.log(this.ConfigscotkData);
    });

  }


  }

