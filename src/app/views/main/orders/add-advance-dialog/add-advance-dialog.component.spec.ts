import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvanceDialogComponent } from './add-advance-dialog.component';

describe('AddAdvanceDialogComponent', () => {
  let component: AddAdvanceDialogComponent;
  let fixture: ComponentFixture<AddAdvanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdvanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdvanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
