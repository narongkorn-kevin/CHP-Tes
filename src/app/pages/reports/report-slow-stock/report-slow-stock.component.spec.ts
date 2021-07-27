import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSlowStockComponent } from './report-slow-stock.component';

describe('ReportSlowStockComponent', () => {
  let component: ReportSlowStockComponent;
  let fixture: ComponentFixture<ReportSlowStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSlowStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSlowStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
