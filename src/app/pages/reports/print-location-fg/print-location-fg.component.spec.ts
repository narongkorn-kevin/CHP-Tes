import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLocationFgComponent } from './print-location-fg.component';

describe('PrintLocationFgComponent', () => {
  let component: PrintLocationFgComponent;
  let fixture: ComponentFixture<PrintLocationFgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintLocationFgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLocationFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
