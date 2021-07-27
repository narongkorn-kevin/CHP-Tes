import { TestBed } from '@angular/core/testing';

import { DialogRoutingService } from './dialog-routing.service';

describe('DialogRoutingService', () => {
  let service: DialogRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
