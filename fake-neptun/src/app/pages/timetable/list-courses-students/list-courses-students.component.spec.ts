import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursesStudentsComponent } from './list-courses-students.component';

describe('ListCoursesStudentsComponent', () => {
  let component: ListCoursesStudentsComponent;
  let fixture: ComponentFixture<ListCoursesStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCoursesStudentsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListCoursesStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
