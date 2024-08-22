import { TestBed } from '@angular/core/testing';

import { CreateCusService } from './create-cus.service';

describe('CreateCusService', () => {
  let service: CreateCusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
