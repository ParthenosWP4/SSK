import { TestBed, inject } from '@angular/core/testing';

import { SskServicesService } from './ssk-services.service';

describe('SskServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SskServicesService]
    });
  });

  it('should be created', inject([SskServicesService], (service: SskServicesService) => {
    expect(service).toBeTruthy();
  }));
});
