import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsForcashComponent } from './reports-forcash.component';

describe('ReportsForcashComponent', () => {
  let component: ReportsForcashComponent;
  let fixture: ComponentFixture<ReportsForcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsForcashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsForcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
