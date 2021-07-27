import { takeUntil } from 'rxjs/operators';
import { DeliveryService } from '../services/delivery.service';
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
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '@app/shared/helper.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  saleordersForm: FormGroup;
  dateForm: string;
  total: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  deliveryId: number;
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
    private deliverySvc: DeliveryService,
    private router: Router,
    public saleorderForm: BaseFormSaleorder,
    public itemForm: BaseFormSaleOrderItem,
    private fb: FormBuilder,
    private helper: HelperService) {
    this.saleordersForm = this.fb.group({

      delevery: this.fb.array([]),
      sale_order_id: '',
      date: '',
      customer_id: '',
      user_id: '',
      remark: '',
    });
  }

  ngOnInit(): void {
    this.GetItemType();
    this.getSaleOrder();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.deliveryId = id;
      this.GetItemDelivery(id);
    });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    // this.addItem();
  }

  onChangeOrder(event: any): void {
    // this.saleordersForm.reset();
    // this.itemsale().clear();
    // this.GetSaleItem(event);
  }

  itemsale(): FormArray {
    return this.saleordersForm.get('delevery') as FormArray
  }

  getSaleOrder(): void {
    this.deliverySvc.getSaleOrder().subscribe(resp => {
      this.SaleList = resp.data;
      // console.log(this.CustomerList);
    });
  }

  // tslint:disable-next-line:ban-types
  GetItemDelivery(id: String): void {
    this.deliverySvc.getItemDelivery(id).subscribe(resp => {
      this.ItemData = resp.data;

      const rows = this.saleordersForm.get('delivery') as FormArray;

      for (let i = 0; i <= this.ItemData.delevery_order_lines.length - 1; i++) {
        // tslint:disable-next-line:variable-name
        const item_type_ids = this.ItemData.delevery_order_lines[i].item.item_type_id.toString();
        // tslint:disable-next-line:variable-name
        const item_ids = this.ItemData.delevery_order_lines[i].item_id.toString();
        this.GetItem(item_type_ids, i);
        this.GetUnitSell(item_ids, i, item_type_ids);
      }

      console.log(this.helper.formatDateFromBase(this.ItemData.date));

      this.saleordersForm.patchValue(this.ItemData);
      this.saleordersForm.patchValue({ date: this.helper.formatDateFromBase(this.ItemData.date) });

      this.ItemData.delevery_order_lines.map(d =>
        this.itemsale().push(this.fb.group({
          item_id: d.item_id,
          item_type_id: d.item.item_type_id,
          item_name: d.item_name,
          qty: d.qty,
          unit_convertion_id: d.unit_convertion_id,
          box: d.box,
        }))
      );
    });

  }

  GetItem(id: any, i: any): void {
    this.deliverySvc.getItem(id.split('|')[0]).subscribe(resp => {
      this.ItemData[i] = resp.data;
      // console.log(this.ItemData[i]);
    });
  }

  GetItemType(): void {
    this.deliverySvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      // this.GetSaleItem();
      // console.log(this.ItemTypeData);
    });

  }


  GetUnitConvertion(TypeId, UnitId, i): void {
    this.deliverySvc.getUnitConvertion(TypeId, UnitId).subscribe(resp => {
      this.UnitData[i] = resp.data;
      // console.log(this.UnitData[i]);
    });

  }

  GetUnitSell(id: any, i: any, Typeid: any): void {
    this.deliverySvc.getUnitSell(id).subscribe(resp => {
      this.ItemUnitSell[i] = resp.data;
      // console.log(this.ItemUnitSell);
      // this.GetUnitConvertion(5, 12, 0);
      this.GetUnitConvertion(Typeid, this.ItemUnitSell[i].unit_sell_id, i);
    });
  }

  addItem(): void {
    this.itemsale().push(this.newItem());
  }

  approveOrder(status): void {
    if (status === 1) {
      if (confirm('Are you sure to approve this order?')) {
        this.deliverySvc.approve(this.deliveryId, 'Approved').subscribe((res) => {
          this.router.navigate(['warehouse/delivery/list']);
        });
      }

    } else {
      if (confirm('Are you sure to reject this order?')) {
        this.deliverySvc.approve(this.deliveryId, 'Cancel').subscribe((res) => {
          this.router.navigate(['warehouse/delivery/list']);
        });
      }
    }
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

  onSubmit(): void {
    console.log(this.saleordersForm.value);
  }

}
