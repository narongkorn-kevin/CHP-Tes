import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogItemForInventoryComponent } from '../../../../shared/dialogs/dialog-item-for-inventory/dialog-item-for-inventory.component';
import { ConfirmDialogComponent } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { HelperService } from '../../../../shared/helper.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private helper: HelperService,
  ) {
  }

  ngOnInit(): void {
    console.log('preparing to load...')
    const jNode = document.createElement('script');
    jNode.src = 'src/assets/js/vendors/jquery-3.5.1.min.js';
    jNode.type = 'text/javascript';
    jNode.async = false;
    jNode.charset = 'utf-8';

    const node = document.createElement('script');
    node.src = 'assets/plugins/multipleselect/multiple-select.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';

    const node2 = document.createElement('script');
    node2.src = 'assets/plugins/multipleselect/multi-select.js';
    node2.type = 'text/javascript';
    node2.async = true;
    node2.charset = 'utf-8';

    const node3 = document.createElement('script');
    node3.src = 'assets/plugins/sumoselect/jquery.sumoselect.js';
    node3.type = 'text/javascript';
    node3.async = true;
    node3.charset = 'utf-8';


    document.getElementsByTagName('body')[0].appendChild(node);
    document.getElementsByTagName('body')[0].appendChild(node2);
  }
  //เปิด Dialog
  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { title: 'CONFIRM DIALOG', message: 'ARE YOU SURE ?' }
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        alert('To do somthink.');
      }
    });


  }

  openDialogItemForInventory() {
    const dialogRef = this.dialog.open(DialogItemForInventoryComponent, {
      width: '800px',
      data: { item_id: 222 }
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        alert('To do somthink.');
      }
    });
  }

}
