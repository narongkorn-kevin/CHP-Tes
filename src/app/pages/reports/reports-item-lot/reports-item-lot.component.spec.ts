import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsItemLotComponent } from './reports-item-lot.component';

describe('ReportsItemLotComponent', () => {
  let component: ReportsItemLotComponent;
  let fixture: ComponentFixture<ReportsItemLotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsItemLotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsItemLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
