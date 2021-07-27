import { TestBed } from '@angular/core/testing';

import { ItemLotService } from './item-lot.service';

describe('ItemLotService', () => {
  let service: ItemLotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemLotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
