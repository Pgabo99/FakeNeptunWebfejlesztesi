import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { languagePipe } from '../../shared/pipes/courseTime.pipe';
import { AddCoursesComponent } from './add-courses/add-courses.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CourseDetailComponent } from './course-detail/course-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    AddCoursesComponent,
    CourseDetailComponent,
    languagePipe,

  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
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
export class CoursesModule { }
