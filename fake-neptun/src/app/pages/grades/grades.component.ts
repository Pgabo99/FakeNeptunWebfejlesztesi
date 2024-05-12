import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClassService } from '../../shared/class/class.service';
import { CoursesService } from '../../shared/courses/courses.service';
import { OneClass } from '../../shared/model/oneclass';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ClassDetailComponent } from './class-detail/class-detail.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GradesComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  myClasses: OneClass[] = new Array();

  classData = new MatTableDataSource<OneClass>();

  constructor(private classService: ClassService, private courseService: CoursesService, private dialog: MatDialog) {
    this.subscriptions.add(
      this.classService.getClassByStudentId(window.localStorage.getItem('token') as string).subscribe(data => {
        data.forEach(adat => {
          this.courseService.getCourseById(adat.courseId).subscribe(kurzus => {
            let seged: OneClass = {
              courseId: adat.courseId,
              teacher: kurzus[0].teacher,
              name: kurzus[0].name,
              classRoom: kurzus[0].classRoom,
              type: kurzus[0].type,
              language: kurzus[0].language,
              credit: kurzus[0].credit,
              studentNumber: kurzus[0].studentNumber,
              day: kurzus[0].day,
              from: kurzus[0].from,
              to: kurzus[0].to,
              classId: adat.id,
              studentId: adat.studentId,
              grade: adat.grade,
              accepted: adat.accepted
            }
            this.myClasses.push(seged);
          })
        })
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {

  }

  reszletek(element: OneClass) {
    const dialogRef = this.dialog.open(ClassDetailComponent, {
      data: { thisClass: element },
      width: '95%',
      height: '95%'
    });
  }

}
