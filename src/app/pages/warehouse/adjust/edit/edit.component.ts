import { takeUntil } from 'rxjs/operators';
import { AdjustService } from './../service/adjust.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseFormAdjust } from '@shared/utils/base-form-adjust';
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
  adjustsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  adjustId: number;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  public LocationData: any = [];
  public ItemTypeData: any = [];
  public CustomerData: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private adjustSvc: AdjustService,
    private router: Router,
    public adjustForm: BaseFormAdjust,
    public itemForm: BaseFormItem,
    private fb: FormBuilder,
    private helper: HelperService
  ) {
    this.adjustsForm = this.fb.group({
      adjust: this.fb.array([], [Validators.required]),
      date: this.helper.toDay(),
      customer_id: '',
    });

  }

  addAdjust(): void {
    2
    this.adjust().push(this.newAdjust());
  }

  dateDeposit(): void {
    this.adjust().push(this.newAdjust());
  }

  removeDeposit(i: number): void {
    this.adjust().removeAt(i);
  }

  adjust(): FormArray {

    return this.adjustsForm.get('adjust') as FormArray
  }
  newAdjust(): FormGroup {
    return this.fb.group({
      item_id: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      location_1_id: ['', [Validators.required]],
      adjust_type: ['', [Validators.required]],
      item_name: '',
      status: '',
      item_part: '',
      trans_id: '',
      balance: '',
      remark: '',

    })
  }



  ngOnInit(): void {
    this.GetItemType();
    this.GetLocation();

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.adjustId = id;
      this.GetReportByID(id);
    });
  }
  GetItem(id: String): void {
    this.adjustSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });

  }

  //get item-type//
  GetItemType(): void {
    this.adjustSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

  }
  // GetCustomer(): void {
  //   this.adjustSvc.getCustomer().subscribe(resp => {
  //     this.CustomerData = resp.data;
  //     console.log(this.CustomerData);
  //   });

  //  }

  //get location//


  // GetLocation(id, i): void {
  //   this.LocationData[i] = [];
  //   this.withdrawSvc.getLocation(id).subscribe(resp => {
  //     this.LocationData[i] = resp.data;
  //     console.log(this.LocationData[i]);
  //   });

  // }

  GetLocation(): void {
    this.adjustSvc.getLocation().subscribe(resp => {
      this.LocationData = resp.data;
      console.log(this.LocationData);
    });

  }

  ///getbyID///
  GetReportByID(id: String): void {
    this.adjustSvc.getReportById(id).subscribe(resp => {
      this.ItemData = resp.data;

      const rows = this.adjustsForm.get('adjust') as FormArray;

      // for (let i = 0; i <= this.ItemData.item_trans - 1; i++) {
      //   // tslint:disable-next-line:variable-name
      //   const item_type_ids = this.ItemData.item_trans[i].item.item_type_id.toString();
      //   // tslint:disable-next-line:variable-name
      //   const item_ids = this.ItemData.item_trans[i].item_id.toString();
      //   this.GetItem(item_type_ids, i);
      //   // this.GetUnitSell(item_ids, i, item_type_ids);
      // }

      this.GetItem(this.ItemData.item_trans[0].item.item_type_id);
      console.log('itemdata1', this.ItemData)
      this.adjustsForm.patchValue(this.ItemData);
      this.adjustsForm.patchValue({
        date: this.helper.formatDateFromBase(this.ItemData.date),

      });


      this.ItemData.item_trans.map(d => {
        let status
        if (d.qty < 0) {

          status = 'Remove'
        } else {
          status = 'Add'
        }

        this.adjust().push(this.fb.group({
          item_id: d.item_id,
          location_1_id: d.location_1_id,
          qty: d.qty,
          status: status,
          item_name: d.item.name,
          item_part: d.item.item_id,
          balance: d.balance,
          remark: d.remark,
          trans_id: d.id
        }))
      }
      );
    });
  }

  onChangeType(event: any, i: Number): void {
    // alert(i);
    // alert(event);
    this.eventname = event;
    // alert(this.eventname);
    // this.GetLocation(this.eventname, i);
    // this.itemForm.baseForm.patchValue({
    //   select_file: file
    // });

  }

  approveAdjust(status): void {
    if (status === 1) {
      if (confirm('Are you sure to approve this order?')) {
        this.adjustSvc.approve(this.adjustId, 'Approved').subscribe((res) => {
          this.router.navigate(['warehouse/adjust/list']);
        });
      }

    } else {
      if (confirm('Are you sure to reject this order?')) {
        this.adjustSvc.approve(this.adjustId, 'Reject').subscribe((res) => {
          this.router.navigate(['warehouse/adjust/list']);
        });
      }
    }
  }

  onSubmit(): void {
    console.log(this.adjustsForm.value);
  }

  onUpdateTrans(): void {
    const formValue = this.adjustsForm.value.adjust
    console.log('TestUpdate', formValue[0])

    formValue.Adjust = formValue.forEach(del => {

      delete del.item_name,
        delete del.item_part,
        delete del.item_id,
        delete del.remark,
        delete del.status,

        this.adjustSvc.updateTrans(del.trans_id, del).subscribe((res) => {
        });
      console.log('id', del.trans_id)
    });

  }
}
