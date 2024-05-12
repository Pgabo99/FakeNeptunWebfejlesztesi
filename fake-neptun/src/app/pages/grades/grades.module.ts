import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ClassDetailComponent } from './class-detail/class-detail.component';


@NgModule({
  declarations: [
    GradesComponent,
    ClassDetailComponent
  ],
  imports: [
    CommonModule,
    GradesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    NgxMaterialTimepickerModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class GradesModule { }
