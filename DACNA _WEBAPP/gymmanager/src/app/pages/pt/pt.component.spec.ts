import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTComponent } from './pt.component';

describe('PTComponent', () => {
  let component: PTComponent;
  let fixture: ComponentFixture<PTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
