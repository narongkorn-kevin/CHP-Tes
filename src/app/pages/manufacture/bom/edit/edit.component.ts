import { BaseFormBomApprove } from './../../../../shared/utils/base-form-bom-approve';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogUnitConvertionComponent } from './../../../../shared/dialogs/dialog-unit-convertion/dialog-unit-convertion.component';
import { DialogUnitComponent } from './../../../../shared/dialogs/dialog-unit/dialog-unit.component';
import { DialogItemComponent } from './../../../../shared/dialogs/dialog-item/dialog-item.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy , ElementRef, ViewChild } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { BomForm } from '../../../../shared/utils/manufacture/bom-form';
import { BomService } from '../services/bom.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { CloneDialogComponent } from '../clone-dialog/clone-dialog.component';
import { when } from 'jquery';
import Swal from 'sweetalert2';
import { HelperService } from '../../../../shared/helper.service';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}



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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('tree') tree;

  bomsForm: FormGroup;

  BOM_DATA: BomNode[];
  actionTODO = Action.EDIT;
  bomnode: BomNode[];
  bomId: number;
  allChild = [];
  public ItemTypeData: any = [];
  public BomByIdData: any = [];
  public ItemData: any = [];
  isValidFormSubmitted = null;
  private subscription: Subscription = new Subscription();


  treeControl = new NestedTreeControl<BomNode>(node => node.child);
  dataSource = new MatTreeNestedDataSource<BomNode>();
  // form = this.bomForm;
  constructor(

    private bomForm: BomForm,
    public bomApproveForm: BaseFormBomApprove,
    private bomSvc: BomService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private helpers : HelperService,
    private el : ElementRef,
  ) {

    this.bomsForm = this.fb.group({
      id: ['',],
      status: ['',],
      bom_id: ['', [Validators.required]],
      bom_name: ['', [Validators.required]],
      item_id: ['', [Validators.required]],
      item_id2: ['',],
      qty: ['', [Validators.required]],
      unit_convertion_id: ['', [Validators.required]],
      unit_convertion_name: ['',],
      active: ['', [Validators.required]],
      bomLine: this.fb.array([], [Validators.required]),
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addBom();
  }


  bomLine(): FormArray {
    return this.bomsForm.get('bomLine') as FormArray
  }



  newBoms(): FormGroup {
    return this.fb.group({
      seq: ['', [Validators.required]],
      item_id: ['', [Validators.required]],
      item_id2: ['',],
      unit_convertion_id: ['', [Validators.required]],
      unit_convertion_name: ['',],
      qty: ['', [Validators.required]],
      master_item_id: ['', [Validators.required]],
      master_item_id2: ['',],

    })
  }


  addBom(): void {
    this.bomLine().push(this.newBoms());
  }
  removeBom(i: number): void {
    this.bomLine().removeAt(i);
  }

  // ตรวจสอบ ว่า node มีลูกใหม
  hasChild = (_: number, node: BomNode) => !!node.child && node.child.length > 0;
  ngOnInit(): void {
    this.loadBomTree();
  }


  async addAllChild(node) {
    //console.log('node',node);
     await node.forEach((element, i) => {
     // while (this.hasChild(i, node) === true) {
        this.allChild.push(element.id);
        this.listChild(element.child);
        console.log('this.allchild',this.allChild);
    //  }
    });
  }

  async listChild(node){
    console.log('child node', node);
    node.forEach((element,i) => {
      if(this.hasChild(i,element.child)){
        this.addAllChild(element.child);
      }
    });
    this.addAllChild(node);
  }

  loadBomTree(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.bomId = id;
      this.GetBombyId(id);
      this.bomSvc.getBomTree(id).subscribe((res: any) => {
        res.data.no = '';
        let temRS = []; // ตัวแปล อาเล
        temRS[0] = res.data; // ตัวแปลพักเพื่อแปลงค่าที่ได้เป็น อาเล
        this.bomnode = temRS; // เซ็ต ค่าให้กับ บอม
        this.dataSource.data = this.bomnode; // ตัวแปลที่ใช้ แสดงใน ทรี
      });
    });
  }

  ngAfterViewInit() {
    this.tree.treeControl.expandAll();
  }


  openDialog() {

    let itemType = this.bomsForm.value;
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



  openDialogItemBomline(boms, i) {
    let itemData = this.bomsForm.value.bomLine;
    console.log(this.bomsForm.value.bomLine[i]);
    const dialogRef = this.dialog.open(DialogItemComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog Item', item);
      itemData[i] =
      {
        item_id: item.id,
        item_id2: item.item_id,
        // master_item_id: item.master_item_id
      };
      console.log('itemdata', itemData);
      if (item) {
        this.bomsForm.controls.bomLine.patchValue(
          itemData
        )
      }
    });

  }

  openDialogUnitConvertionBomline(boms, i) {
    let unitconvertion = this.bomsForm.value.bomLine;
    console.log(this.bomsForm.value.bomLine[i]);
    const dialogRef = this.dialog.open(DialogUnitConvertionComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      unitconvertion[i] =
      {
        unit_convertion_id: item.id,
        unit_convertion_name: item.name,
        // master_item_id: item.master_item_id
      };
      console.log('Unit Data', unitconvertion);
      if (item) {
        this.bomsForm.controls.bomLine.patchValue(
          unitconvertion
        )
      }
    });

  }
  openDialogItemBomlineMaster(boms, i) {
    let itemData = this.bomsForm.value.bomLine;
    console.log(this.bomsForm.value.bomLine[i]);
    const dialogRef = this.dialog.open(DialogItemComponent, {
      width: '900px',
      height: '400px',
    });

    // ปิด Dialog พร้อมรับค่า result
    dialogRef.afterClosed().subscribe(item => {
      console.log('Dialog result', item);
      itemData[i] =
      {
        master_item_id: item.id,
        master_item_id2: item.item_id
        // item_id: item.item_id,

      };
      console.log('itemdata', itemData);
      if (item) {
        this.bomsForm.controls.bomLine.patchValue(
          itemData
        )
      }
    });

  }

  onUpdate(): void {
    this.isValidFormSubmitted = false;
    if (this.bomLine().invalid) {
      return;
    }
    if (this.bomsForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    // console.log(this.bomsForm.value);

    if (this.bomsForm.invalid) {
      return;
    }


    // console.log('bomform id',this.bomsForm.value)
    delete this.bomsForm.value.item_id2;
    delete this.bomsForm.value.unit_convertion_name;
    // console.log('bomform delete',this.bomsForm.value)


    const formValue = this.bomsForm.value;
    // console.log('form vaule id',formValue.id ,' formvalue',formValue)
    formValue.BomLine = formValue.bomLine.forEach(del => {
      delete del.item_id2
      delete del.master_item_id2
      delete del.unit_convertion_name

    });

    if (this.actionTODO === Action.EDIT) {
      console.log('Formvalue after delete', formValue)
      this.bomSvc.update(formValue.id, formValue).subscribe((res) => {
        console.log('update ', res);
        this.router.navigate(['manufacture/bom/list']);
      });
    }
  }
  GetBombyId(id): void {
    this.bomSvc.getById(id).subscribe((resp) => {
      this.BomByIdData = resp.data;
      this.bomsForm.patchValue({
        id: this.BomByIdData.id,
        item_id: this.BomByIdData.item_id,
        item_id2: this.BomByIdData.item.item_id,
        bom_id: this.BomByIdData.bom_id,
        bom_name: this.BomByIdData.bom_name,
        unit_convertion_id: this.BomByIdData.unit_convertion_id,
        unit_convertion_name: this.BomByIdData.unit_convertion.name,
        qty: this.BomByIdData.qty,
        bomLine: this.BomByIdData.bom_lines,
        active: this.BomByIdData.active,
        status: this.BomByIdData.status,
      });
      this.bomApproveForm.baseForm.patchValue(
        {
          reason: this.BomByIdData.reason
        }
      )
      const rows = this.bomsForm.get('bomLine') as FormArray;

      this.BomByIdData.bom_lines.map(d =>
        this.bomLine().push(this.fb.group({
          seq: d.seq,
          item_id: d.item_id,
          item_id2: d.item.item_id,
          unit_convertion_id: d.unit_convertion_id,
          unit_convertion_name: d.unit_convertion.name,
          master_item_id: d.master_item.id,
          master_item_id2: d.master_item.item_id,
          qty: d.qty,
        })))
    });
  }



  approveOrder(status): void {
    console.log('status', status)
    if (status === 1) {
      if (confirm('Are you sure to approve this order?')) {
        this.bomSvc.approve(this.bomId, 'Approved').subscribe((res) => {
          this.router.navigate(['manufacture/bom/list']);
        });
      }

    } else {
      if (confirm('Are you sure to reject this order?')) {
        this.bomSvc.approve(this.bomId, 'Cancel').subscribe((res) => {
          this.router.navigate(['manufacture/bom/list']);
        });
      }
    }
  }

  dialogAddBom(node: BomNode): void {
    console.log('show node',node);
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500',
      //  height:'80%',
      data: node
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // เช็คว่าการบันทึกข้อมูลสำเร็จใหมที่หน้า ไดอะล๊อก
        this.loadBomTree(); // โหลด bom tree
      }
    });
  }

  dialogEditBom(node:BomNode):void{
    //console.log('show node',node);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500',
      //  height:'80%',
      data: node
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // เช็คว่าการบันทึกข้อมูลสำเร็จใหมที่หน้า ไดอะล๊อก
        this.loadBomTree(); // โหลด bom tree
      }
    });
  }

  onDeleteBomLine(node:BomNode):void{
    
    this.allChild = [node.id]; // เพิ่มตัวไลน์ปัจจุบันเข้า อาเล
    this.addAllChild(node.child); // เพิ่ม ลูกเข้าอาเล เพื่อนำไปลบ
  //  let cfm= confirm('กรุณายืนยันการลบรายการ');
    //if(cfm===false) return; //ถ้าไม่ยืนยันให้้ออกจากฟังชั่นไม่ต้องทำอะไรต่อ

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't delete bom line.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bomSvc.deleteBomLine(this.allChild).subscribe((res:any)=>{
          if(res.status===true){
            this.loadBomTree();
            Swal.fire('Deleted','Your bom line has been deleted.','success');
          }
        })
      }
    })
  }

  onSubmit(form:FormGroup):void{
    let value = form.value;
    if(form.valid){
      this.bomSvc.update(value.id,value).subscribe((res:any)=>{
        if(res.status===true) { Swal.fire('Alert','Save data successfully.','success'); }
        this.loadBomTree();
      });
    }else{
     alert('You fill out incomplete information.');
        this.helpers.focusInvalidControls(this.el,form);
    }
  }

  onClone(form:FormGroup):void{
   // console.log('show form',form.value);
    let value = form.value;
    const dialogRef = this.dialog.open(CloneDialogComponent, {
      width: '500',
      //  height:'80%',
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // เช็คว่าการบันทึกข้อมูลสำเร็จใหมที่หน้า ไดอะล๊อก
        this.loadBomTree(); // โหลด bom tree
      }
    });
  }

  onApprove(form:FormGroup){
    let value = form.value;
    if(!value.id){
      Swal.fire('Wraning','Bom id is not be null!','warning');
      return;
    }else{
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to approve this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.bomSvc.approve(value.id,'Approved').subscribe((result:any)=>{
            if(result.status===true){
              Swal.fire('Alert','Approve successfully','success');
              this.GetBombyId(value.id);
            }
          })
        }
      });
    }
  }

  onDelete(form:FormGroup){
    let value = form.value;
    if(!value.id){
      Swal.fire('Wraning','Bom id is not be null!','warning');
      return;
    }else{
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.bomSvc.delete(value.id).subscribe((result:any)=>{
              Swal.fire('Alert','Delete successfully','success').then(()=>{
                this.router.navigate(['manufacture/bom/list']);
              });
          })
        }
      });
    }
  }
}
