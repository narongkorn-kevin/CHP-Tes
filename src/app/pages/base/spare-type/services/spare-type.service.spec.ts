import { TestBed } from '@angular/core/testing';

import { SpareTypeService } from './spare-type.service';

describe('SpareTypeService', () => {
  let service: SpareTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpareTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
