import { TestBed } from '@angular/core/testing';

import { ReportStockCardMatService } from './report-stock-card-mat.service';

describe('ReportStockCardMatService', () => {
  let service: ReportStockCardMatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportStockCardMatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
