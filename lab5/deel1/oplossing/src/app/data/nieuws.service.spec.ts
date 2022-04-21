import { TestBed } from '@angular/core/testing';

import { NieuwsService } from './nieuws.service';

describe('NieuwsService', () => {
  let service: NieuwsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NieuwsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
