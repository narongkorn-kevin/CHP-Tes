import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockCardComponent } from './report-stock-card.component';

describe('ReportStockCardComponent', () => {
  let component: ReportStockCardComponent;
  let fixture: ComponentFixture<ReportStockCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStockCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
