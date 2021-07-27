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
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public ItemTypeData: any=[];
  public SizeData: any=[];

  constructor(
    private itemSvc: ItemService,
    private router: Router,
    public itemForm: BaseFormItem,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.itemForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.itemForm.baseForm.get('role').setValidators(null);
    this.itemForm.baseForm.get('role').updateValueAndValidity();
    this.GetItemType();
    this.GetSize();
  }

  GetItemType(): void {
    this.itemSvc.getItemType().subscribe(resp => {
      this.ItemTypeData = resp.data;
      console.log(this.ItemTypeData);
    });

   }
   GetSize(): void {
    this.itemSvc.getSize().subscribe(resp => {
      this.SizeData = resp.data;
      console.log(this.SizeData);
    });

   }

  onUpdate(): void {
    if (this.itemForm.baseForm.invalid) {
      return;
    }
    const formValue = this.itemForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT)
    {
      this.itemSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/item/list']);
      });
    }
  }
}
