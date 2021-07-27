import { TestBed } from '@angular/core/testing';

import { ReportForcashService } from './report-forcash.service';

describe('ReportForcashService', () => {
  let service: ReportForcashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportForcashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
