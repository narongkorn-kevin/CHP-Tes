import { TestBed } from '@angular/core/testing';

import { ServiceLocationInOutService } from './service-location-in-out.service';

describe('ServiceLocationInOutService', () => {
  let service: ServiceLocationInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLocationInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
