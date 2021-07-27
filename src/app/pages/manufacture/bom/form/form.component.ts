import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogUnitConvertionComponent } from './../../../../shared/dialogs/dialog-unit-convertion/dialog-unit-convertion.component';
import { DialogUnitComponent } from './../../../../shared/dialogs/dialog-unit/dialog-unit.component';
import { DialogItemComponent } from './../../../../shared/dialogs/dialog-item/dialog-item.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { BomForm } from '../../../../shared/utils/manufacture/bom-form';
import { BomService } from '../services/bom.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { name: 'Brussels sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      }, {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [
              { name: 'Broccoli' },
              { name: 'Brussels sprouts' },
            ]
          }, {
            name: 'Orange',
            children: [
              { name: 'Pumpkins' },
              { name: 'Carrots' },
            ]
          },
        ]
      }
    ]
  },
];

interface BomNode {
  id: any,
  no: any
  bom_id: any,
  bom_name: any,
  item_id: any,
  unit_convertion_id: any,
  qty: any,
  status: any,
  status_by: any,
  status_at: any,
  reason: any,
  active: 1,
  create_by: any,
  update_by: any,
  created_at: any,
  updated_at: any,
  child?: BomNode[]
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit ,OnDestroy {
  bomsForm: FormGroup;
  BOM_DATA: BomNode[];
  actionTODO = Action.NEW;
  bomnode: BomNode[];
  public ItemTypeData: any = [];
  public ItemData: any = [];
  isValidFormSubmitted = null;
  private subscription: Subscription = new Subscription();


  treeControl = new NestedTreeControl<BomNode>(node => node.child);
  dataSource = new MatTreeNestedDataSource<BomNode>();
  // form = this.bomForm;
  constructor(

    private bomForm: BomForm,
    private bomSvc: BomService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {

    this.bomSvc.getBomTree(23).subscribe((res: any) => {
      res.data.no = '';
      let temRS = []; // ตัวแปล อาเล
      temRS[0] = res.data; // ตัวแปลพักเพื่อแปลงค่าที่ได้เป็น อาเล
      this.bomnode = temRS; // เซ็ต ค่าให้กับ บอม
      this.dataSource.data = this.bomnode; // ตัวแปลที่ใช้ แสดงใน ทรี
      console.log('res', this.dataSource.data);
    });


      this.bomsForm = this.fb.group({
        bom_id: ['', [Validators.required] ],
        bom_name: ['',[Validators.required] ],
        item_id: ['', [Validators.required] ],
        item_id2: ['', ],
        qty: ['', [Validators.required] ],
        unit_convertion_id: ['', [Validators.required]  ],
        unit_convertion_name: ['', ],
        // bomLine: this.fb.array([], [Validators.required]),

      });

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.addBom();
  }


  // bomLine(): FormArray {
  //   return this.bomsForm.get('bomLine') as FormArray
  // }



  // newBoms(): FormGroup {
  //   return this.fb.group({
  //     seq: ['', [Validators.required] ],
  //     item_id: ['', [Validators.required] ],
  //     item_id2: ['', ],
  //     unit_convertion_id: ['',[Validators.required] ],
  //     unit_convertion_name: ['', ],
  //     qty: ['', [Validators.required] ],
  //     master_item_id: ['', [Validators.required]],
  //     master_item_id2: ['',],

  //   })
  // }


  // addBom(): void {

  //   this.bomLine().push(this.newBoms());
  // }
  // removeBom(i: number): void {
  //   this.bomLine().removeAt(i);
  // }



  // ตรวจสอบ ว่า node มีลูกใหม
  hasChild = (_: number, node: BomNode) => !!node.child && node.child.length > 0;
  ngOnInit(): void {
  }


  openDialog() {

    let itemType = this.bomsForm.value;
    let itemData = this.bomsForm.value.bomLine;
    const dialogRef = this.dialog.open(DialogItemComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      itemType =
      {
        item_id: item.id,
        item_id2: item.item_id,
      }

      if (item) {
        this.bomsForm.patchValue(
          itemType
        )
      }

    });

  }

  openDialogUnit() {

    let unitconvertion = this.bomsForm.value;
    const dialogRef = this.dialog.open(DialogUnitConvertionComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      unitconvertion =
      {
        unit_convertion_id: item.id,
        unit_convertion_name: item.name
      }
      if (item) {
        this.bomsForm.patchValue(
          unitconvertion
        )
      }

    });

  }


