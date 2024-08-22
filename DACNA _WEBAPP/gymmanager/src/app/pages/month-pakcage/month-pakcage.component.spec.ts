import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPakcageComponent } from './month-pakcage.component';

describe('MonthPakcageComponent', () => {
  let component: MonthPakcageComponent;
  let fixture: ComponentFixture<MonthPakcageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthPakcageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthPakcageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
