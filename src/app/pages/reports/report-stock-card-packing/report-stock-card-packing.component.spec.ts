import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockCardPackingComponent } from './report-stock-card-packing.component';

describe('ReportStockCardPackingComponent', () => {
  let component: ReportStockCardPackingComponent;
  let fixture: ComponentFixture<ReportStockCardPackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStockCardPackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStockCardPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
