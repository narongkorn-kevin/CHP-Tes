import {  Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
   // private el:ElementRef
  ) { }

  // tslint:disable-next-line:typedef
  formatDate(strDate: string) {
    let resDate;
    if (strDate) {
      const date = new Date(strDate);
      // Set the date
      resDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' + date.getDate().toString().padStart(2, '0');
    } else {
      console.log('String is not date format.');
    }
    return resDate;
  }

  // tslint:disable-next-line:typedef
  formatDateFromBase(strDate: string) {
    // tslint:disable-next-line:prefer-const
    let resDate;
    if (strDate) {
      // String date_array = strDate.split('/');
      // const date = new Date(strDate);
      // console.log(strDate);
      // Set the date
      // resDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') +
      //   '-' + date.getDate().toString().padStart(2, '0');
      resDate = strDate.split('/')[2] + '-' + strDate.split('/')[1] + '-' + strDate.split('/')[0];
    } else {
      console.log('String is not date format.');
    }
    return resDate;
  }

  // tslint:disable-next-line:typedef
  toDay() {
    const date = new Date();
    let resDate;
    // Set the date
    resDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' + date.getDate().toString().padStart(2, '0');
    return resDate;
  }

  replaceJsonValue(obj: object, value = '') {
    let i = 0;
    for (let key in obj) {
      if (obj[key] == null) {
        obj[key] = value;
      }
      i++;
    }
    return obj;
  }

  replaceArrayValue(arr = [], value = '') {
    let i = 0;
    let newArr: any;
    arr.forEach((obj, j) => {
      for (let key in obj) {
        if (obj[key] == null) {
          arr[j][key] = value;
        }
        i++;
      }
    })
    return arr;
  }


  loadScriptTreeView() {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = 'assets/plugins/treeview/treeview.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);

  }

  loadScriptSelect2() {

    console.log('preparing to load...')
    let jNode = document.createElement('script');
    jNode.src = 'assets/js/vendors/jquery-3.5.1.min.js';
    jNode.type = 'text/javascript';
    jNode.async = false;
    jNode.charset = 'utf-8';

    let node = document.createElement('script');
    node.src = 'assets/plugins/select2/select2.full.min.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';

    let node2 = document.createElement('script');
    node2.src = 'assets/js/select2.js';
    node2.type = 'text/javascript';
    node2.async = true;
    node2.charset = 'utf-8';

    let node3 = document.createElement('script');
    node3.src = 'assets/plugins/sumoselect/jquery.sumoselect.js';
    node3.type = 'text/javascript';
    node3.async = true;
    node3.charset = 'utf-8';


    document.getElementsByTagName('body')[0].appendChild(jNode);
    document.getElementsByTagName('body')[0].appendChild(node);
    document.getElementsByTagName('body')[0].appendChild(node2);
    document.getElementsByTagName('body')[0].appendChild(node3);

  }

  async filterDatatable(event, columns, filterData) {
    console.log('columns', columns);
    ///  console.log(event);
    // ตัวให้เป็นตัวเล็กให้หมด
    let val = event.target.value.toLowerCase();
    // หาจำนวนคอลัม
    let colsAmt = columns.length;
    // หา ชื่อ คอลัมน์
    let keys = Object.keys(columns[0]);
    console.log('keys', keys);
    let data = await filterData.filter(function (item) {
      for (let i = 0; i < colsAmt; i++) {
        //console.log(item[keys[i]]);
        if (item[keys[i]]) {
          if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
            // ส่งคืนตัวที่เจอ
            return true;
          }
        }
      }
    });
    return data;
  }

  focusInvalidControls(el:any,form: FormGroup) {
    for (const key of Object.keys(form.controls)) {
      if (form.controls[key].invalid) {
        const invalidControl = el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
       // const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
}


