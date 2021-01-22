import { TestBed } from '@angular/core/testing';

import { BusStopsService } from './bus-stops.service';

describe('BusStopsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusStopsService = TestBed.get(BusStopsService);
    expect(service).toBeTruthy();
  });
});
