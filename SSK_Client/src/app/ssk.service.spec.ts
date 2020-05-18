import { TestBed, inject } from '@angular/core/testing';

import { SskService } from './ssk.service';

describe('SskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SskService]
    });
  });

  it('should be created', inject([SskService], (service: SskService) => {
    expect(service).toBeTruthy();
  }));
});
