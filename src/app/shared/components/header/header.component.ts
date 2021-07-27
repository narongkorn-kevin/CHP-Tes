import { Department } from './../../models/base.interface';
import { EmployeeService } from './../../../pages/base/employee/services/employee.service';
import { UserResponse } from './../../models/user.interface';

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Roles } from '@app/shared/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = null;
  isLogged = true;

  public ProfileName: string;
  public ProfileDepName: string;


  private destroy$ = new Subject<any>();
  public ProfileData: any = [];

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private authSvc: AuthService,
    private employeeSvc: EmployeeService
  ) {}

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isLogged = true;
        this.isAdmin = user?.role;
      });

    this.GetProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
  }

  GetProfile(): void {
    this.employeeSvc.getProfile().subscribe((resp) => {
      this.ProfileData = resp.data;
      this.ProfileName = this.ProfileData.name.split(' ')[0];
      this.ProfileDepName = this.ProfileData.department.name;

      // ProfileData.name.split(" ")[0]
      console.log(this.ProfileData);
    });
  }
}
