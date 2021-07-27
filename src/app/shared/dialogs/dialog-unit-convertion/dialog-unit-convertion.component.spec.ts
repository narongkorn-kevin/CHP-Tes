import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUnitConvertionComponent } from './dialog-unit-convertion.component';

describe('DialogUnitConvertionComponent', () => {
  let component: DialogUnitConvertionComponent;
  let fixture: ComponentFixture<DialogUnitConvertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUnitConvertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUnitConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
