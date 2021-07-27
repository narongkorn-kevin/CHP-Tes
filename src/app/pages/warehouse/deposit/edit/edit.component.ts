import { Deposit } from '@app/shared/models/base.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogItemComponent } from '@app/shared/dialogs/dialog-item/dialog-item.component';
import { takeUntil } from 'rxjs/operators';
import { DepositService } from './../services/deposit.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseFormDeposit } from '@shared/utils/base-form-deposit';
import { BaseFormItem } from '@shared/utils/base-form-item';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
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
export class EditComponent implements OnInit {

  actionTODO1 = Action.EDIT;
  productForm: FormGroup;
  depositsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  depositId: number;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  public LocationData: any = [];
  public ItemTypeData: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
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
      item_type_id: '',
    });

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

  deposit(): FormArray {

    return this.depositsForm.get('deposit') as FormArray
  }
  newDeposit(): FormGroup {
    return this.fb.group({
      item_id: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      location_1_id: ['', [Validators.required]],
      item_name: '',
      trans_id: '',
      item_part: '',
      balance: '',
      remark: '',
      status: '',
    })
  }



  ngOnInit(): void {
    this.GetLocation();
    this.GetItemType();

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.depositId = id;
      this.GetReportByID(id);
    });
  }

  //get item//
  // GetItem(id: String): void {
  //   this.depositSvc.getItem(id).subscribe(resp => {
  //     this.ItemData = resp.data;
  //     console.log(this.ItemData);
  //   });

  // }
  // GetItem(id: any, i: any): void {
  //   this.depositSvc.getItem(id.split('|')[0]).subscribe(resp => {
  //     this.ItemData[i] = resp.data;
  //     console.log(this.ItemData[i]);
  //   });
  // }

  GetItem(id: String): void {
    this.depositSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });

  }

  //get item-type//
  GetItemType(): void {
    this.depositSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

  }

  //get location//
  GetLocation(): void {
    this.depositSvc.getLocation().subscribe(resp => {
      this.LocationData = resp.data;
      console.log(this.LocationData);
    });

  }

  ///getbyID///
  GetReportByID(id: String): void {
    this.depositSvc.getReportById(id).subscribe(resp => {
      this.ItemData = resp.data;

      const rows = this.depositsForm.get('deposit') as FormArray;

      this.GetItem(this.ItemData.item_trans[0].item.item_type_id);
      console.log('itemdata1', this.ItemData)
      this.depositsForm.patchValue(this.ItemData);
      this.depositsForm.patchValue({
        date: this.helper.formatDateFromBase(this.ItemData.date),
        item_type_id: this.ItemData.item_trans[0].item.item_type_id,
      });
      console.log('itemdata2', this.ItemData.item_trans)
      this.ItemData.item_trans.map(d =>
        this.deposit().push(this.fb.group({
          item_id: d.item_id,
          item_name: d.item.name,
          item_part: d.item.item_id,
          trans_id: d.id,
          location_1_id: d.location_1_id,
          qty: d.qty,
          balance: d.balance,
          remark: d.remark,
        }))
      );
    });
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

  approveDeposit(status): void {
    if (status === 1) {
      if (confirm('Are you sure to approve this order?')) {
        this.depositSvc.approve(this.depositId, 'Approved').subscribe((res) => {
          this.router.navigate(['warehouse/deposit/list']);
        });
      }

    } else {
      if (confirm('Are you sure to reject this order?')) {
        this.depositSvc.approve(this.depositId, 'Reject').subscribe((res) => {
          this.router.navigate(['warehouse/deposit/list']);
        });
      }
    }
  }

  onSubmit(): void {
    console.log(this.depositsForm.value);
  }

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
      itemType = { item_type_id: item.item_type_id }
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

  onUpdateTrans(): void {
    const formValue = this.depositsForm.value.deposit
    console.log('TestUpdate', formValue[0])

    formValue.Deposit = formValue.forEach(del => {

      delete del.item_name,
        delete del.item_part,
        delete del.item_id,
        delete del.remark

        this.depositSvc.updateTrans(del.trans_id, del).subscribe((res) => {
        });
    });
    
    // if (this.actionTODO1 === Action.EDIT) {
    //   this.depositSvc.updateTrans(formValue[0].trans_id, formValue[0]).subscribe((res) => {

    //   });
    // }
  }

}
