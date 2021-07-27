import { DialogItemForInventoryComponent } from './../../../../shared/dialogs/dialog-item-for-inventory/dialog-item-for-inventory.component';
import { Withdraw } from './../../../../shared/models/base.interface';
import { HelperService } from './../../../../shared/helper.service';
import { takeUntil } from 'rxjs/operators';
import { WithdrawService } from './../services/withdraw.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormWithdraw } from '@shared/utils/base-form-withdraw';
import { BaseFormItem } from '@shared/utils/base-form-item';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogItemComponent } from '@app/shared/dialogs/dialog-item/dialog-item.component';
import { MatDialog } from '@angular/material/dialog';

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
  withdrawsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  public LocationData: any = [];
  public CustomerData: any = [];
  public ItemTypeData: any = [];
  // public SizeData: any=[];

  constructor(
    private helper: HelperService,
    private withdrawSvc: WithdrawService,
    private router: Router,
    public withdrawForm: BaseFormWithdraw,
    public itemForm: BaseFormItem,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialog1: MatDialog,
  ) {
    // this.productForm = this.fb.group({
    //   name: '',
    //   quantities: this.fb.array([]) ,
    // });

    this.withdrawsForm = this.fb.group({

      withdraw: this.fb.array([], [Validators.required]),
      date: this.helper.toDay(),
      customer_id: ['', [Validators.required]],
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addWithdraw();
  }

  withdraw(): FormArray {
    // return this.productForm.get('quantities') as FormArray

    return this.withdrawsForm.get('withdraw') as FormArray
  }
  newWithdraw(): FormGroup {
    return this.fb.group({
      item_part: '',
      item_name: '',
      lot_id: '',
      location_1_name: '',
      item_id: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      location_1_id: ['', [Validators.required]],
      remark: '',
    });
  }
  addWithdraw(): void {

    console.log('1');
    this.withdraw().push(this.newWithdraw());
  }

  dateWithdraw(): void {
    this.withdraw().push(this.newWithdraw());
  }

  removeWithdraw(i: number): void {
    this.withdraw().removeAt(i);
  }

  onSubmit(): void {
    this.isValidFormSubmitted = false;
    if (this.withdraw().invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(this.withdrawsForm.value);

    if (this.withdrawsForm.invalid) {
      return;
    }

    const formValue = this.withdrawsForm.value;
    formValue.Withdraw = formValue.withdraw.forEach(del => {
      
      delete del.item_name,
      delete del.item_part,
      delete del.location_1_name
    });

    if (this.actionTODO === Action.NEW) {
      this.withdrawSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['warehouse/withdraw/list']);
      });
    }
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    // this.itemForm.baseForm.get('role').setValidators(null);
    // this.itemForm.baseForm.get('role').updateValueAndValidity();
    // this.GetItem();
    this.GetItemType();
    this.GetCustomer();
    // this.withdrawForm.baseForm.setValue({date: '07/06/2021'});
    // this.GetSize();
  }
  GetItem(id: String): void {
    this.withdrawSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });

  }

  GetItemType(): void {
    this.withdrawSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

  }

  GetLocation(id, i): void {
    this.LocationData[i] = [];
    this.withdrawSvc.getLocation(id).subscribe(resp => {
      this.LocationData[i] = resp.data;
      console.log(this.LocationData[i]);
    });

  }

  GetCustomer(): void {
    this.withdrawSvc.getCustomer().subscribe(resp => {
      this.CustomerData = resp.data;
      console.log(this.CustomerData);
    });

  }
  //  GetSize(): void {
  //   this.itemSvc.getSize().subscribe(resp => {
  //     this.SizeData = resp.data;
  //     console.log(this.SizeData);
  //   });

  //  }

  //Add//
  // onAdd(): void {
  //   console.log(this.itemForm.baseForm.value);
  //   const formData = new FormData();
  //   Object.entries(this.itemForm.baseForm.value).forEach(([key, value]: any[]) => {
  //     formData.append(key, value);
  //   });

  //   console.log(formData);

  //   if (this.itemForm.baseForm.invalid) {
  //     return;
  //   }
  //   // const formValue = this.employeeForm.baseForm.value;
  //   if (this.actionTODO === Action.NEW) {
  //     this.itemSvc.new(formData).subscribe((res) => {

  //       this.router.navigate(['base/item/list']);
  //     });
  //   }
  // }
  onChange(event: any, i: Number): void {
    // alert(i);
    // alert(event);
    this.eventname = event;
    // alert(this.eventname);
    this.GetLocation(this.eventname, i);
    // this.itemForm.baseForm.patchValue({
    //   select_file: file
    // });

  }

  onChangeType(event: any): void {
    // alert(i);
    // alert(event);
    this.eventname = event;
    // alert(this.eventname);
    this.GetItem(this.eventname);
    // this.itemForm.baseForm.patchValue({
    //   select_file: file
    // });

  }


  // openDialog(withd, i) {
  //   let itemData = this.withdrawsForm.value.withdraw;
  //   console.log(this.withdrawsForm.value.withdraw[i]);
  //   const dialogRef = this.dialog.open(DialogItemForInventoryComponent, {
  //     width: '900px',
  //     height: '400px',
  //   });

  //   // ปิด Dialog พร้อมรับค่า result
  //   dialogRef.afterClosed().subscribe(item => {
  //     console.log('Dialog result', item);
  //     // itemType = {item_type_id: item.item_type_id}
  //     itemData[i] =
  //     {
  //       item_id: item.item_id,
  //       item_part: item.item.item_id,
  //       item_name: item.item.name,
  //       lot_id: item.lot_id,
  //       location_1_id: item.location_1_id
  //     };
  //     console.log('itemdata', itemData);
  //     if (item) {
  //       this.withdrawsForm.controls.withdraw.patchValue(
  //         itemData
  //       );

  //     }
  //   });

  // }

  openDialog(withd, i) {
    let itemData = this.withdrawsForm.value.withdraw;
    console.log(this.withdrawsForm.value.withdraw[i]);
    const dialogRef = this.dialog.open(DialogItemComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      // itemType = {item_type_id: item.item_type_id}
      itemData[i] =
      {
        item_id: item.id,
        item_part: item.item_id,
        item_name: item.name,
      };
      console.log('itemdata', itemData);
      if (item) {
        this.withdrawsForm.controls.withdraw.patchValue(
          itemData

        );
        const dialogRef1 = this.dialog1.open(DialogItemForInventoryComponent, {
          width: '900px',
          height: '400px',
          data: {
            item_type_id: item.item_type_id,
            item_id: item.id
          }
          
        });

        // ปิด Dialog พร้อมรับค่า result
        dialogRef1.afterClosed().subscribe(item => {
          console.log('Dialog result1', item);
          itemData[i] =
          {
            lot_id: item.lot_id,
            location_1_id: item.location_1_id,
            location_1_name: item.location_1.name

          };
          console.log('itemdata', itemData);
          if (item) {
            this.withdrawsForm.controls.withdraw.patchValue(
              itemData
            );

          }
        });

      }
    });


  }



}
