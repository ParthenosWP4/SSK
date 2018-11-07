import { TestBed, inject } from '@angular/core/testing';

import { ElastichsearchServicesService } from './elastichsearch-services.service';

describe('ElastichsearchServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElastichsearchServicesService]
    });
  });

  it('should be created', inject([ElastichsearchServicesService], (service: ElastichsearchServicesService) => {
    expect(service).toBeTruthy();
  }));
});
