import { TestBed } from '@angular/core/testing';

import { OfficeServiceService } from './office-service.service';

describe('OfficeServiceService', () => {
  let service: OfficeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
