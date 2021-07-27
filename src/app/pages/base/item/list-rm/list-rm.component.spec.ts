import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRmComponent } from './list-rm.component';

describe('ListRmComponent', () => {
  let component: ListRmComponent;
  let fixture: ComponentFixture<ListRmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
