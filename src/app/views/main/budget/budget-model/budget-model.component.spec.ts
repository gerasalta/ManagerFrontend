import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetModelComponent } from './budget-model.component';

describe('BudgetModelComponent', () => {
  let component: BudgetModelComponent;
  let fixture: ComponentFixture<BudgetModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
