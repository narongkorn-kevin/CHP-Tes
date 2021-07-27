import { takeUntil } from 'rxjs/operators';
import { WithdrawService } from './../services/withdraw.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseFormWithdraw } from '@shared/utils/base-form-withdraw';
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
  productForm: FormGroup;
  withdrawsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  withdrawId: number;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  public LocationData: any = [];
  public ItemTypeData: any = [];
  public CustomerData: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private withdrawSvc: WithdrawService,
    private router: Router,
    public depositForm: BaseFormWithdraw,
    public itemForm: BaseFormItem,
    private fb: FormBuilder,
    private helper: HelperService
  ) {
    this.withdrawsForm = this.fb.group({
      withdraw: this.fb.array([], [Validators.required]),
      date: this.helper.toDay(),
      customer_id : '',
    });

  }

  addWithdraw(): void {2
    this.withdraw().push(this.newWithdraw());
  }

  dateWithdraw(): void {
    this.withdraw().push(this.newWithdraw());
  }

  removeWithdraw(i: number): void {
    this.withdraw().removeAt(i);
    
  }

  withdraw(): FormArray {

    return this.withdrawsForm.get('withdraw') as FormArray
  }
  newWithdraw(): FormGroup {
    return this.fb.group({
      item_id: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      location_1_id: ['', [Validators.required]],
      lot_id: '',
      item_part: '',
      item_name: '',
      balance: '',
      trans_id: '',
      remark: '',

    })
  }

  

  ngOnInit(): void {
    this.GetCustomer();
    this.GetItemType();
    this.GetLocation();
    
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.withdrawId = id;
      this.GetReportByID(id);
    });
  }
  GetItem(id: String): void {
    this.withdrawSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });

  }

//get item-type//
  GetItemType(): void {
    this.withdrawSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

  }
  GetCustomer(): void {
    this.withdrawSvc.getCustomer().subscribe(resp => {
      this.CustomerData = resp.data;
      console.log(this.CustomerData);
    });
  
   }

//get location//


// GetLocation(id, i): void {
//   this.LocationData[i] = [];
//   this.withdrawSvc.getLocation(id).subscribe(resp => {
//     this.LocationData[i] = resp.data;
//     console.log(this.LocationData[i]);
//   });

// }

GetLocation(): void {
  this.withdrawSvc.getLocation1().subscribe(resp => {
    this.LocationData = resp.data;
    console.log(this.LocationData);
  });

}

///getbyID///
  GetReportByID(id: String): void {
    this.withdrawSvc.getReportById(id).subscribe(resp => {
      this.ItemData = resp.data;

      const rows = this.withdrawsForm.get('withdraw') as FormArray;

      this.GetItem(this.ItemData.item_trans[0].item.item_type_id);
      console.log('itemdata1',this.ItemData)
      this.withdrawsForm.patchValue(this.ItemData);
      this.withdrawsForm.patchValue({ 
        date: this.helper.formatDateFromBase(this.ItemData.date),
        customer_id: this.ItemData.item_trans[0].customer_id,
        
       });
      console.log('itemdata2',this.ItemData.item_trans[0])
      this.ItemData.item_trans.map(d =>
        this.withdraw().push(this.fb.group({
         
          item_id: d.item_id,
          item_name: d.item.name,
          item_part: d.item.item_id,
          location_1_id: d.location_1_id,
          location_1_name: d.location_1.name,
          qty: d.qty, 
          remark: d.remark, 
          lot_id: d.lot_id,
          balance: d.balance,
          trans_id: d.id,
        }))
      );
    });
  }

  onChangeType(event: any,i: Number): void {
    // alert(i);
    // alert(event);
    this.eventname = event;
    // alert(this.eventname);
    // this.GetLocation(this.eventname, i);
    // this.itemForm.baseForm.patchValue({
    //   select_file: file
    // });

  }

  approveWithdraw(status): void {
    if (status === 1) {
      if (confirm('Are you sure to approve this order?')) {
        this.withdrawSvc.approve(this.withdrawId, 'Approved').subscribe((res) => {
          this.router.navigate(['warehouse/withdraw/list']);
        });
      }

    } else {
      if (confirm('Are you sure to reject this order?')) {
        this.withdrawSvc.approve(this.withdrawId, 'Reject').subscribe((res) => {
          this.router.navigate(['warehouse/withdraw/list']);
        });
      }
    }
  }

  onSubmit(): void {
    console.log(this.withdrawsForm.value);
  }

  onUpdateTrans(): void {
    const formValue = this.withdrawsForm.value.withdraw
    console.log('TestUpdate',formValue)

    formValue.Withdraw = formValue.forEach(del => {

      delete del.item_name,
        delete del.item_part,
        delete del.item_id,
        delete del.remark

        this.withdrawSvc.updateTrans(del.trans_id, del).subscribe((res) => {
        });
    });
    
    // if (this.actionTODO1 === Action.EDIT) {
    //   this.depositSvc.updateTrans(formValue[0].trans_id, formValue[0]).subscribe((res) => {

    //   });
    // }
  }

}
