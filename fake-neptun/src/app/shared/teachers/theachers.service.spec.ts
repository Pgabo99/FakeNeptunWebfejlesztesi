import { TestBed } from '@angular/core/testing';

import { TheachersService } from './theachers.service';

describe('TheachersService', () => {
  let service: TheachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheachersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
