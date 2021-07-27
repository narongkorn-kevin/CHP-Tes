import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPkComponent } from './edit-pk.component';

describe('EditPkComponent', () => {
  let component: EditPkComponent;
  let fixture: ComponentFixture<EditPkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
