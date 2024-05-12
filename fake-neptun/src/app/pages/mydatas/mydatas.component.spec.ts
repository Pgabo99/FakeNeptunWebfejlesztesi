import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydatasComponent } from './mydatas.component';

describe('MydatasComponent', () => {
  let component: MydatasComponent;
  let fixture: ComponentFixture<MydatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MydatasComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MydatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
