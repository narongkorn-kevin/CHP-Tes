import { LocationModule } from './location/location.module';
import { WarehouseModule } from './../warehouse/warehouse.module';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';

import { CompanyModule } from '../base/company/company.module';
import { BranchModule } from '../base/branch/branch.module';
import { DivisionModule } from '../base/division/division.module';
import { DepartmentModule } from '../base/department/department.module';
import { PositionModule } from '../base/position/position.module';
import { EmployeeModule } from '../base/employee/employee.module';
import { EmployeeTypeModule } from '../base/employee-type/employee-type.module';
import { GenderModule } from '../base/gender/gender.module';
import { PrefixModule } from '../base/prefix/prefix.module';
import { ItemTypeModule } from '@app/pages/base/item-type/item-type.module';
import { SizeModule } from '../base/size/size.module';
import { ItemModule } from '../base/item/item.module';
import { VendorModule } from '../base/vendor/vendor.module';
import { DocModule } from '../base/doc/doc.module';
import { DialogComponent } from './examples/dialog/dialog.component';
import { TreeViewComponent } from './examples/tree-view/tree-view.component';


const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'branch', loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule) },
  { path: 'division', loadChildren: () => import('./division/division.module').then(m => m.DivisionModule) },
  { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) },
  { path: 'position', loadChildren: () => import('./position/position.module').then(m => m.PositionModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'employee-type', loadChildren: () => import('./employee-type/employee-type.module').then(m => m.EmployeeTypeModule) },
  { path: 'gender', loadChildren: () => import('./gender/gender.module').then(m => m.GenderModule) },
  { path: 'prefix', loadChildren: () => import('./prefix/prefix.module').then(m => m.PrefixModule) },
  { path: 'item-type', loadChildren: () => import('./item-type/item-type.module').then(m => m.ItemTypeModule) },
  { path: 'size', loadChildren: () => import('./size/size.module').then(m => m.SizeModule) },
  { path: 'item', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
  { path: 'permission', loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule) },
  { path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) },
  { path: 'doc', loadChildren: () => import('./doc/doc.module').then(m => m.DocModule) },
  { path: 'unit', loadChildren: () => import('./unit/unit.module').then(m => m.UnitModule) },
  { path: 'unit-convertion', loadChildren: () => import('./unit-convertion/unit-convertion.module').then(m => m.UnitConvertionModule) },
  { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule) },
  { path: 'warehouses', loadChildren: () => import('./warehouses/warehouses.module').then(m => m.WarehousesModule) },
  { path: 'spare-type', loadChildren: () => import('./spare-type/spare-type.module').then(m => m.SpareTypeModule) },
  { path: 'material-type', loadChildren: () => import('./material-type/material-type.module').then(m => m.MaterialTypeModule) },
  { path: 'material-color', loadChildren: () => import('./material-color/material-color.module').then(m => m.MaterialColorModule) },
  { path: 'material-grade', loadChildren: () => import('./material-grade/material-grade.module').then(m => m.MaterialGradeModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'example-dialog', component: DialogComponent },
  { path: 'example-tree-view', component: TreeViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
  