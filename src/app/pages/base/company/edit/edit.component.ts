import { map, takeUntil } from 'rxjs/operators';
import { CompanyService } from './../services/company.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCompany } from '@shared/utils/base-form-company';
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
    private companySvc: CompanyService,
    private router: Router,
    public companyForm: BaseFormCompany,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.companyForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.companyForm.baseForm.get('role').setValidators(null);
    this.companyForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.companyForm.baseForm.invalid) {
      return;
    }
    const formValue = this.companyForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.companySvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/company/list']);
      });
    }
  }

}
