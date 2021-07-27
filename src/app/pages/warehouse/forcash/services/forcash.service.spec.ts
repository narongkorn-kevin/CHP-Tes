import { TestBed } from '@angular/core/testing';

import { ForcashService } from './forcash.service';

describe('ForcashService', () => {
  let service: ForcashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForcashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
