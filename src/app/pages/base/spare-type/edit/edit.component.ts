import { BaseFormSpareType } from './../../../../shared/utils/base-form-sparetype';
import { SpareTypeService } from './../services/spare-type.service';
import { takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private sparetypeSvc: SpareTypeService,
    private router: Router,
    public sparetypeForm: BaseFormSpareType,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.sparetypeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.sparetypeForm.baseForm.get('role').setValidators(null);
    this.sparetypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.sparetypeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.sparetypeForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.sparetypeSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/spare-type/list']);
      });
    }
  }
}
