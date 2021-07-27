import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockCardMatComponent } from './report-stock-card-mat.component';

describe('ReportStockCardMatComponent', () => {
  let component: ReportStockCardMatComponent;
  let fixture: ComponentFixture<ReportStockCardMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStockCardMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStockCardMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
