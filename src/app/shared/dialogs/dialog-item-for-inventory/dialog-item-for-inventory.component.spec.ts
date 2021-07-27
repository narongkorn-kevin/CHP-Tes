import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogItemForInventoryComponent } from './dialog-item-for-inventory.component';

describe('DialogItemForInventoryComponent', () => {
  let component: DialogItemForInventoryComponent;
  let fixture: ComponentFixture<DialogItemForInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogItemForInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogItemForInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
