import { Branch, Position } from './../../../../shared/models/base.interface';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeResponse } from '@app/shared/models/base.interface';
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  };
  public dtOptions: DataTables.Settings = {};
  private destroy$ = new Subject<any>();
  public ProfileName: string;
  public ProfileDepName: string;
  public ProfileBranch: string;
  public ProfilePosition: string;
  public ProfileData: any = [];


  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private employeeSvc: EmployeeService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.GetProfile();

  }

  GetProfile(): void {
    this.employeeSvc.getProfile().subscribe((resp) => {
      this.ProfileData = resp.data;
      this.ProfileName = this.ProfileData.name;
      this.ProfileDepName = this.ProfileData.department.name;
      this.ProfileBranch = this.ProfileData.branch.name;
      this.ProfilePosition = this.ProfileData.position.name;
      // console.log(this.ProfileData);
    });
  }

}




