import { TestBed, inject } from '@angular/core/testing';

import { ConductivityService } from './conductivity.service';

describe('ConductivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConductivityService]
    });
  });

  it('should be created', inject([ConductivityService], (service: ConductivityService) => {
    expect(service).toBeTruthy();
  }));
});
