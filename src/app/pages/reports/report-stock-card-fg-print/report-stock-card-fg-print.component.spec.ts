import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockCardFgPrintComponent } from './report-stock-card-fg-print.component';

describe('ReportStockCardFgPrintComponent', () => {
  let component: ReportStockCardFgPrintComponent;
  let fixture: ComponentFixture<ReportStockCardFgPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStockCardFgPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStockCardFgPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
