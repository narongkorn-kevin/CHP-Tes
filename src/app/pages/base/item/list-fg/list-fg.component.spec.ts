import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFgComponent } from './list-fg.component';

describe('ListFgComponent', () => {
  let component: ListFgComponent;
  let fixture: ComponentFixture<ListFgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
