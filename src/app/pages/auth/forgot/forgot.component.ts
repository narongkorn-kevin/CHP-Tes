import { takeUntil } from 'rxjs/operators';
import { ForgotService } from './services/forgot.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormForgot } from '@shared/utils/base-form-forgot';
import { Subscription } from 'rxjs';

declare var jQuery: any;

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();



  constructor(
    private forgotSvc: ForgotService,
    private router: Router,
    public forgotForm: BaseFormForgot
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function () {
        $('.app-header').css('display', 'none');
        $('.app-sidebar2').css('display', 'none');
        $('.app-sidebar3').css('display', 'none');
      });
    })(jQuery);
    // this.employeeForm.baseForm.get('role').setValidators(null);
    // this.employeeForm.baseForm.get('role').updateValueAndValidity();
  }


  ForgotPassword(): void {

    if (this.forgotForm.baseForm.invalid) {
      return;
    }

    const formValue = this.forgotForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.forgotSvc.new(formValue).subscribe((res) => {

        this.router.navigate(['./login']);
      });
    }
  }


}


