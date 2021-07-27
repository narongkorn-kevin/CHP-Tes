import { TestBed } from '@angular/core/testing';

import { ReportLocationInOutFgService } from './report-location-in-out-fg.service';

describe('ReportLocationInOutFgService', () => {
  let service: ReportLocationInOutFgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportLocationInOutFgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
