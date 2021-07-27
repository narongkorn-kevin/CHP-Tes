import { TestBed } from '@angular/core/testing';

import { ConfigStockService } from './config-stock.service';

describe('ConfigStockService', () => {
  let service: ConfigStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
