import { TestBed } from '@angular/core/testing';

import { GandalfInterceptor } from './gandalf.interceptor';

describe('AccessTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GandalfInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GandalfInterceptor = TestBed.inject(GandalfInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
