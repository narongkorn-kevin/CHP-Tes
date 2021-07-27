import { TestBed } from '@angular/core/testing';

import { MaterialGradeService } from './material-grade.service';

describe('MaterialGradeService', () => {
  let service: MaterialGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
