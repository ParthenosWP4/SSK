import { TestBed, inject } from '@angular/core/testing';

import { ElastichsearchService } from './elastichsearch.service';

describe('ElastichsearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElastichsearchService]
    });
  });

  it('should be created', inject([ElastichsearchService], (service: ElastichsearchService) => {
    expect(service).toBeTruthy();
  }));
});
