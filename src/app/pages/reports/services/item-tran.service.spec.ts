import { TestBed } from '@angular/core/testing';

import { ItemTranService } from './item-tran.service';

describe('ItemTranService', () => {
  let service: ItemTranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemTranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
