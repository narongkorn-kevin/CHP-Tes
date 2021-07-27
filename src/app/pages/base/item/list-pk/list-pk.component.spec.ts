import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPkComponent } from './list-pk.component';

describe('ListPkComponent', () => {
  let component: ListPkComponent;
  let fixture: ComponentFixture<ListPkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
