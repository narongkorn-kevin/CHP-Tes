import { BaseFormMachine } from './../../../../shared/utils/base-form-machine';
import { MachineService } from './../serivces/machine.service';
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
  public MachineByIdData: any = [];

  constructor(
    private machineSvc: MachineService,
    private router: Router,
    public machineForm: BaseFormMachine,
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
      this.GetMachinebyId(id);
    });

  }

  onUpdate(): void {
    if (this.machineForm.baseForm.invalid) {
      return;
    }
    const formValue = this.machineForm.baseForm.value;
    if (this.actionTODO === Action.EDIT)
    {
      this.machineSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['manufacture/machine/list']);
      });
    }
  }

  GetMachinebyId(id): void {
    this.machineSvc.getById(id).subscribe((resp) => {
      this.MachineByIdData = resp.data;
      this.machineForm.baseForm.patchValue({
        id: this.MachineByIdData.id,
        name: this.MachineByIdData.name,
        setup_time: this.MachineByIdData.setup_time,
        status: this.MachineByIdData.status,


      });
      console.log('ItemByData', this.MachineByIdData);


    });
  }
}
