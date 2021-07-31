<<<<<<< HEAD
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
=======
import { MatInputModule } from '@angular/material/input';
>>>>>>> 3e0b1f46e386b314c6d37cdfc6d93c593765233d
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BenefitRoutingModule } from './benefit-routing.module'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';;
import {MatCardModule} from '@angular/material/card';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FormComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    BenefitRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatNativeDateModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ]
})
export class BenefitModule { }
