import { TestBed } from '@angular/core/testing';

import { MonthPackageService } from './month-package.service';

describe('MonthPackageService', () => {
  let service: MonthPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
