import { TestBed } from '@angular/core/testing';

import { DialogItemService } from './dialog-item.service';

describe('DialogItemService', () => {
  let service: DialogItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
