import { DeliveryService } from './../services/delivery.service';
import { takeUntil } from 'rxjs/operators';
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
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';

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
  private subscription: Subscription = new Subscription();
  public CustomerList: any = [];
  public SaleList: any = [];
  public ItemData: any = [];
  public UnitData: any = [];
  public ItemTypeData: any = [];
  public ItemUnitSell: any = [];
  public dataRow: FormGroup;

  constructor(
    private saleorderSvc: DeliveryService,
    private router: Router,
    public saleorderForm: BaseFormSaleorder,
    public itemForm: BaseFormSaleOrderItem,
    private fb: FormBuilder
  ) {



    this.saleordersForm = this.fb.group({

      delevery: this.fb.array([]),
      sale_order_id: '',
      date: '',
      customer_id: '',
      user_id: '',
      file: '',
      remark: '',
    });

    // this.saleordersForm.patchValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addItem();
  }

  onChangeOrder(event: any): void {
    // this.saleordersForm.reset();
    this.itemsale().clear();
    this.GetSaleItem(event);
  }

  ngOnInit(): void {
    // this.GetCustomers();
    this.GetItemType();
    this.getSaleOrder();
    // // this.GetUnitConvertion(5, 12, 0);
    // this.total = '0.00';
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  itemsale(): FormArray {

    return this.saleordersForm.get('delevery') as FormArray
  }

  newItem(): FormGroup {
    return this.fb.group({
      item_type_id: '',
      item_id: '',
      item_name: '',
      qty: '0',
      unit_convertion_id: '',
      box: '',
      // unit_price: '0',
      // total_price: '0',
      // discount: '0',
      // amount: '0',
    });
  }

  addItem(): void {
    this.itemsale().push(this.newItem());
  }

  onChange(event: any, index: any): void {
    // this.eventname = event.split('|');



    // const rows = this.saleordersForm.get('delivery') as FormArray;
    // const qty = parseInt(rows.controls[index].get('qty').value);
    // const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    // const discount = parseInt(rows.controls[index].get('discount').value);

    // rows.controls[index].patchValue({ item_name: this.eventname[1] });
    // rows.controls[index].patchValue({ unit_price: this.eventname[2] });

    // const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    // rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    // rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });

    // this.GetUnitSell(this.eventname[0], index, rows.controls[index].get('item_type_id').value.split('|')[0]);

  }

  onChangeType(event: any, index: any): void {
    this.eventname = event;
    this.GetItem(this.eventname, index);
  }

  qtyChanged(index: any): void {
    // const rows = this.saleordersForm.get('delivery') as FormArray;
    // const qty = parseInt(rows.controls[index].get('qty').value);
    // const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    // const discount = parseInt(rows.controls[index].get('discount').value);
    // const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    // rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    // rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });
    // this.sumaryItem();
  }

  discountChanged(index: any): void {
    // const rows = this.saleordersForm.get('delivery') as FormArray;
    // const qty = parseInt(rows.controls[index].get('qty').value);
    // const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    // const discount = parseInt(rows.controls[index].get('discount').value);
    // const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    // rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    // rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });
    // this.sumaryItem();
  }

  onChangeUnit(event: any, index: any): void {
    // const rows = this.saleordersForm.get('delivery') as FormArray;
    // const qty = parseInt(rows.controls[index].get('qty').value);
    // const unitprice = parseInt(rows.controls[index].get('unit_price').value);
    // const discount = parseInt(rows.controls[index].get('discount').value);
    // const unit_convertion_id = parseInt(rows.controls[index].get('unit_convertion_id').value.split('|')[1]);

    // unit_convertion_id != null ? unit_convertion_id : 0;

    // rows.controls[index].patchValue({ amount: (qty * unit_convertion_id) * unitprice });
    // rows.controls[index].patchValue({ total_price: ((qty * unit_convertion_id) * unitprice) - discount });
    // this.sumaryItem();
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
    console.log(this.saleordersForm.value);

    for (let i = 0; i <= this.saleordersForm.value.delevery.length - 1; i++) {
      // const rows = this.saleordersForm.get('delivery') as FormArray;
      // const itemid = this.saleordersForm.value.order[i].item_id.split('|')[0].toString();
      // const itemtypeid = this.saleordersForm.value.order[i].item_type_id.split('|')[0].toString();
      // const unitconvertid = this.saleordersForm.value.order[i].unit_convertion_id.split('|')[0].toString();
      // rows.controls[i].patchValue({ item_id: itemid, item_type_id: itemtypeid, unit_convertion_id: unitconvertid });
      delete this.saleordersForm.value.delevery[i].item_type_id;
    }



    if (this.saleordersForm.invalid) {
      return;
    }

    const formValue = this.saleordersForm.value;
    if (this.actionTODO === Action.NEW) {
      this.saleorderSvc.new(formValue).subscribe((res) => {
        this.router.navigate(['warehouse/delivery/list']);
      });
    }
  }

  GetSaleItem(sale_id): void {
    this.saleorderSvc.getSaleItem(sale_id).subscribe(resp => {
      const rows = this.saleordersForm.get('delivery') as FormArray;

      for (let i = 0; i <= resp.data.sale_order_lines.length - 1; i++) {
        // tslint:disable-next-line:variable-name
        const item_type_ids = resp.data.sale_order_lines[i].item.item_type_id.toString();
        // tslint:disable-next-line:variable-name
        const item_ids = resp.data.sale_order_lines[i].item_id.toString();
        this.GetItem(item_type_ids, i);
        this.GetUnitSell(item_ids, i, item_type_ids);
      }

      // console.log('aaa', resp);
      // tslint:disable-next-line:max-line-length
      this.saleordersForm.patchValue({ customer_id: resp.data.customer_id, user_id: resp.data.user_id, remark: resp.data.remark });

      resp.data.sale_order_lines.map(d =>
        this.itemsale().push(this.fb.group({
          item_id: d.item_id,
          item_type_id: d.item.item_type_id,
          item_name: d.item_name,
          qty: d.qty,
          unit_convertion_id: d.unit_convertion_id,
          box: '',
          // unit_price: d.unit_price,
          // total_price: d.total_price,
          // discount: d.discount,
          // amount: d.amount,
        }))
      );
      // rows.push(resp.data[0].sale_order_lines);
    });

  }


  getSaleOrder(): void {
    this.saleorderSvc.getSaleOrder().subscribe(resp => {
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
      // this.GetSaleItem();
      // console.log(this.ItemTypeData);
    });

  }

  GetItem(id: any, i: any): void {
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

  GetUnitSell(id: any, i: any, Typeid: any): void {
    this.saleorderSvc.getUnitSell(id).subscribe(resp => {
      this.ItemUnitSell[i] = resp.data;
      // console.log(this.ItemUnitSell);
      // this.GetUnitConvertion(5, 12, 0);
      this.GetUnitConvertion(Typeid, this.ItemUnitSell[i].unit_sell_id, i);
    });
  }


  onImport(): void {
    console.log(this.saleorderForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.saleorderForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(formData);

    if (this.saleorderForm.baseForm.invalid) {
      return;
    }
    // const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.saleorderSvc.Import(formData).subscribe((res) => {

        this.router.navigate(['base/item/list-fg']);
      });
    }
  }

  onChangeImport(event: any): void {
    const file = event.target.files[0];
    this.saleorderForm.baseForm.patchValue({
      file: file
    });

  }
}
