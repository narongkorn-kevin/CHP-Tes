import { TestBed } from '@angular/core/testing';

import { DialogItemForInventoryService } from './dialog-item-for-inventory.service';

describe('DialogItemForInventoryService', () => {
  let service: DialogItemForInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogItemForInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
