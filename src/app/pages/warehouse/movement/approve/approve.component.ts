import { BaseFormMovementApprove } from './../../../../shared/utils/base-form-movement-approve';
import { BaseFormMovement } from './../../../../shared/utils/base-form-movement';

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
import { MovementService } from '../services/movement.service';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements AfterViewInit, OnInit, OnDestroy {


  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  public ItemData: any = [];
  constructor(
    private movementSvc: MovementService,
    private router: Router,
    public movementForm: BaseFormMovement,
    public activatedRoute: ActivatedRoute,
    public approveForm: BaseFormMovementApprove
  ) {
    // console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    // this.approveForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.getReportById(id);
    });
  }

  getReportById(id): void {
    this.movementSvc.getReportById(id).subscribe(resp => {
      this.ItemData = resp.data;
      console.log('my data',this.ItemData);
      this.approveForm.baseForm.patchValue({ id: this.ItemData.id});
      this.approveForm.baseForm.patchValue({ report_id: this.ItemData.report_id});
      this.approveForm.baseForm.patchValue({ status: this.ItemData.status});
      this.approveForm.baseForm.patchValue({ reason: this.ItemData.reason});
      console.log('my data 2', this.approveForm.baseForm);
    });
  }
}
