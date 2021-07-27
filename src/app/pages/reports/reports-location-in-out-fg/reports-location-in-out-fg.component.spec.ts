import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportslocationInOutFgComponent } from './reports-location-in-out-fg.component';

describe('ReportslocationInOutFgComponent', () => {
  let component: ReportslocationInOutFgComponent;
  let fixture: ComponentFixture<ReportslocationInOutFgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportslocationInOutFgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportslocationInOutFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
