import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassService } from '../../../shared/class/class.service';
import { CoursesService } from '../../../shared/courses/courses.service';
import { OneClass } from '../../../shared/model/oneclass';
import { Classes } from '../../../shared/model/classes';;

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.css'
})
export class ClassDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { thisClass: OneClass },
    private classService: ClassService) {
  }

  leadas() {
    let seged: Classes = {
      id: this.data.thisClass.classId,
      courseId: this.data.thisClass.courseId,
      studentId: this.data.thisClass.studentId,
      grade: this.data.thisClass.grade,
      accepted: this.data.thisClass.accepted
    }
    this.classService.deleteClass(seged);
  }

  acceptedE() {
    if (this.data.thisClass.accepted == true)
      return 'Jóváhagyva'
    return 'Még nem lett jóváhagyva'
  }
  grade() {
    if (this.data.thisClass.grade == 0)
      return 'Még nincs eredmény'
    return this.data.thisClass.grade;
  }
}
