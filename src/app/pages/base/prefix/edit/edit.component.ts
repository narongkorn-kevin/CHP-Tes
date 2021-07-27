import { map, takeUntil } from 'rxjs/operators';
import { PrefixService } from './../services/services.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPrefix } from '@shared/utils/base-form-prefix';
import { Observable, Subscription } from 'rxjs';
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
    private prefixSvc: PrefixService,
    private router: Router,
    public prefixForm: BaseFormPrefix,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.prefixForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.prefixForm.baseForm.get('role').setValidators(null);
    this.prefixForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.prefixForm.baseForm.invalid) {
      return;
    }
    const formValue = this.prefixForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.prefixSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/prefix/list']);
      });
    }
  }

}
