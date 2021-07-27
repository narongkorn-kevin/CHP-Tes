import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoutingComponent } from './dialog-routing.component';

describe('DialogRoutingComponent', () => {
  let component: DialogRoutingComponent;
  let fixture: ComponentFixture<DialogRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
