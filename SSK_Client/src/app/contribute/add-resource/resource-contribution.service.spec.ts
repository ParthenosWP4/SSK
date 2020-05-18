import { TestBed } from '@angular/core/testing';

import { ResourceContributionService } from './resource-contribution.service';

describe('ResourceContributionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceContributionService = TestBed.get(ResourceContributionService);
    expect(service).toBeTruthy();
  });
});
