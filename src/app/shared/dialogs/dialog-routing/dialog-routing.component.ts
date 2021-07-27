import { DialogRoutingService } from './services/dialog-routing.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from '../../helper.service';
@Component({
  selector: 'app-dialog-routing',
  templateUrl: './dialog-routing.component.html',
  styleUrls: ['./dialog-routing.component.scss']
})
export class DialogRoutingComponent implements OnInit {
  eventname: string;
  public RoutingData: any = [];
  public ItemLots: any = [];
  public aaa = "";
  formFilter: FormGroup;
  columns = [{ name: 'name', description: 'description', std_time: 'std_time' }];
  filterData = [];
  constructor(
    private dialogroutingSvc: DialogRoutingService,
    public dialogRef: MatDialogRef<DialogRoutingComponent>,
    private fb: FormBuilder,
    private helper: HelperService
  ) {
    this.formFilter = this.fb.group({
      name: [''],
      description: [''],
      std_time: ['']
    });
  }

  ngOnInit(): void {

    this.GetRouting();

  }

  onSubmit(item: any) {
    item.data = this.formFilter.value;
    this.dialogRef.close(item);
    console.log('testitem',item)
  }
  onClose() {
    this.dialogRef.close();
  }


  GetRouting(): void {
    this.dialogroutingSvc.getRouting().subscribe(resp => {
      this.RoutingData = resp.data;
      console.log('RoutingData', this.RoutingData);
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
    this.RoutingData = this.filterData.filter(function (item) {
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
    console.log('this.RoutingData', this.RoutingData);
  }


}
