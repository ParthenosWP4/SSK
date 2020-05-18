import { TestBed, async, inject } from '@angular/core/testing';

import { CanAuthenticationGuard } from './CanAuthenticationGuard';

describe('CanAuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanAuthenticationGuard]
    });
  });

  it('should ...', inject([CanAuthenticationGuard], (guard: CanAuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
