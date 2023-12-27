import { TestBed } from '@angular/core/testing';

import { BusplusService } from './busplus.service';

describe('BusplusService', () => {
  let service: BusplusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
