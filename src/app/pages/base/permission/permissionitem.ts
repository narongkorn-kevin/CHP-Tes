import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PermissionItem {
  permissionitem = [
    {
      menu: {
        name: 'USER MENU',
        permission: [
          {
            label: 'VIEW USER',
            value: 'viewUser',
          },
          {
            label: 'SAVE USER',
            value: 'saveUser',
          },
          {
            label: 'EDIT USER',
            value: 'editUser',
          },
          {
            label: 'DELETE USER',
            value: 'deleteUser',
          },
        ],
      },
    },
    {
      menu: {
        name: 'PERMISSION MENU',
        permission: [
          {
            label: 'VIEW PERMISSION',
            value: 'viewPermission',
          },
          {
            label: 'SAVE PERMISSION',
            value: 'savePermission',
          },
          {
            label: 'EDIT PERMISSION',
            value: 'editPermission',
          },
          {
            label: 'DELETE PERMISSION',
            value: 'deletePermission',
          },
        ],
      },
    },
    {
      menu: {
        name: 'DEPARTMENT MENU',
        permission: [
          {
            label: 'VIEW DEPARTMENT',
            value: 'viewDepartment',
          },
          {
            label: 'SAVE DEPARTMENT',
            value: 'saveDepartment',
          },
          {
            label: 'EDIT DEPARTMENT',
            value: 'editDepartment',
          },
          {
            label: 'DELETE DEPARTMENT',
            value: 'deleteDepartment',
          },
        ],
      },
    },
  ];
}
