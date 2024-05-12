import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Courses } from '../model/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private angularFirestore: AngularFirestore, private router: Router) { }
  //Kurzus hozzáadása
  addCourse(course: Courses) {
    course.id = this.angularFirestore.createId();
    return this.angularFirestore.collection('/Courses').add(course);
  }

  //Kurzusok listázása
  getAllCourses() {
    return this.angularFirestore.collection('/Courses').valueChanges();
  }

  //Kurzus id alapján
  getCourseById(id: string) {
    return this.angularFirestore.collection<Courses>('/Courses', ref => ref.where('id', '==', id)).valueChanges();
  }

  //Kurzus tanár név alapján
  getCourseByTeacherName(nev: string) {
    return this.angularFirestore.collection<Courses>('/Courses', ref => ref.where('teacher', '==', nev)).valueChanges();
  }

  //Kurzus törlése
  deleteCourse(course: Courses) {
    return this.angularFirestore.collection('/Courses', (ref) => ref.where('id', '==', course.id)).get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.delete();
          window.location.reload();
        });
        alert("Sikeres törlés");
      }
    );
  }

  updateCourse(course: Courses) {
    return this.angularFirestore.collection('Courses', (ref) => ref.where('id', '==', course.id)).get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.update({ classRoom: course.classRoom as string });
          doc.ref.update({ credit: course.credit as number });
          doc.ref.update({ day: course.day as string });
          doc.ref.update({ from: course.from as string });
          doc.ref.update({ language: course.language as string });
          doc.ref.update({ name: course.name as string });
          doc.ref.update({ studentNumber: course.studentNumber as number });
          doc.ref.update({ to: course.to as string });
          doc.ref.update({ type: course.type as string });
        });
      }
    );
  }
}

