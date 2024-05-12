import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CoursesService } from '../../../shared/courses/courses.service';
import { Courses } from '../../../shared/model/courses';
import { TheachersService } from '../../../shared/teachers/theachers.service';
import { Subscription } from 'rxjs';
import { ClassService } from '../../../shared/class/class.service';
import { Classes } from '../../../shared/model/classes';
import { StudentService } from '../../../shared/students/students.service';
import { TeacherClass } from '../../../shared/model/teacherclass';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css'
})
export class ListCoursesComponent implements OnDestroy {
  @Output() courseObject: EventEmitter<any> = new EventEmitter();
  @Output() classObject: EventEmitter<any> = new EventEmitter();

  courses: Courses[] = new Array();
  private subscriptions = new Subscription();

  classes: TeacherClass[] = new Array();

  chosenCourse: string = '';
  constructor(private courseService: CoursesService, private teacherService: TheachersService, private classService: ClassService,
    private studentService: StudentService
  ) {
    this.subscriptions.add(this.teacherService.getTeacherById(window.localStorage.getItem('token') as string).subscribe(data => {
      this.courseService.getCourseByTeacherName(data[0].name).subscribe(data => {
        data.forEach(adat => {
          this.courses.push(adat);
        }
        )
        this.chosenCourse = data[0].id;
        this.subscriptions.add(
          this.classService.getClassByCourseId(this.chosenCourse).subscribe(dataa => {
            let segedClass: TeacherClass[] = new Array();
            dataa.forEach(adat => {
              this.studentService.getStudentById(adat.studentId).subscribe(adatocska => {
                let seged: TeacherClass = {
                  id: adat.id,
                  courseId: adat.courseId,
                  studentId: adat.studentId,
                  grade: adat.grade,
                  accepted: adat.accepted,
                  studentName: adatocska[0].name
                }
                segedClass.push(seged);

              })
            })
            this.classes = segedClass;
            this.classObject.emit(this.classes);
          })
        )
        this.reload();
      })
    }))

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  reload() {
    this.courseObject.emit(this.chosenCourse);
    this.subscriptions.add(
      this.classService.getClassByCourseId(this.chosenCourse).subscribe(data => {
        let segedClass: TeacherClass[] = new Array();
        data.forEach(adat => {
          this.studentService.getStudentById(adat.studentId).subscribe(adatocska => {
            let seged: TeacherClass = {
              id: adat.id,
              courseId: adat.courseId,
              studentId: adat.studentId,
              grade: adat.grade,
              accepted: adat.accepted,
              studentName: adatocska[0].name
            }
            segedClass.push(seged);

          })
        })
        this.classes = segedClass;
        this.classObject.emit(this.classes);
      })
    )
  }
}
