import { TestBed } from '@angular/core/testing';

import { MaterialTypeService } from './material-type.service';

describe('MaterialTypeService', () => {
  let service: MaterialTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
