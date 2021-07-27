import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRmComponent } from './edit-rm.component';

describe('EditRmComponent', () => {
  let component: EditRmComponent;
  let fixture: ComponentFixture<EditRmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
