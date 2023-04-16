import { TestBed } from '@angular/core/testing';

import { PhoneInputService } from './phone-input.service';

describe('PhoneInputService', () => {
  let service: PhoneInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
