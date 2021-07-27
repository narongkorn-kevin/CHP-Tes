import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpComponent } from './list-sp.component';

describe('ListSpComponent', () => {
  let component: ListSpComponent;
  let fixture: ComponentFixture<ListSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
