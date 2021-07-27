import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsItemTranComponent } from './reports-item-tran.component';

describe('ReportsItemTranComponent', () => {
  let component: ReportsItemTranComponent;
  let fixture: ComponentFixture<ReportsItemTranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsItemTranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsItemTranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
