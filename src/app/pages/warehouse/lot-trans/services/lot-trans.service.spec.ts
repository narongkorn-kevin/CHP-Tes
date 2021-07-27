import { TestBed } from '@angular/core/testing';

import { LotTransService } from './lot-trans.service';

describe('LotTransService', () => {
  let service: LotTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
