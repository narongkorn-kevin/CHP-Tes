import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockCardFgComponent } from './report-stock-card-fg.component';

describe('ReportStockCardFgComponent', () => {
  let component: ReportStockCardFgComponent;
  let fixture: ComponentFixture<ReportStockCardFgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStockCardFgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStockCardFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
