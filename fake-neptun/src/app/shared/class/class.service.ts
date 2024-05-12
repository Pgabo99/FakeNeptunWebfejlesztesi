import { Injectable, model } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Classes } from '../model/classes';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private angularFirestore: AngularFirestore, private router: Router) { }
  //Óra hozzáadása
  addClass(classes: Classes) {
    classes.id = this.angularFirestore.createId();
    return this.angularFirestore.collection('/Class').add(classes);
  }

  //Óra leadása
  deleteClass(classes: Classes) {
    return this.angularFirestore.collection('Class', (ref) => ref.where('id', '==', classes.id)).get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.delete();
        });
        alert("Sikeres törlés");
      }
    );
  }

  //Óra frissítése
  updateClass(classes: Classes) {
    return this.angularFirestore.collection('Class', (ref) => ref.where('id', '==', classes.id)).get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.update({ accepted: classes.accepted });
          doc.ref.update({ grade: classes.grade });
        });
      }
    );
  }

  //Óra id alapján
  getClassById(id: string) {
    return this.angularFirestore.collection<Classes>('/Class', ref => ref.where('id', '==', id)).valueChanges();
  }

  //Órák student id alapján
  getClassByStudentId(id: string) {
    return this.angularFirestore.collection<Classes>('/Class', ref => ref.where('studentId', '==', id)).valueChanges();
  }

  //Órák kurzus id alapján
  getClassByCourseId(id: string) {
    return this.angularFirestore.collection<Classes>('/Class', ref => ref.where('courseId', '==', id)).valueChanges();
  }


}
