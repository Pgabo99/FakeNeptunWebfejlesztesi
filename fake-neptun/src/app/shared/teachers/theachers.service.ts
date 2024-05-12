import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Teacher } from '../model/teacher';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TheachersService {

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService, private router: Router) { }

  //Tanár hozzáadása
  addTeacher(teacher: Teacher) {
    teacher.id = this.angularFirestore.createId();
    localStorage.setItem('token', teacher.id);
    return this.angularFirestore.collection('/Teachers').add(teacher);
  }

  //Tanárok listázása
  getAllTeachers() {
    return this.angularFirestore.collection('/Teachers').snapshotChanges();
  }

  //Tanár törlése
  deleteTeacher(teacher: Teacher) {
    return this.angularFirestore.collection('Teachers', (ref) => ref.where('id', '==', teacher.id)).get().subscribe(
      (querySnapshot) => {
        this.authService.deleteUser();
        querySnapshot.forEach((doc: any) => {
          doc.ref.delete();
        });
        alert("Sikeres törlés");
        this.router.navigate(['/login']);
      }
    );
  }

  //Tanár update
  updateTeacher(teacher: Teacher) {
    return this.angularFirestore.collection('Teachers', (ref) => ref.where('id', '==', teacher.id)).get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.update({ age: teacher.age as number });
          doc.ref.update({ workTime: teacher.workTime });
          doc.ref.update({ name: teacher.name });
          doc.ref.update({ idCardNumber: teacher.idCardNumber as string });
        });
      }
    );
  }

  //Tanárok email alapján
  getTeacherByEmail(email: string) {
    return this.angularFirestore.collection<Teacher>('/Teachers', ref => ref.where('email', '==', email)).valueChanges();
  }

  //Tanárok id alapján
  getTeacherById(id: string) {
    return this.angularFirestore.collection<Teacher>('/Teachers', ref => ref.where('id', '==', id)).valueChanges();
  }
}
