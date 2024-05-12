import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClassService } from '../../../shared/class/class.service';
import { Classes } from '../../../shared/model/classes';
import { TeacherClass } from '../../../shared/model/teacherclass';
import { MatDialog } from '@angular/material/dialog';
import { ClassDetailComponent } from '../../grades/class-detail/class-detail.component';
import { ClassFormComponent } from '../class-form/class-form.component';

@Component({
  selector: 'app-list-courses-students',
  templateUrl: './list-courses-students.component.html',
  styleUrl: './list-courses-students.component.css'
})
export class ListCoursesStudentsComponent implements OnInit, OnDestroy {
  @Input() courseIdInput: any;
  @Input() classInput: any;
  private subscriptions = new Subscription();



  constructor(private dialog: MatDialog) {
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  grade(grade: any) {
    if (grade == 0)
      return 'Még nincs eredmény'
    return grade;
  }
  acceptedE(accepted: any) {
    if (accepted == true)
      return 'Jóváhagyva'
    return 'Még nem lett jóváhagyva'
  }

  reszletek(element: TeacherClass) {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      data: { thisClass: element },
      width: '95%',
      height: '95%'
    });
  }

}
