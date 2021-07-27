import { TestBed } from '@angular/core/testing';

import { AdjustService } from './adjust.service';

describe('AdjustService', () => {
  let service: AdjustService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjustService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
