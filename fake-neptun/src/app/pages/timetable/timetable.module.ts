import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';
import { MenuComponent } from '../menu/menu.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { ListCoursesStudentsComponent } from './list-courses-students/list-courses-students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassFormComponent } from './class-form/class-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    TimetableComponent,
    ListCoursesComponent,
    ListCoursesStudentsComponent,
    ClassFormComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatLabel,
    MatSelectModule
  ]
})
export class TimetableModule {


}
