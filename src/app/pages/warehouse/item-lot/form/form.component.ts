import { takeUntil } from 'rxjs/operators';
import { ItemLotService } from './../services/item-lot.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormDeposit } from '@shared/utils/base-form-deposit';
import { BaseFormItem } from '@shared/utils/base-form-item';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '@app/shared/helper.service';

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

  productForm: FormGroup;
  depositsForm: FormGroup;
  dateForm: string;
  eventname: string;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  isValidFormSubmitted = null;
  private subscription: Subscription = new Subscription();
  public ItemData: any=[];
  public LocationData: any=[];
  public ItemTypeData: any=[];
  public ItemLotData: any=[];

  constructor(
    private depositSvc: ItemLotService,
    private router: Router,
    public depositForm: BaseFormDeposit,
    public itemForm: BaseFormItem,
    private fb: FormBuilder,
    private helper: HelperService
  ) {
    // this.productForm = this.fb.group({
    //   name: '',
    //   quantities: this.fb.array([]) ,
    // });

    this.depositsForm = this.fb.group({

      deposit: this.fb.array([],[Validators.required]) ,
      date: this.helper.toDay(),
      item_lot_id: '',

    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addDeposit();
  }

  deposit() : FormArray {

    return this.depositsForm.get('deposit') as FormArray
  }


  newDeposit(): FormGroup {
    return this.fb.group({
      item_id: ['',[Validators.required]],
      qty: ['',[Validators.required]],
      location_1_id: ['',[Validators.required]],
      remark: '',

    })
  }
  addDeposit(): void {
    this.deposit().push(this.newDeposit());
  }

  dateDeposit(): void {
    this.deposit().push(this.newDeposit());
  }

  removeDeposit(i:number): void {
    this.deposit().removeAt(i);
  }

  onSubmit(): void {
    this.isValidFormSubmitted = false;
    if (this.deposit().invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    //console.log(this.depositsForm.value);

    if (this.depositsForm.invalid) {
      return;
    }

    const formValue = this.depositsForm.value;
    if (this.actionTODO === Action.NEW) {
      this.depositSvc.new(formValue).subscribe((res:any) => {
        console.log('New ', res);
          this.router.navigate(['warehouse/deposit/list']);
      });
    }
  }





  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.GetLocation();
    this.GetItemType();
    this.GetItemLot();
   
  }

  GetItem(id: String): void {
    this.depositSvc.getItem(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log(this.ItemData);
    });

  }

  GetItemType(): void {
    this.depositSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

  }

 
  GetLocation(): void {
    this.depositSvc.getLocation().subscribe(resp => {
      this.LocationData = resp.data;
      console.log(this.LocationData);
    }); 
  
   }

   GetItemLot(): void {
    this.depositSvc.getItemLot().subscribe(resp => {
      this.ItemLotData = resp.data;
      console.log('555',this.ItemLotData);
    }); 
  
   }

  onChange(event: any, i: Number): void {
    this.eventname = event;

  }

  onChangeType(event: any): void {
    this.eventname = event;
    this.GetItem(this.eventname);
  

  }


}
