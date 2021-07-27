import { HelperService } from './../../../../shared/helper.service';
import { takeUntil } from 'rxjs/operators';
import { ItemService } from './../services/item.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormItem } from '@shared/utils/base-form-item';
import { Subscription } from 'rxjs';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}
@Component({
  selector: 'app-edit-fg',
  templateUrl: './edit-fg.component.html',
  styleUrls: ['./edit-fg.component.scss']
})
export class EditFgComponent implements AfterViewInit, OnInit, OnDestroy {
  public selectedOption: string;
  actionTODO = Action.EDIT;
  showPasswordField = true;
  url: string;
  image_preview: string;
  hide = true;
  private subscription: Subscription = new Subscription();
  public ItemTypeData: any = [];
  public SizeData: any = [];
  public MaterialTypeData: any = [];
  public MaterialColorData: any = [];
  public MaterialGradeData: any = [];
  public MaterialManuFactuData: any = [];
  public LocationData: any = [];
  public SpareTypeData: any = [];
  public UnitData: any = [];
  public ItembyIdData: any = [];



  constructor(
    private itemSvc: ItemService,
    private router: Router,
    public itemForm: BaseFormItem,
    public activatedRoute: ActivatedRoute,
    public HelperService: HelperService
  ) {
    // console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    // this.itemForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  // url = this.router.getCurrentNavigation().extras.state.item.image_preview;
  // id = this.router.getCurrentNavigation().extras.state.item.id;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {

    this.GetItemType();
    this.GetMaterialType();
    this.GetMaterialColor();
    this.GetMaterialGrade();
    this.GetMaterialManuFactu();
    this.GetLocation();
    this.GetSpareType();
    this.GetUnit();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.GetItemByid(id);
    });


    // this.GetItemByid(this.id);
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


  onUpdate(): void {
    if (this.itemForm.baseForm.value.status === true) {
      this.itemForm.baseForm.patchValue({
        status: 1
      });

    }
    else {
      this.itemForm.baseForm.patchValue({
        status: 0
      });

    }
    let FormV = this.itemForm.baseForm.value
    let newFormdata: any = this.HelperService.replaceJsonValue(FormV, '');
    const formData = new FormData();
    Object.entries(newFormdata).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });
    if (this.itemForm.baseForm.invalid) {
      return;
    }

    const formValue = this.itemForm.baseForm.value;
    console.log(formValue);
    if (this.actionTODO === Action.EDIT) {
      this.itemSvc.update(formValue.id, formData).subscribe((res) => {
        this.router.navigate(['base/item/list-fg']);
      });
    }
  }

  onChangePicture(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) =>
      this.url = e.target.result;
    const file = event.target.files[0];
    this.itemForm.baseForm.patchValue({
      image: file
    });

  }

  GetItemByid(id): void {
    this.itemSvc.getById(id).subscribe((resp) => {
      this.ItembyIdData = resp.data;
      this.itemForm.baseForm.patchValue({
        id: this.ItembyIdData.id,
        item_id: this.ItembyIdData.item_id,
        item_type_id: this.ItembyIdData.item_type_id,
        name: this.ItembyIdData.name,
        size: this.ItembyIdData.size,
        min: this.ItembyIdData.min,
        max: this.ItembyIdData.max,
        price: this.ItembyIdData.price,
        unit_sell_id: this.ItembyIdData.unit_sell_id,
        unit_buy_id: this.ItembyIdData.unit_buy_id,
        unit_store_id: this.ItembyIdData.unit_store_id,
        material_type_id: this.ItembyIdData.material_type_id,
        material_grade_id: this.ItembyIdData.material_grade_id,
        material_color_id: this.ItembyIdData.material_color_id,
        material_manufactu_id: this.ItembyIdData.material_manufactu_id,
        spare_type_id: this.ItembyIdData.spare_type_id,
        location_id: this.ItembyIdData.location_id,
        status: this.ItembyIdData.status,

      });
      this.image_preview = this.ItembyIdData.image;
      this.url = this.image_preview;
      console.log('ItemByData', this.ItembyIdData);


    });
  }
}
