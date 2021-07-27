import { TestBed } from '@angular/core/testing';

import { ReportLocationInOutService } from './report-location-in-out.service';

describe('ReportLocationInOutService', () => {
  let service: ReportLocationInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportLocationInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
