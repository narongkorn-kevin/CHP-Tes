import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormItem } from '@shared/utils/base-form-item';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdjustService } from '../service/adjust.service';
import { BaseFormAdjust } from '@app/shared/utils/base-form-adjust';
import { HelperService } from '@app/shared/helper.service';
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
  adjustsForm: FormGroup;
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
    private adjustSvc: AdjustService,
    private router: Router,
    public adjustForm: BaseFormAdjust,
    public itemForm: BaseFormItem,
    private fb: FormBuilder,
    private helper: HelperService,
    private dialog: MatDialog
  ) {
    // this.productForm = this.fb.group({
    //   name: '',
    //   quantities: this.fb.array([]) ,
    // });

    this.adjustsForm = this.fb.group({
      adjust: this.fb.array([],[Validators.required]),
      date: this.helper.toDay(),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addAdjust();
  }

  adjust(): FormArray {
    return this.adjustsForm.get('adjust') as FormArray
  }

  newAdjust(): FormGroup {
    return this.fb.group({
      item_id: ['',[Validators.required]],
      qty: ['',[Validators.required]],
      location_1_id: ['',[Validators.required]],
      adjust_type: ['',[Validators.required]],
      item_name: '',
      item_part: '',
      remark: '',
    })
  }

  addAdjust(): void {

    this.adjust().push(this.newAdjust());
  }

  dateAdjust(): void {
    this.adjust().push(this.newAdjust());
  }

  removeAdjust(i: number): void {
    this.adjust().removeAt(i);
  }

  onSubmit(): void {
    this.isValidFormSubmitted = false;
    if (this.adjust().invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(this.adjustsForm.value);
    if (this.adjustsForm.invalid) {
      return;
    }
    const formValue = this.adjustsForm.value;
    formValue.Adjust = formValue.adjust.forEach(del => {
      delete del.item_name,
      delete del.item_part
    });

    if (this.actionTODO === Action.NEW) {
      this.adjustSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['warehouse/adjust/list']);
      });
    }
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.GetItemType();
    this.GetLocation();
  }

  GetItem(id: String): void {
    this.adjustSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });
  }

  GetItemType(): void {
    this.adjustSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log('ItemTypeData',this.ItemTypeData);
    });

  }

  GetLocation(): void {
    this.adjustSvc.getLocation().subscribe(resp => {
      this.LocationData = resp.data;
      console.log(this.LocationData);
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
    // this.GetLocation(this.eventname);
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
  openDialog(adj, i) {
    let itemType = this.ItemTypeData;
    let itemData = this.adjustsForm.value.adjust;
    console.log(this.adjustsForm.value.adjust[i]);
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
        this.adjustsForm.controls.adjust.patchValue(
          itemData
        )
      }
    });
    
  }


}
