import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from '../../shared/courses/courses.service';
import { Courses } from '../../shared/model/courses';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CoursesComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  course: Courses[] = new Array();
  felvetel: boolean = false;

  displayedColumns: string[] = ['name', 'teacher', 'credit'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement?: Courses | null;

  courseData = new MatTableDataSource<Courses>();

  constructor(private courseService: CoursesService, private dialog: MatDialog) {
    if (this.course.length == 0) {
      this.subscriptions.add(this.courseService.getAllCourses().subscribe(data => {
        data.forEach(adat => {
          this.course.push(adat as Courses);
          const adatocska = this.courseData.data;
          adatocska.push(adat as Courses);
          this.courseData.data = adatocska;
        })
      }))
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
  }

  oktato() {
    if (localStorage.getItem('jog') == 'Oktató')
      return true;
    return false;
  }

  reszletek(id: string) {
    const dialogRef = this.dialog.open(CourseDetailComponent, {
      data: {
        courseId: id,
        jog: localStorage.getItem('jog')
      },
      width: '95%',
      height: '95%'
    });
  }

  deleteCourse(id: string) {

  }
}
