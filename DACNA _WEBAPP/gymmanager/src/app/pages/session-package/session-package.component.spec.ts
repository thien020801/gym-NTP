import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPackageComponent } from './session-package.component';

describe('SessionPackageComponent', () => {
  let component: SessionPackageComponent;
  let fixture: ComponentFixture<SessionPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
