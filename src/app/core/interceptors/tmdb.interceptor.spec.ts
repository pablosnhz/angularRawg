import { TestBed } from '@angular/core/testing';

import { TmdbInterceptor } from './tmdb.interceptor';

describe('TmdbInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TmdbInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TmdbInterceptor = TestBed.inject(TmdbInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
