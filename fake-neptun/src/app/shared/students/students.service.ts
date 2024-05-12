import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Student } from '../model/student';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService, private router: Router) { }

  //Diák hozzáadása
  addStudent(student: Student) {
    student.id = this.angularFirestore.createId();
    localStorage.setItem('token', student.id);
    return this.angularFirestore.collection<Student>('Students').add(student);
  }

  //Diákok listázása
  getAllStudents() {
    return this.angularFirestore.collection<Student>('Students').valueChanges();
  }

  //Diákok törlése
  deleteStudent(student: Student) {
    return this.angularFirestore.collection('Students', (ref) => ref.where('id', '==', student.id)).get().subscribe(
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

  //Diákok adatának frissítése
  updateStudent(student: Student) {
    return this.angularFirestore.collection('Students', (ref) => ref.where('id', '==', student.id)).get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.update({ age: student.age as number });
          doc.ref.update({ major: student.major });
          doc.ref.update({ name: student.name });
          doc.ref.update({ studentNumber: student.studentNumber as number });
        });
      }
    );
  }

  //Diákok email alapján
  getStudentByEmail(email: string) {
    return this.angularFirestore.collection<Student>('/Students', ref => ref.where('email', '==', email)).valueChanges();
  }

  //Diákok id alapján
  getStudentById(id: string) {
    return this.angularFirestore.collection<Student>('/Students', ref => ref.where('id', '==', id)).valueChanges();
  }


}
