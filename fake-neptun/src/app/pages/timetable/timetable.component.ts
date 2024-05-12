import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TheachersService } from '../../shared/teachers/theachers.service';
import { Teacher } from '../../shared/model/teacher';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  chosenCourse: any = '';

  course: any;

  constructor() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {

  }

  loadCourse(courseId: string) {
    this.chosenCourse = courseId;
  }

  loadClass(classees: any) {
    this.course = classees;
  }
}
