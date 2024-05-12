import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from '../../../shared/courses/courses.service';
import { Courses } from '../../../shared/model/courses';
import { Subscription } from 'rxjs';
import { TheachersService } from '../../../shared/teachers/theachers.service';
import { Teacher } from '../../../shared/model/teacher';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  teacher?: Teacher;

  course = new FormGroup({
    name: new FormControl(''),
    classRoom: new FormControl(''),
    type: new FormControl(''),
    language: new FormControl(''),
    credit: new FormControl(''),
    studentNumber: new FormControl(''),
    day: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl('')
  })

  constructor(private courseService: CoursesService, private teacherService: TheachersService) {
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions.add(this.teacherService.getTeacherById(window.localStorage.getItem('token') as string).subscribe(data => {
      this.teacher = data[0];
    }))
  }
  addCourse() {
    if (this.course.value.name == '' && this.course.value.classRoom == '' && this.course.value.type == '' && this.course.value.language == '' &&
      this.course.value.credit == '' && this.course.value.studentNumber == '' && this.course.value.day == '' && this.course.value.from == '' && this.course.value.to == '')
      alert('Kérlek tölts ki minden mezőt!');
    let seged: Courses = {
      id: '',
      teacher: this.teacher?.name as string,
      name: this.course.value.name as string,
      classRoom: this.course.value.classRoom as string,
      type: this.course.value.type as string,
      language: this.course.value.language as string,
      credit: this.course.value.credit as unknown as number,
      studentNumber: this.course.value.studentNumber as unknown as number,
      day: this.course.value.day as string,
      from: this.course.value.from as string,
      to: this.course.value.to as string,
    }
    this.courseService.addCourse(seged).then(data => window.location.reload());

  }
}
