import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAssignTaskDialogComponent } from './re-assign-task-dialog.component';

describe('ReAssignTaskDialogComponent', () => {
  let component: ReAssignTaskDialogComponent;
  let fixture: ComponentFixture<ReAssignTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReAssignTaskDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReAssignTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
