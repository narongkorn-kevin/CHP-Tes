import { DialogUnitConvertionService } from './services/dialog-unit-convertion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from '../../helper.service';
@Component({
  selector: 'app-dialog-unit-convertion',
  templateUrl: './dialog-unit-convertion.component.html',
  styleUrls: ['./dialog-unit-convertion.component.scss']
})
export class DialogUnitConvertionComponent implements OnInit {
  eventname: string;
  public UnitData: any = [];
  public ItemTypeData: any = [];
  public ItemLots: any = [];
  public aaa = "";
  formFilter: FormGroup;
  columns = [{ item_id: 'item_id', name: 'name', size: 'size' }];
  filterData = [];
  constructor(
    private dialogunitconvertionSvc: DialogUnitConvertionService,
    public dialogRef: MatDialogRef<DialogUnitConvertionComponent>,
    private fb: FormBuilder,
    private helper: HelperService
  ) {
    this.formFilter = this.fb.group({
      item_type_id: [''],
      item_id: [''],
      item_name: ['']
    });
  }

  ngOnInit(): void {
    // this.aaa = "1234566";
    // this.ItemData = [
    //   {
    //     id: 1,
    //     qty: "FG",
    //     name: " Finished  goods",
    //   },
    //   {
    //     id: 1,
    //     qty: "FG",
    //     name: " Finished  goods",
    //   },
    //   {
    //     id: 1,
    //     qty: "FG",
    //     name: " Finished  goods",
    //   },
    //   {
    //     id: 1,
    //     qty: "FG",
    //     name: " Finished  goods",
    //   }
    // ];

    // console.log( this.ItemData );
    this.GetItemType();

  }

  onSubmit(item: any) {
    item.data = this.formFilter.value;
    this.dialogRef.close(item);
    console.log('testitem',item)
  }
  onClose() {
    this.dialogRef.close();
  }

  GetunitConvertion(id: String): void {
    this.dialogunitconvertionSvc.getUnitConvertion(id).subscribe((resp: any) => {
      this.UnitData = resp.data;
      this.filterData = this.UnitData;
      console.log('item', this.UnitData);
    });

  }
  GetItemType(): void {
    this.dialogunitconvertionSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log('itemtype', this.ItemTypeData);
    });

  }

  onChangeType(event: any): void {
    // alert('success');
    this.eventname = event;
    this.GetunitConvertion(this.eventname);
    console.log('onchangetype', this.eventname)

  }

  onChangeItem(event: any): void {
    this.eventname = event;
    console.log('onchangeitem', this.eventname)

  }

  // Function filter
  /* ฟังชั่นค์กรอง */
  onFilter(event) {
    ///  console.log(event);
    // ตัวให้เป็นตัวเล็กให้หมด
    let val = event.target.value.toLowerCase();
    // หา ชื่อ คอลัมน์
    let keys = Object.keys(this.columns[0]);
    // หาจำนวนคอลัม
    let colsAmt = keys.length;
    // console.log('keys', keys);
    this.UnitData = this.filterData.filter(function (item) {
      //console.log('colsAmt',colsAmt);
      for (let i = 0; i < colsAmt; i++) {
        //console.log(colsAmt);
        if (item[keys[i]]) {
          if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
            // ส่งคืนตัวที่เจอ
            return true;
          }
        }
      }
    });
    console.log('this.ItemData', this.UnitData);
  }


}
