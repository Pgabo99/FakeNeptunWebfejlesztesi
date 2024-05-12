import { Component, Inject } from '@angular/core';
import { OneClass } from '../../../shared/model/oneclass';
import { TeacherClass } from '../../../shared/model/teacherclass';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassService } from '../../../shared/class/class.service';
import { Classes } from '../../../shared/model/classes';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.css'
})
export class ClassFormComponent {

  classGroup = new FormGroup({
    grade: new FormControl(),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { thisClass: TeacherClass }, private classService: ClassService) {

  }
  updateClass() {
    let seged: Classes = {
      id: this.data.thisClass.id,
      courseId: this.data.thisClass.courseId,
      studentId: this.data.thisClass.studentId,
      grade: this.classGroup.value.grade == null ? this.data.thisClass.grade : this.classGroup.value.grade,
      accepted: this.data.thisClass.accepted
    }
    this.classService.updateClass(seged);
  }
  jovahagy() {
    let seged: Classes = {
      id: this.data.thisClass.id,
      courseId: this.data.thisClass.courseId,
      studentId: this.data.thisClass.studentId,
      grade: this.data.thisClass.grade,
      accepted: true
    }
    this.classService.updateClass(seged);

  }
  levetel() {
    let seged: Classes = {
      id: this.data.thisClass.id,
      courseId: this.data.thisClass.courseId,
      studentId: this.data.thisClass.studentId,
      grade: this.data.thisClass.grade,
      accepted: this.data.thisClass.accepted
    }
    this.classService.deleteClass(seged);
  }
}
