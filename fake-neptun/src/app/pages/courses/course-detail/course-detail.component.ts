import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from '../../../shared/courses/courses.service';
import { Subscription } from 'rxjs';
import { Courses } from '../../../shared/model/courses';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassService } from '../../../shared/class/class.service';
import { Classes } from '../../../shared/model/classes';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  course?: Courses;

  courseIds: string[] = new Array();

  courses = new FormGroup({
    name: new FormControl({ value: this.course?.name, disabled: this.readOnly() }),
    classRoom: new FormControl({ value: this.course?.classRoom, disabled: this.readOnly() }),
    type: new FormControl({ value: this.course?.type, disabled: this.readOnly() }),
    language: new FormControl({ value: this.course?.language, disabled: this.readOnly() }),
    credit: new FormControl({ value: this.course?.credit, disabled: this.readOnly() }),
    studentNumber: new FormControl({ value: this.course?.studentNumber, disabled: this.readOnly() }),
    day: new FormControl({ value: this.course?.day, disabled: this.readOnly() }),
    from: new FormControl({ value: this.course?.from, disabled: this.readOnly() }),
    to: new FormControl({ value: this.course?.to, disabled: this.readOnly() })
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { courseId: string, jog: string }, private courseService: CoursesService,
    private classService: ClassService) {
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions.add(this.courseService.getCourseById(this.data.courseId).subscribe(datak => {
      this.course = datak[0];

    }))
    this.classService.getClassByStudentId(window.localStorage.getItem('token') as string).subscribe(datak => {
      datak.forEach(adatk => {
        this.courseIds.push(adatk.courseId);
      })
    })
  }

  courseAdd() {
    let seged: Classes = {
      id: '',
      courseId: this.data.courseId,
      studentId: localStorage.getItem('token') as string,
      grade: 0,
      accepted: false
    }
    this.classService.addClass(seged);
    alert('Sikeres tárgyfelvétel');
  }
  courseUpdate() {
    let seged: Courses = {
      id: this.course?.id as string,
      teacher: this.course?.teacher as string,
      name: this.courses.value.name == null ? this.course?.name as string : this.courses.value.name,
      classRoom: this.courses.value.classRoom == null ? this.course?.classRoom as string : this.courses.value.classRoom,
      type: this.courses.value.type == null ? this.course?.type as string : this.courses.value.type,
      language: this.courses.value.language == null ? this.course?.language as string : this.courses.value.language,
      credit: this.courses.value.credit == null ? this.course?.credit as number : this.courses.value.credit as unknown as number,
      studentNumber: this.courses.value.studentNumber == null ? this.course?.studentNumber as number : this.courses.value.studentNumber as unknown as number,
      day: this.courses.value.day == null ? this.course?.day as string : this.courses.value.day,
      from: this.courses.value.from == null ? this.course?.from as string : this.courses.value.from,
      to: this.courses.value.to == null ? this.course?.to as string : this.courses.value.to
    }
    this.courseService.updateCourse(seged);
  }

  courseDelete() {
    let seged: Courses = {
      id: this.course?.id as string,
      teacher: this.course?.teacher as string,
      name: this.course?.name as string,
      classRoom: this.course?.classRoom as string,
      type: this.course?.type as string,
      language: this.course?.language as string,
      credit: this.course?.credit as number,
      studentNumber: this.course?.studentNumber as number,
      day: this.course?.day as string,
      from: this.course?.from as string,
      to: this.course?.to as string,
    }
    this.courseService.deleteCourse(seged);
  }
  readOnly() {
    if (this.data.jog == 'Oktató')
      return false;
    return true;
  }

  hasId() {
    if (this.courseIds.length == 0)
      return false;
    return this.courseIds.indexOf(this.data.courseId) != -1;
  }
}
