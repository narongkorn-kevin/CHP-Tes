import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSmComponent } from './list-sm.component';

describe('ListSmComponent', () => {
  let component: ListSmComponent;
  let fixture: ComponentFixture<ListSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
