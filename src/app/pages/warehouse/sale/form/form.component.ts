import { takeUntil } from 'rxjs/operators';
import { SaleorderService } from '../services/sale.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormSaleorder } from '@shared/utils/base-form-saleorder';
import { BaseFormSaleOrderItem } from '@shared/utils/base-form-saleorder-item';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

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

  productForm: FormGroup;
  saleordersForm: FormGroup;
  dateForm: string;
  total: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  private subscription: Subscription = new Subscription();
  public CustomerList: any = [];
  public SaleList: any = [];
  public ItemData: any = [];
  public UnitData: any = [];
  public ItemTypeData: any = [];
  public ItemUnitSell: any = [];

  constructor(
    private saleorderSvc: SaleorderService,
    private router: Router,
    public saleorderForm: BaseFormSaleorder,
    public itemForm: BaseFormSaleOrderItem,
    private fb: FormBuilder
  ) {

    this.saleordersForm = this.fb.group({

      order: this.fb.array([], [Validators.required]),
      date: ['', Validators.required],
      ref_no: ['', Validators.required],
      shipping_date: '',
      shipping_term: '',
      customer_id: '',
      user_id: '',
      remark: '',
      amount: '0.00',
      tax: '7',
      tax_amount: '0.00',
      net_amount: '0.00',
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addItem();
  }

  ngOnInit(): void {
    this.GetCustomers();
    this.GetItemType();
    this.GetSale();
    // this.GetUnitConvertion(5, 12, 0);
    this.total = '0.00';
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  itemsale(): FormArray {

    return this.saleordersForm.get('order') as FormArray
  }

  newItem(): FormGroup {
    return this.fb.group({
      item_type_id: '',
      item_id: '',
      item_name: ['', [Validators.required]],
      qty: '0',
      unit_convertion_id: '',
      unit_price: '0',
      total_price: '0',
      discount: '0',
      amount: '0',
    });
  }

  addItem(): void {
    this.itemsale().push(this.newItem());
  }

  onChange(event: any, index: any): void {
    this.eventname = event.split('|');



    const rows = this.saleordersForm.get('order') as FormArray;
    const qty = parseInt(rows.controls[index].get('qty').value);
    const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    const discount = parseInt(rows.controls[index].get('discount').value);

    rows.controls[index].patchValue({ item_name: this.eventname[1] });
    rows.controls[index].patchValue({ unit_price: this.eventname[2] });

    const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });

    this.GetUnitSell(this.eventname[0], index, rows.controls[index].get('item_type_id').value.split('|')[0]);

  }

  onChangeType(event: any, index: any): void {
    this.eventname = event;
    this.GetItem(this.eventname, index);
  }

  qtyChanged(index: any): void {
    const rows = this.saleordersForm.get('order') as FormArray;
    const qty = parseInt(rows.controls[index].get('qty').value);
    const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    const discount = parseInt(rows.controls[index].get('discount').value);
    const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });
    this.sumaryItem();
  }

  discountChanged(index: any): void {
    const rows = this.saleordersForm.get('order') as FormArray;
    const qty = parseInt(rows.controls[index].get('qty').value);
    const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    const discount = parseInt(rows.controls[index].get('discount').value);
    const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });
    this.sumaryItem();
  }

  onChangeUnit(event: any, index: any): void {
    const rows = this.saleordersForm.get('order') as FormArray;
    const qty = parseInt(rows.controls[index].get('qty').value);
    const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    const discount = parseInt(rows.controls[index].get('discount').value);
    const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    unit_convertion_id != null ? unit_convertion_id : 0;

    rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });
    this.sumaryItem();
  }



  sumaryItem(): void {
    this.subscription = this.itemsale().valueChanges.subscribe(data => {
      this.total = data.reduce((sum, item) => sum += item.total_price, 0);
    });

    // tslint:disable-next-line:radix
    const tax = parseInt(this.saleordersForm.value.tax);

    const tax_amount = (parseInt(this.total) * tax) / 100;
    const net_amount = tax_amount + parseInt(this.total);

    this.saleordersForm.patchValue({
      tax_amount: tax_amount.toString(), net_amount: net_amount.toString(),
    });
  }


  removeItem(i: number): void {
    this.itemsale().removeAt(i);
  }

  onSubmit(): void {
    this.isValidFormSubmitted = false;
    if (this.itemsale().invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(this.saleordersForm.value);

    for (let i = 0; i <= this.saleordersForm.value.order.length - 1; i++) {
      const rows = this.saleordersForm.get('order') as FormArray;
      const itemid = this.saleordersForm.value.order[i].item_id.split('|')[0].toString();
      const itemtypeid = this.saleordersForm.value.order[i].item_type_id.split('|')[0].toString();
      const unitconvertid = this.saleordersForm.value.order[i].unit_convertion_id.split('|')[0].toString();
      rows.controls[i].patchValue({ item_id: itemid, item_type_id: itemtypeid, unit_convertion_id: unitconvertid });
      delete this.saleordersForm.value.order[i].item_type_id;
    }



    if (this.saleordersForm.invalid) {
      return;
    }

    const formValue = this.saleordersForm.value;
    if (this.actionTODO === Action.NEW) {
      this.saleorderSvc.new(formValue).subscribe((res) => {
        this.router.navigate(['warehouse/sale/list']);
      });
    }
  }

  GetSale(): void {
    this.saleorderSvc.getSale().subscribe(resp => {
      this.SaleList = resp.data;
      // console.log(this.CustomerList);
    });
  }

  GetCustomers(): void {
    this.saleorderSvc.getCustomerList().subscribe(resp => {
      this.CustomerList = resp.data;
      // console.log(this.CustomerList);
    });
  }

  GetItemType(): void {
    this.saleorderSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      // console.log(this.ItemTypeData);
    });

  }

  GetItem(id: String, i: any): void {
    this.saleorderSvc.getItem(id.split('|')[0]).subscribe(resp => {
      this.ItemData[i] = resp.data;
      // console.log(this.ItemData[i]);
    });
  }

  GetUnitConvertion(TypeId, UnitId, i): void {
    this.saleorderSvc.getUnitConvertion(TypeId, UnitId).subscribe(resp => {
      this.UnitData[i] = resp.data;
      // console.log(this.UnitData[i]);
    });

  }

  GetUnitSell(id: String, i: any, Typeid: String): void {
    this.saleorderSvc.getUnitSell(id).subscribe(resp => {
      this.ItemUnitSell[i] = resp.data;
      // console.log(this.ItemUnitSell);
      // this.GetUnitConvertion(5, 12, 0);
      this.GetUnitConvertion(Typeid, this.ItemUnitSell[i].unit_sell_id, i);
    });
  }

}
