import { Request } from 'express';

import { takeUntil } from 'rxjs/operators';
import { ItemService } from './../services/item.service';
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
import { FormGroup } from '@angular/forms';
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
  public selectedOption: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public UnitData: any = [];
  public ItemTypeData: any = [];
  public SizeData: any = [];
  public MaterialTypeData: any = [];
  public MaterialColorData: any = [];
  public MaterialGradeData: any = [];
  public MaterialManuFactuData: any = [];
  public LocationData: any = [];
  public SpareTypeData: any = [];
  constructor(
    private itemSvc: ItemService,
    private router: Router,
    public itemForm: BaseFormItem
  ) { }
  url ="assets/images/noimageaval.png"

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {

    // this.itemForm.baseForm.get('role').setValidators(null);
    // this.itemForm.baseForm.get('role').updateValueAndValidity();
    this.GetItemType();
    // this.GetSize();
    this.GetMaterialType();
    this.GetMaterialColor();
    this.GetMaterialGrade();
    this.GetMaterialManuFactu();
    this.GetLocation();
    this.GetSpareType();
    this.GetUnit();
    this.itemForm.baseForm.patchValue({price: 0});
  }

 GetItemType(): void {
  this.itemSvc.getItemType().subscribe(resp => {
    this.ItemTypeData = resp.data;
    console.log(this.ItemTypeData);
  });

 }
 GetMaterialType(): void {
  this.itemSvc.getMaterialType().subscribe(resp => {
    this.MaterialTypeData = resp.data;
    console.log(this.MaterialTypeData);
  });

 }
 GetMaterialColor(): void {
  this.itemSvc.getMaterialColor().subscribe(resp => {
    this.MaterialColorData = resp.data;
    console.log(this.MaterialColorData);
  });

 }
 GetMaterialGrade(): void {
  this.itemSvc.getMaterialGrade().subscribe(resp => {
    this.MaterialGradeData = resp.data;
    console.log(this.MaterialGradeData);
  });

 }
 GetMaterialManuFactu(): void {
  this.itemSvc.getMaterialManuFactu().subscribe(resp => {
    this.MaterialManuFactuData = resp.data;
    console.log(this.MaterialManuFactuData);
  });

 }
 GetLocation(): void {
  this.itemSvc.getLocation().subscribe(resp => {
    this.LocationData = resp.data;
    console.log(this.LocationData);
  });

 }
 GetSpareType(): void {
  this.itemSvc.getSpareType().subscribe(resp => {
    this.SpareTypeData = resp.data;
    console.log(this.SpareTypeData);
  });

 }
 GetUnit(): void {
  this.itemSvc.getUnit().subscribe(resp => {
    this.UnitData = resp.data;
    console.log(this.UnitData);
  });

 }
 GetSize(): void {
  this.itemSvc.getSize().subscribe(resp => {
    this.SizeData = resp.data;
    console.log(this.SizeData);
  });

 }



  onAdd(): void {
    console.log(this.itemForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.itemForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(formData);

    if (this.itemForm.baseForm.invalid) {
      return;
    }
    // const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.itemSvc.new(formData).subscribe((res) => {

        this.router.navigate(['base/item/list-fg']);
      });
    }
  }
  onChange(event: any): void {
    const file = event.target.files[0];
    this.itemForm.baseForm.patchValue({
      select_file: file
    });

  }
  onChangePicture(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(e: any)=>
    this.url=e.target.result;
    const file = event.target.files[0];
    this.itemForm.baseForm.patchValue({
      image: file
    });

  }
  onImport(): void {
    console.log(this.itemForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.itemForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(formData);

    if (this.itemForm.baseForm.invalid) {
      return;
    }
    // const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.itemSvc.Import(formData).subscribe((res) => {

        this.router.navigate(['base/item/list-fg']);
      });
    }
  }


  onItemTypeIdCnage(form:FormGroup){
    alert(form.value.item_type_id);
    switch (form.value.item_type_id){
     case 1 : this.itemForm.baseForm = this.itemForm.baseFormFG; break;
     case 3 : this.itemForm.baseForm = this.itemForm.baseFormRM; break;
     default : this.itemForm.baseForm = this.itemForm.baseFormFG; break;
  }

  }

}
