import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDeadStockComponent } from './report-dead-stock.component';

describe('ReportDeadStockComponent', () => {
  let component: ReportDeadStockComponent;
  let fixture: ComponentFixture<ReportDeadStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDeadStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDeadStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
