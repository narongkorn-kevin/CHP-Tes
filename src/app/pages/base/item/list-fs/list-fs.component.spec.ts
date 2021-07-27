import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFsComponent } from './list-fs.component';

describe('ListFsComponent', () => {
  let component: ListFsComponent;
  let fixture: ComponentFixture<ListFsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
