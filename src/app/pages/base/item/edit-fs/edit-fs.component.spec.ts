import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFsComponent } from './edit-fs.component';

describe('EditFsComponent', () => {
  let component: EditFsComponent;
  let fixture: ComponentFixture<EditFsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
