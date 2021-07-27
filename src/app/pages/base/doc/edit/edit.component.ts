import { takeUntil } from 'rxjs/operators';
import { DocService } from './../services/doc.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormDoc } from '@shared/utils/base-form-doc';
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
  dropdownList = [];
  selectedItems = [];
  dropdownSettings= {};
  private subscription: Subscription = new Subscription();
  public UserData: any = [];
  public UserAppove: any = [];
  constructor(
    private docSvc: DocService,
    private router: Router,
    public docForm: BaseFormDoc,
    public activatedRoute: ActivatedRoute,
    //private IDropdownSetting  : IDropdownSettings
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.docForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.docForm.baseForm.get('role').setValidators(null);
    this.docForm.baseForm.get('role').updateValueAndValidity();
    this.GetUser();

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onUpdate(): void {

    console.log('Test',this.docForm.baseForm)

    if (this.docForm.baseForm.invalid) {
      return;
    }
    const formValue = this.docForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.docSvc.update(formValue.id, formValue).subscribe((res) => {
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