  // openDialogItemBomline() {

  //   let itemType = this.bomsForm.value;
  //   const dialogRef = this.dialog.open(DialogItemComponent, {
  //     width: '900px',
  //     height: '400px',
  //   });

  //   // ปิด Dialog พร้อมรับค่า result
  //   dialogRef.afterClosed().subscribe(item => {
  //     console.log('Dialog result', item);
  //     itemType =
  //     {
  //       item_id: item.item_id
  //     }
  //     if (item) {
  //       this.bomsForm.patchValue(
  //         itemType
  //       )
  //     }

  //   });

  // }

  // openDialogItemBomline(boms, i) {
  //   let itemData = this.bomsForm.value.bomLine;
  //   console.log(this.bomsForm.value.bomLine[i]);
  //   const dialogRef = this.dialog.open(DialogItemComponent, {
  //     width: '900px',
  //     height: '400px',
  //   });

  //   // ปิด Dialog พร้อมรับค่า result
  //   dialogRef.afterClosed().subscribe(item => {
  //     console.log('Dialog Item', item);
  //     itemData[i] =
  //     {
  //       item_id: item.id,
  //       item_id2: item.item_id,
  //       // master_item_id: item.master_item_id
  //     };
  //     console.log('itemdata', itemData);
  //     if (item) {
  //       this.bomsForm.controls.bomLine.patchValue(
  //         itemData
  //       )
  //     }
  //   });

  // }

  // openDialogUnitConvertionBomline(boms, i) {
  //   let unitconvertion = this.bomsForm.value.bomLine;
  //   console.log(this.bomsForm.value.bomLine[i]);
  //   const dialogRef = this.dialog.open(DialogUnitConvertionComponent, {
  //     width: '900px',
  //     height: '400px',
  //   });

  //   // ปิด Dialog พร้อมรับค่า result
  //   dialogRef.afterClosed().subscribe(item => {
  //     console.log('Dialog result', item);
  //     unitconvertion[i] =
  //     {
  //       unit_convertion_id: item.id,
  //       unit_convertion_name: item.name,
  //       // master_item_id: item.master_item_id
  //     };
  //     console.log('Unit Data', unitconvertion);
  //     if (item) {
  //       this.bomsForm.controls.bomLine.patchValue(
  //         unitconvertion
  //       )
  //     }
  //   });

  // }
  // openDialogItemBomlineMaster(boms, i) {
  //   let itemData = this.bomsForm.value.bomLine;
  //   console.log(this.bomsForm.value.bomLine[i]);
  //   const dialogRef = this.dialog.open(DialogItemComponent, {
  //     width: '900px',
  //     height: '400px',
  //   });

  //   // ปิด Dialog พร้อมรับค่า result
  //   dialogRef.afterClosed().subscribe(item => {
  //     console.log('Dialog result', item);
  //     itemData[i] =
  //     {
  //       master_item_id: item.id,
  //       master_item_id2: item.item_id
  //       // item_id: item.item_id,

  //     };
  //     console.log('itemdata', itemData);
  //     if (item) {
  //       this.bomsForm.controls.bomLine.patchValue(
  //         itemData
  //       )
  //     }
  //   });

  // }

  onSubmit(): void {
    this.isValidFormSubmitted = false;
    // if (this.bomLine().invalid) {
    //   return;
    // }
    if (this.bomsForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    // console.log(this.bomsForm.value);

    if (this.bomsForm.invalid) {
      return;
    }


    // console.log('bomform before',this.bomsForm)
      delete this.bomsForm.value.item_id2;
      delete this.bomsForm.value.unit_convertion_name;
      console.log('bomform delete',this.bomsForm.value)

    const formValue = this.bomsForm.value;
    // console.log('FormvalueBefore',formValue)
    // formValue.BomLine = formValue.bomLine.forEach(del => {
    //   delete del.item_id2
    //   delete del.master_item_id2
    //   delete del.unit_convertion_name

    // });


    // console.log('delete', formValue.bomLine)

    if (this.actionTODO === Action.NEW) {
      console.log('Formvalue after delete',formValue)
      this.bomSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['manufacture/bom/list']);
      });
    }
  }


}
