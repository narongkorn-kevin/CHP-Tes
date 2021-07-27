import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSaleBalanceComponent } from './report-sale-balance.component';

describe('ReportSaleBalanceComponent', () => {
  let component: ReportSaleBalanceComponent;
  let fixture: ComponentFixture<ReportSaleBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSaleBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSaleBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
