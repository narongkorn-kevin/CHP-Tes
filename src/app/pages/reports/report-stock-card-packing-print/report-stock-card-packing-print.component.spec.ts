import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockCardPackingPrintComponent } from './report-stock-card-packing-print.component';

describe('ReportStockCardPackingPrintComponent', () => {
  let component: ReportStockCardPackingPrintComponent;
  let fixture: ComponentFixture<ReportStockCardPackingPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStockCardPackingPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStockCardPackingPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
