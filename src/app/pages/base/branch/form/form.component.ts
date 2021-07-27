import { takeUntil } from 'rxjs/operators';
import { BranchService } from './../services/branch.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormBranch } from '@shared/utils/base-form-branch';
import { Subscription } from 'rxjs';
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

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private branchSvc: BranchService,
    private router: Router,
    public branchForm: BaseFormBranch
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.branchForm.baseForm.get('role').setValidators(null);
    this.branchForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.branchForm.baseForm.invalid) {
      return;
    }

    const formValue = this.branchForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.branchSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/branch/list']);
      });
    }
  }

}
