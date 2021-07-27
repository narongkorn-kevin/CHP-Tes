import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBomComponent } from './dialog-bom.component';

describe('DialogBomComponent', () => {
  let component: DialogBomComponent;
  let fixture: ComponentFixture<DialogBomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
