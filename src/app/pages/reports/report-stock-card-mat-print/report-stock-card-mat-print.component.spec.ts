import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockCardMatPrintComponent } from './report-stock-card-mat-print.component';

describe('ReportStockCardMatPrintComponent', () => {
  let component: ReportStockCardMatPrintComponent;
  let fixture: ComponentFixture<ReportStockCardMatPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStockCardMatPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStockCardMatPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
