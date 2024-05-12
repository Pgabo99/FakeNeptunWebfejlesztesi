import { Component, OnDestroy, OnInit } from '@angular/core';
import { Teacher } from '../../shared/model/teacher';
import { Student } from '../../shared/model/student';
import { StudentService } from '../../shared/students/students.service';
import { Subscription } from 'rxjs';
import { TheachersService } from '../../shared/teachers/theachers.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-mydatas',
  templateUrl: './mydatas.component.html',
  styleUrl: './mydatas.component.css'
})
export class MydatasComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  student?: Student;
  teacher?: Teacher;
  szerkesztheto: boolean = false;

  students = new FormGroup({
    kar: new FormControl(this.student?.major),
    name: new FormControl(this.student?.name),
    studentNumber: new FormControl(this.student?.studentNumber),
    age: new FormControl(this.student?.age)
  });

  teachers = new FormGroup({
    oktatas: new FormControl(this.teacher?.workTime),
    name: new FormControl(this.teacher?.name),
    idCardNumber: new FormControl(this.teacher?.idCardNumber),
    age: new FormControl(this.teacher?.age)
  });
  constructor(private studentService: StudentService,
    private teacherService: TheachersService
  ) {
    this.students.value.name = this.student?.name;
    this.students.value.kar = this.student?.major;
    this.students.value.studentNumber = this.student?.studentNumber;
    this.students.value.age = this.student?.age;
  }
  ngOnInit(): void {
    if (!localStorage.getItem('token'))
      window.location.reload();
    if (localStorage.getItem('jog') == 'Hallgató') {
      this.subscriptions.add(this.studentService.getStudentById(window.localStorage.getItem('token') as string).subscribe(data => {
        this.student = data[0];

      }))
    }
    else {
      this.subscriptions.add(this.teacherService.getTeacherById(window.localStorage.getItem('token') as string).subscribe(data => {
        this.teacher = data[0];
      }))
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  studentUpdate() {
    let seged: Student = {
      id: this.student?.id as string,
      email: this.student?.email as string,
      role: this.student?.role as string,
      major: this.students.value.kar == null ? this.student?.major as string : this.students.value.kar as string,
      name: this.students.value.name == null ? this.student?.name as string : this.students.value.name as string,
      age: this.students.value.age == null ? this.student?.age as number : this.students.value.age as number,
      studentNumber: this.students.value.studentNumber == null ? this.student?.studentNumber as number : this.students.value.studentNumber as number
    }
    this.studentService.updateStudent(seged);
    this.szerkesztheto = false;
  }

  deleteStudent() {
    let seged: Student = {
      id: this.student?.id as string,
      email: this.student?.email as string,
      role: this.student?.role as string,
      major: this.student?.major as string,
      name: this.student?.name as string,
      age: this.student?.age as number,
      studentNumber: this.student?.studentNumber as number
    }
    this.studentService.deleteStudent(seged);
  }

  teacherUpdate() {
    let seged: Teacher = {
      id: this.teacher?.id as string,
      email: this.teacher?.email as string,
      role: this.teacher?.role as string,
      workTime: this.teachers.value.oktatas == null ? this.teacher?.workTime as string : this.teachers.value.oktatas as string,
      name: this.teachers.value.name == null ? this.teacher?.name as string : this.teachers.value.name as string,
      age: this.teachers.value.age == null ? this.teacher?.age as number : this.teachers.value.age as number,
      idCardNumber: this.teachers.value.idCardNumber == null ? this.teacher?.idCardNumber as string : this.teachers.value.idCardNumber as string
    }
    this.teacherService.updateTeacher(seged);
    this.szerkesztheto = false;
  }

  deleteTeacher() {
    let seged: Teacher = {
      id: this.teacher?.id as string,
      email: this.teacher?.email as string,
      role: this.teacher?.role as string,
      workTime: this.teacher?.workTime as string,
      name: this.teacher?.name as string,
      age: this.teacher?.age as number,
      idCardNumber: this.teacher?.idCardNumber as string
    }
    this.teacherService.deleteTeacher(seged);
  }

}
