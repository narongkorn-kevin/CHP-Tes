import { takeUntil } from 'rxjs/operators';
import { DocService } from './../services/doc.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormDoc } from '@shared/utils/base-form-doc';
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
  public UserData: any = [];
  private subscription: Subscription = new Subscription();
  public UserAppove: any = [];

  constructor(
    private docSvc: DocService,
    private router: Router,
    public docForm: BaseFormDoc,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.docForm.baseForm.get('role').setValidators(null);
    this.docForm.baseForm.get('role').updateValueAndValidity();
    this.GetUser();
  }

  onAdd(): void {
    if (this.docForm.baseForm.invalid) {
      return;
    }

    const formValue = this.docForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.docSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/doc/list']);
      });
    }
  }

  GetUser(): void {
    this.docSvc.getUser().subscribe(resp => {
      this.UserData = resp.data;
      console.log('User',this.UserData);
    });

  }

  CheckUserAppove(event): void {
    if(event.target.checked === true){
      console.log(this.UserAppove);
      this.UserAppove.push(event.target.value);
      this.docForm.baseForm.patchValue({
          user_appove: this.UserAppove,
        });
    }
    else{
      this.UserAppove = this.UserAppove.filter((item) => item !== event.target.value )
    }
  }

}
