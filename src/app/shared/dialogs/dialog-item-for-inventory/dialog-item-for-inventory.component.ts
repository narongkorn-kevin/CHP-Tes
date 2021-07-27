import { Component, Inject, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogItemForInventoryService } from '@app/shared/dialogs/dialog-item-for-inventory/service/dialog-item-for-inventory.service';
import { BaseFormItem } from '../../utils/base-form-item';
import { HelperService } from '../../helper.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dialog-item-for-inventory',
  templateUrl: './dialog-item-for-inventory.component.html',
  styleUrls: ['./dialog-item-for-inventory.component.scss']
})
export class DialogItemForInventoryComponent implements OnInit {
  eventname: string;
  public ItemData: any = [];
  public ItemTypeData: any = [];
  public ItemLots: any = [];
  public ItemDataLots: any = [];
  public aaa = "";
  formFilter: FormGroup;
  columns = [{ item_id: 'item_id', name: 'name', size: 'size' }];
  filterData = [];
  constructor(
    private dialogiteminventorySvc: DialogItemForInventoryService,
    public dialogRef: MatDialogRef<DialogItemForInventoryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private helper: HelperService,

  ) {
    this.formFilter = this.fb.group({
      item_type_id: [''],
      item_id: [''],
      item_name: ['']
    });
  }

  ngOnInit(): void {
    this.GetItemType();
    this.GetItem(this.data.item_type_id,this.data.item_id)
    this.GetItemLots(this.data.item_id);
    console.log('data', this.data);
    console.log('data item',this.data.item_id);
  }

  onSubmit(item: any) {
    item.data = this.formFilter.value;
    this.dialogRef.close(item);
    console.log('testitem', item);

  }
  onClose() {
    this.dialogRef.close();
  }

  GetItem(id: String,item_id:string =''): void {
    this.dialogiteminventorySvc.getItem(id).subscribe((resp: any) => {
      this.ItemData = resp.data;
      setTimeout(() => {
        this.formFilter.patchValue({
          item_type_id: this.data.item_type_id,
          item_id: this.data.item_id
        })

      }, 1000);

      console.log('item', this.data.item_id);
    });
  }
  GetItemLots(id: String): void {
    this.dialogiteminventorySvc.getItemLots(id).subscribe((resp: any) => {
      this.ItemDataLots = resp.data;
      console.log('item', this.ItemDataLots);
    });

  }
  GetItemType(): void {
    this.dialogiteminventorySvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log('itemtype', this.ItemTypeData);
    });
  }

  onChangeType(event: any): void {
    this.eventname = event;
    this.GetItem(this.eventname);
    console.log('onchangetype', this.eventname)
  }

  onChangeItem(event: any): void {
    this.eventname = event;
    this.GetItemLots(this.eventname)
    console.log('onchangeitem', this.eventname)
  }

}