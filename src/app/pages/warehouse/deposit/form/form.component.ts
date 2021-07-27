import { Deposit } from './../../../../shared/models/base.interface';
import { takeUntil } from 'rxjs/operators';
import { DepositService } from './../services/deposit.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormDeposit } from '@shared/utils/base-form-deposit';
import { BaseFormItem } from '@shared/utils/base-form-item';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '@app/shared/helper.service';
import { DialogItemForInventoryComponent } from '@app/shared/dialogs/dialog-item-for-inventory/dialog-item-for-inventory.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogItemComponent } from '@app/shared/dialogs/dialog-item/dialog-item.component';

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
  depositsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  public LocationData: any = [];
  public ItemTypeData: any = [];

  constructor(
    private depositSvc: DepositService,
    private router: Router,
    public depositForm: BaseFormDeposit,
    public itemForm: BaseFormItem,
    private fb: FormBuilder,
    private helper: HelperService,
    private dialog: MatDialog,
  ) {

    this.depositsForm = this.fb.group({
      deposit: this.fb.array([], [Validators.required]),
      date: this.helper.toDay(),

    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addDeposit();
  }

  deposit(): FormArray {

    return this.depositsForm.get('deposit') as FormArray
  }


  newDeposit(): FormGroup {
    return this.fb.group({
      item_part: '',
      item_name: '',
      item_id: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      location_1_id: ['', [Validators.required]],
      remark: '',

    })
  }
  addDeposit(): void {
    2
    this.deposit().push(this.newDeposit());
  }

  dateDeposit(): void {
    this.deposit().push(this.newDeposit());
  }

  removeDeposit(i: number): void {
    this.deposit().removeAt(i);
  }

  onSubmit(): void {
    this.isValidFormSubmitted = false;
    if (this.deposit().invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(this.depositsForm.value);

    if (this.depositsForm.invalid) {
      return;
    }

    const formValue = this.depositsForm.value;

    formValue.Deposit = formValue.deposit.forEach(del => {
      delete del.item_name,
      delete del.item_part
    });
    console.log('delete', formValue.deposit[0])

    if (this.actionTODO === Action.NEW) {
      this.depositSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['warehouse/deposit/list']);
      });
    }
  }
  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.GetLocation();
    this.GetItemType();

  }

  GetItem(id: String): void {
    this.depositSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });

  }

  GetItemType(): void {
    this.depositSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

  }

  GetLocation(): void {
    this.depositSvc.getLocation().subscribe(resp => {
      this.LocationData = resp.data;
      console.log(this.LocationData);
    });

  }

  onChange(event: any, i: Number): void {
    // alert(i);
    // alert(event);
    this.eventname = event;
    // alert(this.eventname);
    // this.GetLocation(this.eventname, i);
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

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogItemComponent,{
  //     width: '900px',
  //     height: '400px',
  //   });

  //   // ปิด Dialog พร้อมรับค่า result
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //     if(result){
  //       this.onSubmit();
  //     }
  //   });
  // }

  openDialog(depo, i) {
    let itemType = this.ItemTypeData;
    let itemData = this.depositsForm.value.deposit;
    console.log(this.depositsForm.value.deposit[i]);
    const dialogRef = this.dialog.open(DialogItemComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      itemType = {item_type_id: item.item_type_id}
      itemData[i] =
      {
        item_id: item.id,
        item_part: item.item_id,
        item_name: item.name
      };
      console.log('itemdata', itemData);
      if (item) {
        this.depositsForm.controls.deposit.patchValue(
          itemData
        )
      }
    });
    
  }




}
