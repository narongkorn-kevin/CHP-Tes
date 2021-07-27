import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDeliveryOrderComponent } from './report-delivery-order.component';

describe('ReportDeliveryOrderComponent', () => {
  let component: ReportDeliveryOrderComponent;
  let fixture: ComponentFixture<ReportDeliveryOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDeliveryOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
