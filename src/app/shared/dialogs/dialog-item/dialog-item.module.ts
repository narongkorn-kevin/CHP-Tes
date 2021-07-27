import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogItemRoutingModule } from './dialog-item-routing.module';
import { DialogItemComponent } from './dialog-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { MaterialModule } from '@app/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DialogItemComponent],
  imports: [
    CommonModule,
    DialogItemRoutingModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DialogItemModule { }
