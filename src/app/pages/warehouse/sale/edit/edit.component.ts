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
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '@app/shared/helper.service';

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

  productForm: FormGroup;
  saleordersForm: FormGroup;
  dateForm: string;
  total: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  saleId: number;
  private subscription: Subscription = new Subscription();
  public CustomerList: any = [];
  public SaleList: any = [];
  public ItemData: any = [];
  public UnitData: any = [];
  public ItemTypeData: any = [];
  public ItemUnitSell: any = [];
  public dataRow: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private saleorderSvc: SaleorderService,
    private router: Router,
    public saleorderForm: BaseFormSaleorder,
    public itemForm: BaseFormSaleOrderItem,
    private fb: FormBuilder,
    private helper: HelperService
  ) {



    this.saleordersForm = this.fb.group({

      order: this.fb.array([], [Validators.required]),
      id: '',
      order_id: '',
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

    // this.saleordersForm.patchValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addItem();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.saleId = id;
      // this.GetItemSaleOrder(id);
      this.GetItemType(id);
    });
    this.GetCustomers();

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
      item_name: '',
      qty: '0',
      unit_convertion_id: '',
      unit_price: '0',
      total_price: '0',
      discount: '0',
      amount: '0',
    });
  }

  GetItemSaleOrder(id: String): void {
    this.saleorderSvc.getItemSaleOrder(id).subscribe(resp => {
      this.ItemData = resp.data;

      for (let i = 0; i <= this.ItemData.sale_order_lines.length - 1; i++) {
        // tslint:disable-next-line:variable-name
        const item_type_ids = this.ItemData.sale_order_lines[i].item.item_type_id.toString();
        // tslint:disable-next-line:variable-name
        const item_ids = this.ItemData.sale_order_lines[i].item_id.toString();
        this.GetItem(item_type_ids, i);
        this.GetUnitSell(item_ids, i, item_type_ids);
      }

      console.log(this.helper.formatDateFromBase(this.ItemData.date));

      this.saleordersForm.patchValue(this.ItemData);
      this.saleordersForm.patchValue({ date: this.helper.formatDateFromBase(this.ItemData.date) });
      this.saleordersForm.patchValue({ shipping_date: this.helper.formatDateFromBase(this.ItemData.shipping_date) });

      this.ItemData.sale_order_lines.map(d =>
        this.itemsale().push(this.fb.group({
          item_type_id: d.item.item_type_id,
          item_id: d.item_id,
          item_name: d.item_name,
          qty: d.qty,
          unit_convertion_id: d.unit_convertion_id + '|' + d.unit_convertion.value,
          unit_price: d.unit_price,
          total_price: d.total_price,
          discount: d.discount,
          amount: d.amount,
        }))
      );
    });
    this.subscription = this.itemsale().valueChanges.subscribe(data => {
      // alert(data[].total_price);
      this.total = data.reduce((sum, item) =>
        sum += Number(item.total_price.replace(/[^0-9.-]+/g, '')), 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    });
  }

  addItem(): void {
    this.itemsale().push(this.newItem());
  }

  approveOrder(status): void {
    if (status === 1) {
      if (confirm('Are you sure to approve this order?')) {
        this.saleorderSvc.approve(this.saleId, 'Approved').subscribe((res) => {
          this.router.navigate(['warehouse/sale/list']);
        });
      }

    } else {
      if (confirm('Are you sure to reject this order?')) {
        this.saleorderSvc.approve(this.saleId, 'Cancel').subscribe((res) => {
          this.router.navigate(['warehouse/sale/list']);
        });
      }
    }
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

  GetSaleItem(id): void {
    this.saleorderSvc.getSaleItem(id).subscribe(resp => {
      const rows = this.saleordersForm.get('order') as FormArray;

      for (let i = 0; i <= resp.data.sale_order_lines.length - 1; i++) {
        // tslint:disable-next-line:variable-name
        const item_type_ids = resp.data.sale_order_lines[i].item.item_type_id.toString();
        // tslint:disable-next-line:variable-name
        const item_ids = resp.data.sale_order_lines[i].item_id.toString();
        this.GetItem(item_type_ids, i);
        this.GetUnitSell(item_ids, i, item_type_ids);
      }

      resp.data.sale_order_lines.map(d =>
        this.itemsale().push(this.fb.group({
          item_id: d.item_id,
          item_type_id: d.item.item_type_id,
          item_name: d.item_name,
          qty: d.qty,
          unit_convertion_id: d.unit_convertion_id + '|' + d.unit_convertion.value,
          unit_price: d.unit_price,
          total_price: d.total_price,
          discount: d.discount,
          amount: d.amount,
        }))
      );
      // rows.push(resp.data[0].sale_order_lines);
    });

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

  GetItemType(id: any): void {
    this.saleorderSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      this.GetItemSaleOrder(id);
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

}
