import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUnitComponent } from './dialog-unit.component';

describe('DialogUnitComponent', () => {
  let component: DialogUnitComponent;
  let fixture: ComponentFixture<DialogUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
