import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSmComponent } from './edit-sm.component';

describe('EditSmComponent', () => {
  let component: EditSmComponent;
  let fixture: ComponentFixture<EditSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
