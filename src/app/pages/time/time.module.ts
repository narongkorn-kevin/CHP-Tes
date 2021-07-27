import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeRoutingModule } from './time-routing.module';
import { TimeComponent } from './time.component';


@NgModule({
  declarations: [TimeComponent],
  imports: [
    CommonModule,
    TimeRoutingModule
  ]
})
export class TimeModule { }
