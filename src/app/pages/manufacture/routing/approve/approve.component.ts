import { BaseFormRouting } from './../../../../shared/utils/base-form-routing';
import { RoutingService } from './../services/routing.service';
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
  APPROVE = 'approve',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.APPROVE;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public RoutingbyIdData: any = [];

  constructor(
    private routingSvc: RoutingService,
    private router: Router,
    public routingForm: BaseFormRouting,
    public activatedRoute: ActivatedRoute
  ) {
    // console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    // this.positionForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    // this.positionForm.baseForm.get('role').setValidators(null);
    // this.positionForm.baseForm.get('role').updateValueAndValidity();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.GetRoutingbyId(id);
    });

  }

  onApprove(): void {
    if (this.routingForm.baseForm.invalid) {
      return;
    }

    const formValue = this.routingForm.baseForm.value;
    console.log('form',formValue);
    if (this.actionTODO === Action.APPROVE)
    {
      this.routingSvc.approve(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['manufacture/routing/list']);
      });
    }
  }

  GetRoutingbyId(id): void {
    this.routingSvc.getById(id).subscribe((resp) => {
      this.RoutingbyIdData = resp.data;
      this.routingForm.baseForm.patchValue({
        id: this.RoutingbyIdData.id,
        name: this.RoutingbyIdData.name,
        description: this.RoutingbyIdData.description,
        std_time: this.RoutingbyIdData.std_time,
        active: this.RoutingbyIdData.active,
        status: this.RoutingbyIdData.status,


      });
      console.log('ItemByData', this.RoutingbyIdData);


    });
  }
}
