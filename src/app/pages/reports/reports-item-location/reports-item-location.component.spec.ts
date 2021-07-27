import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsItemLocationComponent } from './reports-item-location.component';

describe('ReportsItemLocationComponent', () => {
  let component: ReportsItemLocationComponent;
  let fixture: ComponentFixture<ReportsItemLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsItemLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsItemLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
