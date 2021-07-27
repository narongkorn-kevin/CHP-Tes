import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeviewDialogComponent } from './treeview-dialog.component';

describe('TreeviewDialogComponent', () => {
  let component: TreeviewDialogComponent;
  let fixture: ComponentFixture<TreeviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
