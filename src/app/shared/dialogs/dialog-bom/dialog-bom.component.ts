import { DiaglogBomService } from './services/diaglog-bom.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from '../../helper.service';
@Component({
  selector: 'app-dialog-bom',
  templateUrl: './dialog-bom.component.html',
  styleUrls: ['./dialog-bom.component.scss']
})
export class DialogBomComponent implements OnInit {
  eventname: string;
  public BomData: any = [];
  public ItemLots: any = [];
  public aaa = "";
  formFilter: FormGroup;
  columns = [{ bom_id: 'bom_id', bom_name: 'bom_name', unit_convertion_id: 'unit_convertion_id', item_name: 'item_name', qty: 'qty' }];
  filterData = [];
  constructor(
    private dialogbomSVc: DiaglogBomService,
    public dialogRef: MatDialogRef<DialogBomComponent>,
    private fb: FormBuilder,
    private helper: HelperService
  ) {
    this.formFilter = this.fb.group({
      bom_id: [''],
      bom_name: [''],
      unit_convertion_id: [''],
      item_name: [''],
      qty: [''],
    });
  }

  ngOnInit(): void {

    this.GetBom();

  }

  onSubmit(item: any) {
    item.data = this.formFilter.value;
    this.dialogRef.close(item);
    console.log('testitem',item)
  }
  onClose() {
    this.dialogRef.close();
  }


  GetBom(): void {
    this.dialogbomSVc.getBom().subscribe(resp => {
      this.BomData = resp.data;
      console.log('BomData', this.BomData);
    });

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
    this.BomData = this.filterData.filter(function (item) {
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
    console.log('this.BomData', this.BomData);
  }


}
