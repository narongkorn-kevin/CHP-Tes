import { TestBed } from '@angular/core/testing';

import { DiaglogBomService } from './diaglog-bom.service';

describe('DiaglogBomService', () => {
  let service: DiaglogBomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaglogBomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
