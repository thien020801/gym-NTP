import { TestBed } from '@angular/core/testing';

import { SessionPackageService } from './session-package.service';

describe('SessionPackageService', () => {
  let service: SessionPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
