import { TestBed } from '@angular/core/testing';

import { Conductance } from './conductance';

describe('Conductance', () => {
  let service: Conductance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conductance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
