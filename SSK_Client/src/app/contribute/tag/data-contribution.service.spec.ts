import { TestBed, inject } from '@angular/core/testing';

import { DataContributionService } from './data-contribution.service';

describe('DataContributionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataContributionService]
    });
  });

  it('should be created', inject([DataContributionService], (service: DataContributionService) => {
    expect(service).toBeTruthy();
  }));
});
