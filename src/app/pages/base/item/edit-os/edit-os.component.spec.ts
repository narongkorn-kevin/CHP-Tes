import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOsComponent } from './edit-os.component';

describe('EditOsComponent', () => {
  let component: EditOsComponent;
  let fixture: ComponentFixture<EditOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
