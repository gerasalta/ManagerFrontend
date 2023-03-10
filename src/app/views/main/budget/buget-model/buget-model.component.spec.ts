import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugetModelComponent } from './buget-model.component';

describe('BugetModelComponent', () => {
  let component: BugetModelComponent;
  let fixture: ComponentFixture<BugetModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugetModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
