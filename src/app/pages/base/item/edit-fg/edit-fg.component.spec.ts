import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFgComponent } from './edit-fg.component';

describe('EditFgComponent', () => {
  let component: EditFgComponent;
  let fixture: ComponentFixture<EditFgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
