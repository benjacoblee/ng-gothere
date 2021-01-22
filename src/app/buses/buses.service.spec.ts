import { TestBed } from '@angular/core/testing';

import { BusesService } from './buses.service';

describe('BusesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusesService = TestBed.get(BusesService);
    expect(service).toBeTruthy();
  });
});
