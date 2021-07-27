import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpComponent } from './edit-sp.component';

describe('EditSpComponent', () => {
  let component: EditSpComponent;
  let fixture: ComponentFixture<EditSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
