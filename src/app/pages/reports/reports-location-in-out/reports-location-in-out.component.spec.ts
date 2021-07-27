import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsLocationInOutComponent } from './reports-location-in-out.component';

describe('ReportsLocationInOutComponent', () => {
  let component: ReportsLocationInOutComponent;
  let fixture: ComponentFixture<ReportsLocationInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsLocationInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsLocationInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
