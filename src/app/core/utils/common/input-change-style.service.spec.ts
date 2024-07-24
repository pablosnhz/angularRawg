import { TestBed } from '@angular/core/testing';

import { InputChangeStyleService } from './input-change-style.service';

describe('InputChangeStyleService', () => {
  let service: InputChangeStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputChangeStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
