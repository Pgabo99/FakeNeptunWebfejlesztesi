import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentService } from '../../../shared/students/students.service';
import { Student } from '../../../shared/model/student';
import { Router } from '@angular/router';
import { Teacher } from '../../../shared/model/teacher';
import { TheachersService } from '../../../shared/teachers/theachers.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit, OnDestroy {

  @Input({ required: true }) email!: string;

  jog: string = 'Hallgató';

  private subscriptions = new Subscription();
  studentObj: Student = {
    id: '',
    email: '',
    role: '',
    major: '',
    name: '',
    age: 0,
    studentNumber: 0
  };

  teacherObj: Teacher = {
    id: '',
    email: '',
    role: '',
    workTime: '',
    name: '',
    age: 0,
    idCardNumber: ''
  }

  constructor(private router: Router, private student: StudentService, private teacherService: TheachersService) {

  }
  students = new FormGroup({
    kar: new FormControl(''),
    name: new FormControl(''),
    studentnumber: new FormControl(''),
    age: new FormControl('')
  });

  teachers = new FormGroup({
    oktatas: new FormControl(''),
    name: new FormControl(''),
    number: new FormControl(''),
    age: new FormControl('')
  });

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  jogChange() {
    if (this.jog == 'Hallgató')
      this.jog = 'Oktató';
    else {
      this.jog = 'Hallgató'
    }
  }

  addStudent() {
    if (this.students.value.kar == '' || this.students.value.name == '' || this.students.value.studentnumber == '' || this.students.value.age == '') {
      alert("Kérlek tölts ki minden mezőt!");
      return;
    }
    this.studentObj.id = '';
    this.studentObj.email = this.email;
    this.studentObj.major = this.students.value.kar as string;
    this.studentObj.name = this.students.value.name as string;
    this.studentObj.age = this.students.value.age as unknown as number;
    this.studentObj.studentNumber = this.students.value.studentnumber as unknown as number;
    this.studentObj.role = 'Hallgató';
    this.student.addStudent(this.studentObj);
    localStorage.setItem('jog', 'Hallgató');
    this.router.navigate(['/main']);
  }
  addTeacher() {
    if (this.teachers.value.oktatas == '' || this.teachers.value.name == '' || this.teachers.value.number == '' || this.teachers.value.age == '') {
      alert("Kérlek tölts ki minden mezőt!");
      return;
    }
    this.teacherObj.id = '';
    this.teacherObj.email = this.email;
    this.teacherObj.workTime = this.teachers.value.oktatas as string;
    this.teacherObj.name = this.teachers.value.name as string;
    this.teacherObj.age = this.teachers.value.age as unknown as number;
    this.teacherObj.idCardNumber = this.teachers.value.number as string;
    this.teacherObj.role = 'Oktató'
    this.teacherService.addTeacher(this.teacherObj);
    localStorage.setItem('jog', 'Oktató');
    this.router.navigate(['/main']);
  }
}
