import { Movement } from './../../../../shared/models/base.interface';

import { MatDialog } from '@angular/material/dialog';

import { takeUntil } from 'rxjs/operators';
import { MovementService } from './../services/movement.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseFormMovement } from '@shared/utils/base-form-movement';
import { BaseFormItem } from '@shared/utils/base-form-item';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '@app/shared/helper.service';
import { DialogItemComponent } from '@app/shared/dialogs/dialog-item/dialog-item.component';
import { DialogItemForInventoryComponent } from '@app/shared/dialogs/dialog-item-for-inventory/dialog-item-for-inventory.component';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit, OnInit, OnDestroy {

  productForm: FormGroup;
  movementsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  movementId: number;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  public LocationData: any = [];
  public LocationData2: any = [];
  public ItemTypeData: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private movementSvc: MovementService,
    private router: Router,
    public movementForm: BaseFormMovement,
    public itemForm: BaseFormItem,
    private fb: FormBuilder,
    private helper: HelperService,
    private dialog: MatDialog,
    private dialog1: MatDialog,
  ) {


    this.movementsForm = this.fb.group({
      move: this.fb.array([],[Validators.required]),
      date: this.helper.toDay(),
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addMovement();
  }

  movement(): FormArray {
    return this.movementsForm.get('move') as FormArray
  }


  newMovement(): FormGroup {
    return this.fb.group({
      item_id: '',
      item_part: '',
      item_name: '',
      qty: ['',[Validators.required]],
      location_1_id: ['',[Validators.required]],
      location_1_name: '',
      lot_id: '',
      location_2_id: ['',[Validators.required]],
      remark: '',
    });
  }

  addMovement(): void {
    this.movement().push(this.newMovement());
  }

  dateMovement(): void {
    this.movement().push(this.newMovement());
  }

  removeMovement(i: number): void {
    this.movement().removeAt(i);
  }

  // onSubmit(): void {
  //   this.isValidFormSubmitted = false;
  //   if (this.movement().invalid) {
  //     return;
  //   }
  //   this.isValidFormSubmitted = true;
  //   console.log(this.movementsForm.value);

  //   if (this.movementsForm.invalid) {
  //     return;
  //   }

  //   const formValue = this.movementsForm.value;

  //   formValue.Movement = formValue.move.forEach(del => {
  //     delete del.item_name,
  //     delete del.item_part,
  //     delete del.location_1_name
  //   });
  //   if (this.actionTODO === Action.NEW) {
  //     this.movementSvc.new(formValue).subscribe((res) => {
  //       console.log('New ', res);
  //       this.router.navigate(['warehouse/movement/list']);
  //     });
  //   }
  // }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.GetLocation2();
    this.GetItemType();

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.movementId = id;
      this.GetReportByID(id);
    });
  }

  GetItem(id: String): void {
    this.movementSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });
    

  }

  GetItemType(): void {
    this.movementSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

  }

  GetLocation(id, i): void {

    const LocationValue = this.movementsForm.value;

    this.LocationData[i] = [];
    this.movementSvc.getLocation(id).subscribe(resp => {
      this.LocationData[i] = resp.data;
      console.log('33333',this.LocationData[i]);

    });

  }

  GetLocation2(): void {
    this.movementSvc.getLocation2().subscribe(resp => {
      this.LocationData2 = resp.data;
      console.log(this.LocationData2);
    });

  }

  // onChange(event: any, i: Number): void {
  //   this.eventname = event;
  //   this.GetLocation(this.eventname, i);
 

  // }

  onChangeType(event: any): void {
    this.eventname = event;
    this.GetItem(this.eventname);
  }

openDialog(move, i) {
  let itemData = this.movementsForm.value.move;
  const dialogRef = this.dialog.open(DialogItemComponent,{
    width: '900px',
    height: '400px',
  });

  dialogRef.afterClosed().subscribe(item=>{
    console.log('Dialog result', item);
      itemData[i] =
      {
        item_id: item.id,
        item_part: item.item_id,
        item_name: item.name
      };
      console.log('itemdata', itemData[i].item_id);
      if (item) {
        // this.GetLocation(itemData[i].item_id,i);
        this.movementsForm.controls.move.patchValue(
          itemData
        ) 
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
            this.movementsForm.controls.move.patchValue(
              itemData
            );

          }
        });
      }

  })

}
GetReportByID(id: String): void {
  this.movementSvc.getReportById(id).subscribe(resp => {
    this.ItemData = resp.data;

    const rows = this.movementsForm.get('move') as FormArray;

    this.GetItem(this.ItemData.item_trans[0].item.item_type_id);
    console.log('itemdata1', this.ItemData)
    this.movementsForm.patchValue(this.ItemData);
    this.movementsForm.patchValue({
      date: this.helper.formatDateFromBase(this.ItemData.date),
      item_type_id: this.ItemData.item_trans[0].item.item_type_id,
    });
    console.log('itemdata2', this.ItemData.item_trans)
    this.ItemData.item_trans.map(d =>
      this.movement().push(this.fb.group({
        item_id: d.item_id,
        item_name: d.item.name,
        item_part: d.item.item_id,
        trans_id: d.id,
        location_1_id: d.location_1_id,
        location_1_name: d.location_1.name,
        location_2_id: d.location_2_id,
        qty: d.qty,
        lot_id: d.lot_id,
        balance: d.balance,
        remark: d.remark,
      }))
    );
  });
}

approveMovement(status): void {
  if (status === 1) {
    if (confirm('Are you sure to approve this order?')) {
      this.movementSvc.approve(this.movementId, 'Approved').subscribe((res) => {
        this.router.navigate(['warehouse/movement/list']);
      });
    }

  } else {
    if (confirm('Are you sure to reject this order?')) {
      this.movementSvc.approve(this.movementId, 'Reject').subscribe((res) => {
        this.router.navigate(['warehouse/movement/list']);
      });
    }
  }
}
onUpdateTrans(): void {
  const formValue = this.movementsForm.value.move
  console.log('TestUpdate', formValue[0])

  formValue.Move = formValue.forEach(del => {

    delete del.item_name,
      delete del.item_part,
      delete del.item_id,
      delete del.remark

      this.movementSvc.updateTrans(del.trans_id, del).subscribe((res) => {
      });
  });
  
  // if (this.actionTODO1 === Action.EDIT) {
  //   this.depositSvc.updateTrans(formValue[0].trans_id, formValue[0]).subscribe((res) => {

  //   });
  // }
}


}
