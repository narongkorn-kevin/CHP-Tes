import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOsComponent } from './list-os.component';

describe('ListOsComponent', () => {
  let component: ListOsComponent;
  let fixture: ComponentFixture<ListOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
